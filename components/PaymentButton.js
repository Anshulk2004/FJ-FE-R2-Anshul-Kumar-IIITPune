import React, { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  Smartphone, 
  Building, 
  Plus,
  ChevronRight,
  CreditCard as StripeIcon,
  DollarSign as Cash
} from 'lucide-react';
import StripePayment from './StripePayment';

const PaymentModal = ({ onClose, amount, rideDetails }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showStripePayment, setShowStripePayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const fare = rideDetails?.booking?.fare || amount;

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      icon: <StripeIcon className="w-5 h-5" />,
      description: 'Pay securely with card'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Pay via UPI'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Building className="w-5 h-5" />,
      description: 'All Indian banks'
    },
    {
      id: 'cash',
      name: 'Cash',
      icon: <Cash className="w-5 h-5" />,
      description: 'Pay after ride'
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    
    if (methodId === 'stripe') {
      setShowStripePayment(true);
    }
  };

  const MainMethodSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className="w-full p-4 flex items-center justify-between rounded-lg border hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-600">{method.icon}</div>
              <div className="text-left">
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mt-16">
        {paymentSuccess ? (
          <div className="text-center">
            <h2 className="text-lg font-bold text-green-600">Payment Successful!</h2>
            <p className="text-gray-600">Your ride is confirmed.</p>
          </div>
        ) : showStripePayment ? (
          <div>
            <button 
              onClick={() => setShowStripePayment(false)}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Back
            </button>
            <StripePayment
              amount={fare}
              onSuccess={() => {
                setPaymentSuccess(true);
                setTimeout(() => {
                  onClose();
                }, 2000);
              }}
              onError={(error) => {
                console.error("Payment failed:", error);
              }}
            />
          </div>
        ) : (
          <MainMethodSelection />
        )}

        {!paymentSuccess && !showStripePayment && (
          <button
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

const PaymentButton = ({ ride }) => {
  const [showPayment, setShowPayment] = useState(false);
  const fare = ride?.booking?.fare || 0;
  return (
    <>
      <button
        onClick={() => setShowPayment(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <CreditCard className="w-4 h-4" />
        Pay ₹{fare}
      </button>

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          amount={fare}
          rideDetails={ride}
        />
      )}
    </>
  );
};

export default PaymentButton;