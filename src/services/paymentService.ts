import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  });

export const processPayment = async (amount: number, paymentMethodId: string): Promise<Stripe.PaymentIntent> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,  
      currency: "usd",  
      payment_method: paymentMethodId,  
     // confirmation_method: "manual",  
      confirm: true,  
      automatic_payment_methods: {
        enabled: true, 
        allow_redirects: "never",  
      },
    });

    return paymentIntent;  
  } catch (error) {
    throw new Error(`Error processing payment: ${error instanceof Error ? error.message : error}`);
  }
};
