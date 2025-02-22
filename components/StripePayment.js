// components/StripePayment.js
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ amount, rideDetails, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [country, setCountry] = useState('IN'); // Default to India

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      console.log('Sending payment intent request:', {
        amount,
        rideDetails
      });

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          rideDetails
        }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Failed to parse response: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: rideDetails.driver,
              address: {
                country: country,
              },
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (error) {
      setErrorMessage(error.message);
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-2">Country</label>
          <Select 
            value={country} 
            onValueChange={setCountry}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="GB">United Kingdom</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Card Details</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
              hidePostalCode: true, // This removes the postal code field
            }}
            className="p-3 border rounded-md"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full"
      >
        <CreditCard className="w-4 h-4 mr-2" />
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
};

const StripePayment = ({ amount, rideDetails, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentForm
            amount={amount}
            rideDetails={rideDetails}
            onSuccess={onSuccess}
            onError={onError}
          />
        </CardContent>
      </Card>
    </Elements>
  );
};

export default StripePayment;