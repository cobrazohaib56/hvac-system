# SaaS AI Boilerplate

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step-by-step setup](#step-by-step-setup)
   1. [Deployment](#deployment)
   2. [Local Development](#local-development)
   3. [Going Live](#going-live)

## Prerequisites

- Node.js 20.11.1
- Docker
- Supabase account (DB, authentication, storage)
- Vercel account (hosting + AI integration)
- Stripe account (subscriptions)
- OpenAI account (AI integration)
- Resend account (emails)
- Crisp account (customer support chat)
- Retell AI account (voice agent for live voice calls)

## Step-by-step setup

### Deployment

#### 1. Clone the repository

In your terminal, run the following commands:

```bash
git clone https://github.com/saasai-dev/saasai-dev-starter-kit.git
```

```bash
cd saasai-dev-starter-kit
```

#### 2. Create a new repository on GitHub

Go to https://github.com/new and create a new private repository. Don't initialize it with a `README`, `.gitignore`, or license.

After you created the repository, run the following commands in the project folder:

```bash
git remote rename origin upstream
```

```bash
# change "your-account" to your GitHub username
# change "your-repository" to your newly created repository name
git remote add origin https://github.com/your-account/your-repository.git
```

```bash
git push origin main
```

Now the SaaS AI code should be in your own repository.

#### 3. Deploy the website on Vercel

Go to Vercel, click on `Add New > Project`, connect your GitHub account if you didn't already, import your repository and click `Deploy`.

The deploy will fail because we did not add the necessary environment variables. That's fine, we will add them in the following steps. You can click on `Go to project > Settings > Environment Variables`. Lave this page open.

#### 4. Supabase

Go to https://supabase.com/dashboard/projects and create a new project by clicking on `New project`.

After eveything is set-up, go to `Project Settings > API`. Here you will find the Project URL and API keys needed for Vercel. You will need the following values:

- Copy the `project URL` and paste it in Vercel as the value for the `NEXT_PUBLIC_SUPABASE_URL` key.
- Copy the `anon public` key and paste it in Vercel as the value for the `NEXT_PUBLIC_SUPABASE_ANON_KEY` key.
- Copy the `service_role` and paste it in Vercel as the value for the `SUPABASE_SERVICE_ROLE_KEY` key.

After adding all of the keys and values, click `Save`. Leave this page open.

#### 5. Stripe

Next, we'll need to configure [Stripe](https://stripe.com/) to handle test payments. If you don't already have a Stripe account, create one now.

For the following steps, make sure you have the ["Test Mode" toggle](https://stripe.com/docs/testing) switched on.

##### Create a webhook

We need to create a webhook in the `Developers` section of Stripe. This webhook is the piece that connects Stripe to your Vercel Serverless Functions.

1. Click the "Add Endpoint" button on the [test Endpoints page](https://dashboard.stripe.com/test/webhooks).
1. Enter your production deployment URL followed by `/api/webhooks` for the endpoint URL. (e.g. `https://your-project-name.vercel.app/api/webhooks`)
1. Click `Select events` under the `Select events to listen to` heading.
1. Click `Select all events` in the `Select events to send` section.
1. Copy the `Signing secret` and paste it as the value for the `STRIPE_WEBHOOK_SECRET` key in Vercel.
1. Go back to Stripe, go to `API Keys` and copy the `Publishable key`
1. Paste it in Vercel as the value for the `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
1. Back in Stripe, reveal and copy the `Secret key`
1. Paste is as the value for `STRIPE_SECRET_KEY` in Vercel and click on `Save`.

#### 6. OpenAI

1. Go to https://openai.com and create an account.
2. Go to `API keys`, `Create a new secret key`, copy it, and paste it in Vercel as the value for the `OPENAI_API_KEY`. Click `Save`.

#### 7. Resend

1. Go to https://resend.com and create an account.
1. Go to `API Keys`, `Create API Key`, copy it, and paste it in Vercel as the value for the `RESEND_API_KEY`. Click `Save`.

#### 8. Deploy

1. In Vercel, go to `Deployments`, and on the latest deploy click the overflow menu button and select `Redeploy` (do NOT enable the "Use existing Build Cache" option). Once Vercel has rebuilt and redeployed your app, you're ready to s
1. Click `Redeploy`. Once Vercel has rebuilt and redeployed your app, you're ready to set up your products and prices.

#### 9. Initialize database

1. In your local project, there should bea a `schema.sql` file. Open it and copy everyting inside.
1. In Supabase, go to `SQL Editor` and paste the file contents in the top panel.
1. Before clicking `Run`, make sure you are in the newly created Supabase project.
1. Click `Run`. A modal might warn you that Supabase "detected a potentially destructive operation". Continue by clicking `Run destructive query`. A "Success" message should pop-up in the bottom panel.
1. Go to the `Table Editor` page. If everything went right, you should see 5 new tables in the left panel.

#### 10. Supabase auth redirects

In Supabase, navigate to the [auth settings](https://app.supabase.com/project/_/auth/url-configuration) and add the following wildcard URL to "Redirect URLs": `https://*-username.vercel.app/**`. You can read more about redirect wildcard patterns in the [docs](https://supabase.com/docs/guides/auth#redirect-urls-and-wildcards).

#### 11. Create product and pricing information

Your application's webhook listens for product updates on Stripe and automatically propagates them to your Supabase database. So with your webhook listener running, you can now create your product and pricing information in the [Stripe Dashboard](https://dashboard.stripe.com/test/products).

Stripe Checkout currently supports pricing that bills a predefined amount at a specific interval. More complex plans (e.g., different pricing tiers or seats) are not yet supported.

For example, you can create business models with different pricing tiers, e.g.:

- Product 1: Hobby
  - Price 1: 10 USD per month
  - Price 2: 100 USD per year
- Product 2: Freelancer

  - Price 1: 20 USD per month
  - Price 2: 200 USD per year

After you created the products, go to the website's landing page. The products should be listed in the "Pricing Plans" section.

#### 12. Configure the Stripe customer portal

1. Set your custom branding in the [settings](https://dashboard.stripe.com/settings/branding)
1. Configure the Customer Portal [settings](https://dashboard.stripe.com/test/settings/billing/portal)
1. Toggle on "Allow customers to update their payment methods"
1. Toggle on "Allow customers to update subscriptions"
1. Toggle on "Allow customers to cancel subscriptions"
1. Add the products and prices that you want
1. Set up the required business information and links

### Local Development

You will need to go through the [Deployment](#deployment) section before continuing.

In your project directory, use the [Vercel CLI](https://vercel.com/download) to link your project:

```bash
vercel login
vercel link
```

If you don't intend to use a local Supabase instance for development and testing, you can use the Vercel CLI to download the development env vars:

```bash
vercel env pull .env.local
```

Running this command will create a new `.env.local` file in your project folder. For security purposes, you will need to set the `SUPABASE_SERVICE_ROLE_KEY` manually from your [Supabase dashboard](https://app.supabase.io/) (`Settings > API`). If you are not using a local Supabase instance, you should also change the `--local` flag to `--remote` in the `supabase:generate-types` script in `package.json`.

#### Local development with Supabase

It's highly recommended to use a local Supabase instance for development and testing. We have provided a set of custom commands for this in `package.json`.

First, you will need to install [Docker](https://www.docker.com/get-started/). You should also copy `.env.local.example` to `.env.local`.

Next, run the following command to start a local Supabase instance and run the migrations to set up the database schema:

```bash
# or `npm` or `yarn` instead of `pnpm`
pnpm run supabase:start
```

The terminal output will provide you with values for the environment variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Copy these into your `.env.local` file.

The terminal output will also provide you with a URL to access the local Supabase Studio, where you can make changes to your local database instance. (You can always find the Supabase Studio later by opening up a Docker window, navigating to `Containers` tab, and clicking the link in the `Ports` column for the corresponding container.)

To link your local Supabase instance to your project, you will need to set `SUPABASE_PROJECT_REF` and `SUPABASE_DB_PASSWORD` for your remote database in your `.env.local` file. You can find these values in the [Supabase dashboard](https://supabase.com/dashboard/projects) for your project. Then, run the following command to link your local Supabase instance to your project:

```bash
pnpm run supabase:link
```

Once you've linked your project, you can make changes to the database schema in your local Supabase Studio and run the following command to generate TypeScript types to match your schema:

```bash
pnpm run supabase:generate-types
```

You can also automatically generate a migration file with all the changes you've made to your local database schema and then push the migration to your remote database with the following commands:

```bash
pnpm run supabase:generate-migration
pnpm run supabase:migrate
```

Remember to test your changes thoroughly in your local environment before deploying them to production!

#### Use the Stripe CLI to test webhooks

[Install the Stripe CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#login-account).

Next, start local webhook forwarding:

```bash
stripe listen --forward-to=localhost:3000/api/webhooks
```

Running this Stripe command will print a webhook secret (such as, `whsec_***`) to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file. If you haven't already, you should also set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` in your `.env.local` file using the **test mode**(!) keys from your Stripe dashboard.

#### Configure Retell AI for Voice Calls

1. Go to [Retell AI Dashboard](https://dashboard.retellai.com/) and create a voice agent if you haven't already.
2. Get your API key from the dashboard (Settings > API Keys).
3. Get your agent ID from the agent settings page.
4. Add the following to your `.env.local` file:

```bash
RETELL_API_KEY=your_retell_api_key_here
RETELL_AGENT_ID=your_agent_id_here
```

The voice call widget will appear as a floating button in the bottom-right corner of your site. Users can click it to start a live voice conversation with your Retell agent.

#### Install dependencies and run the Next.js client

In a separate terminal, run the following commands to install dependencies and start the development server:

```bash
pnpm install
pnpm run dev
# or
npm install
npm run dev
# or
yarn
yarn dev
```

Note that webhook forwarding and the development server must be running concurrently in two separate terminals for the application to work correctly.

Finally, navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application rendered.

### Going live

#### Archive testing products

Archive all test mode Stripe products before going live. Before creating your live mode products, make sure to follow the steps below to set up your live mode env vars and webhooks.

#### Configure production environment variables

To run the project in live mode and process payments with Stripe, switch Stripe from "test mode" to "production mode." Your Stripe API keys will be different in production mode, and you will have to create a separate production mode webhook. Copy these values and paste them into Vercel, replacing the test mode values.

#### Redeploy

Afterward, you will need to rebuild your production deployment for the changes to take effect. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy" (do NOT enable the "Use existing Build Cache" option).

To verify you are running in production mode, test checking out with the [Stripe test card](https://stripe.com/docs/testing). The test card should not work.
