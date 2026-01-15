'use server';

import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config';
// Supabase removed
// import { createClient } from '@/utils/supabase/server';
import { createOrRetrieveCustomer } from '@/utils/supabase/admin';
import {
  getURL,
  getErrorRedirect,
  calculateTrialEndUnixTimestamp
} from '@/utils/helpers';
// import { Tables } from '@/types_db';

type Price = any; // Tables<'prices'>;

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

export async function checkoutWithStripe(
  price: Price,
  redirectPath: string = '/account'
): Promise<CheckoutResponse> {
  try {
    // Supabase removed - using a placeholder customer ID
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    
    // Retrieve or create the customer in Stripe (without Supabase user)
    let customer: string;
    try {
      // Create customer directly in Stripe without Supabase UUID
      const stripeCustomers = await stripe.customers.list({ limit: 1 });
      if (stripeCustomers.data.length > 0) {
        customer = stripeCustomers.data[0].id;
      } else {
        const newCustomer = await stripe.customers.create({});
        customer = newCustomer.id;
      }
    } catch (err) {
      console.error(err);
      throw new Error('Unable to access customer record.');
    }

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer,
      customer_update: {
        address: 'auto'
      },
      line_items: [
        {
          price: price.id,
          quantity: 1
        }
      ],
      cancel_url: getURL(),
      success_url: getURL(redirectPath)
    };

    console.log(
      'Trial end:',
      calculateTrialEndUnixTimestamp(price.trial_period_days)
    );
    if (price.type === 'recurring') {
      params = {
        ...params,
        mode: 'subscription',
        subscription_data: {
          trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days)
        }
      };
    } else if (price.type === 'one_time') {
      params = {
        ...params,
        mode: 'payment'
      };
    }

    // Create a checkout session in Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error('Unable to create checkout session.');
    }

    // Instead of returning a Response, just return the data or error.
    if (session) {
      return { sessionId: session.id };
    } else {
      throw new Error('Unable to create checkout session.');
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          error.message,
          'Please try again later or contact a system administrator.'
        )
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      };
    }
  }
}

export async function createStripePortal(currentPath: string) {
  try {
    // Supabase removed
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    
    // Get customer directly from Stripe (without Supabase)
    let customer;
    try {
      // Try to get a customer from Stripe (simplified - no user lookup)
      const stripeCustomers = await stripe.customers.list({ limit: 1 });
      if (stripeCustomers.data.length > 0) {
        customer = stripeCustomers.data[0].id;
      } else {
        throw new Error('No customer found');
      }
    } catch (err) {
      console.error(err);
      throw new Error('Unable to access customer record.');
    }

    if (!customer) {
      throw new Error('Could not get customer.');
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL('/account')
      });
      if (!url) {
        throw new Error('Could not create billing portal');
      }
      return url;
    } catch (err) {
      console.error(err);
      throw new Error('Could not create billing portal');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return getErrorRedirect(
        currentPath,
        error.message,
        'Please try again later or contact a system administrator.'
      );
    } else {
      return getErrorRedirect(
        currentPath,
        'An unknown error occurred.',
        'Please try again later or contact a system administrator.'
      );
    }
  }
}
