import { toDateTime } from '@/utils/helpers';
import { stripe } from '@/utils/stripe/config';
// Supabase removed
// import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
// import type { Database, Tables, TablesInsert } from 'types_db';

type Product = any; // TablesInsert<'products'>;
type Price = any; // TablesInsert<'prices'>;

// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0;

// Supabase removed
// const supabaseAdmin = createClient<Database>(...);
const supabaseAdmin: any = null;

const upsertProductRecord = async (product: Stripe.Product) => {
  // Supabase removed
  // const productData: Product = {...};
  // const { error: upsertError } = await supabaseAdmin.from('products').upsert([productData]);
  console.log(`Product insert/update skipped - Supabase removed: ${product.id}`);
};

const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
) => {
  // Supabase removed
  // const priceData: Price = {...};
  // const { error: upsertError } = await supabaseAdmin.from('prices').upsert([priceData]);
  console.log(`Price insert/update skipped - Supabase removed: ${price.id}`);
};

const deleteProductRecord = async (product: Stripe.Product) => {
  // Supabase removed
  // const { error: deletionError } = await supabaseAdmin.from('products').delete()...
  console.log(`Product deletion skipped - Supabase removed: ${product.id}`);
};

const deletePriceRecord = async (price: Stripe.Price) => {
  // Supabase removed
  // const { error: deletionError } = await supabaseAdmin.from('prices').delete()...
  console.log(`Price deletion skipped - Supabase removed: ${price.id}`);
};

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  // Supabase removed
  // const { error: upsertError } = await supabaseAdmin.from('customers').upsert([...]);
  return customerId;
};

const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  if (!newCustomer) throw new Error('Stripe customer creation failed.');

  return newCustomer.id;
};

const createOrRetrieveCustomer = async ({
  email,
  uuid
}: {
  email: string;
  uuid: string;
}) => {
  // Supabase removed - just create/retrieve from Stripe directly
  // const { data: existingSupabaseCustomer } = await supabaseAdmin.from('customers')...
  
  // Try to retrieve Stripe customer ID by email
  const stripeCustomers = await stripe.customers.list({ email: email });
  let stripeCustomerId: string | undefined =
    stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;

  // If still no stripeCustomerId, create a new customer in Stripe
  if (!stripeCustomerId) {
    stripeCustomerId = await createCustomerInStripe(uuid, email);
  }
  
  if (!stripeCustomerId) throw new Error('Stripe customer creation failed.');
  return stripeCustomerId;
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  // Supabase removed
  // const { error: updateError } = await supabaseAdmin.from('users').update({...});
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Supabase removed - using customerId directly as uuid (not ideal but works without DB)
  // const { data: customerData } = await supabaseAdmin.from('customers')...
  const uuid = customerId; // Fallback: use customerId as uuid

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });
  // Upsert the latest status of the subscription object.
  // Supabase removed - subscriptionData not used
  const subscriptionData: any = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    //TODO check quantity on subscription
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(
      subscription.current_period_start
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end
    ).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null
  };

  // Supabase removed
  // const { error: upsertError } = await supabaseAdmin.from('subscriptions').upsert([subscriptionData]);
  console.log(
    `Subscription update skipped - Supabase removed: [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  deleteProductRecord,
  deletePriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange
};
