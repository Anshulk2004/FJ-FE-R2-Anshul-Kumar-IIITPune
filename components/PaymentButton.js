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

const PaymentModal = ({ 
  onClose, 
  amount, 
  rideDetails, 
  walletBalance = 250, 
  savedCards = []
}) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showStripePayment, setShowStripePayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showSavedCards, setShowSavedCards] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState(null);

  const safeAmount = typeof amount === 'number' ? amount : 20;

  const paymentMethods = [
    {
      id: 'wallet',
      name: 'RIDE ON Wallet',
      icon: <Wallet className="w-5 h-5" />,
      balance: `₹${walletBalance}`,
      disabled: walletBalance < amount
    },
    {
      id: 'saved_cards',
      name: 'Saved Cards',
      icon: <CreditCard className="w-5 h-5" />,
      description: `${savedCards.length} cards saved`
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
      id: 'stripe',
      name: 'Credit/Debit Card',
      icon: <StripeIcon className="w-5 h-5" />,
      description: 'Powered by Stripe'
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
    } else if (methodId === 'saved_cards') {
      setShowSavedCards(true);
    } else if (methodId === 'add_new') {
      setShowAddPayment(true);
    }
  };

  const handleAddPayment = (type) => {
    setNewPaymentType(type);
    setShowAddPayment(false);
    alert(`Adding new ${type.toUpperCase()} payment method`);
  };

  const MainMethodSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            disabled={method.disabled}
            className={`w-full p-4 flex items-center justify-between rounded-lg border 
              ${method.disabled 
                ? 'bg-gray-50 cursor-not-allowed opacity-60' 
                : 'hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-600">{method.icon}</div>
              <div className="text-left">
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-500">
                  {method.balance || method.description}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      <div className="border-t pt-4 mt-6">
        <button
          onClick={() => handleMethodSelect('add_new')}
          className="w-full p-4 flex items-center justify-center gap-2 rounded-lg border border-dashed text-blue-600 hover:bg-blue-50"
        >
          <Plus className="w-5 h-5" />
          Add Payment Method
        </button>
      </div>
    </div>
  );

  const AddPaymentView = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Add Payment Method</h2>
      <button 
        onClick={() => handleAddPayment('UPI')}
        className="w-full p-4 flex items-center justify-between rounded-lg border hover:bg-gray-50"
      >
        <Smartphone className="w-5 h-5 text-gray-600" />
        <span>Add UPI</span>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
      <button 
        onClick={() => handleAddPayment('Credit/Debit Card')}
        className="w-full p-4 flex items-center justify-between rounded-lg border hover:bg-gray-50"
      >
        <CreditCard className="w-5 h-5 text-gray-600" />
        <span>Add Credit/Debit Card</span>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mt-16">
        {paymentSuccess ? (
          <div className="text-center">
            <h2 className="text-lg font-bold text-green-600">Payment Successful!</h2>
            <p className="text-gray-600">Your transaction was completed.</p>
          </div>
        ) : showStripePayment ? (
          <div>
            <button 
              onClick={() => setShowStripePayment(false)}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold">Card Payment</h2>
            <StripePayment
              amount={Number(safeAmount)}
              rideDetails={rideDetails}
              onSuccess={() => {
                setPaymentSuccess(true);
                setTimeout(() => {
                  onClose();
                }, 3000);
              }}
              onError={(error) => {
                console.error("Payment failed:", error);
              }}
            />
          </div>
        ) : showAddPayment ? (
          <AddPaymentView />
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
  const fare = typeof ride?.fare === 'number' ? ride.fare : 20;

  return (
    <>
      <button
        onClick={() => setShowPayment(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors z-[9999] relative"
      >
        <CreditCard className="w-4 h-4" />
        Pay Bill
      </button>

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          amount={Number(fare)}
          rideDetails={ride}
        />
      )}
    </>
  );
};

export default PaymentButton;
