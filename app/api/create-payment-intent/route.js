// app/api/create-payment-intent/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Get the request body
    const body = await request.json();
    const { amount, rideDetails } = body;

    // Validate the amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure it's an integer
      currency: 'usd', // or your preferred currency
      payment_method_types: ['card'],
      metadata: {
        rideId: rideDetails.id,
        driver: rideDetails.driver,
        pickup: rideDetails.pickup,
        dropoff: rideDetails.dropoff,
      },
    });

    // Return the client secret
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}