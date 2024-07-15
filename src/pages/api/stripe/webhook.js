// pages/api/webhook/stripe.js
import Stripe from "stripe";
import { buffer } from "micro";
import User from "@/model/User";
import dbConnect from "@/utils/dbconnect";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, required for Stripe webhooks
  },
};

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      const rawBody = await buffer(req);
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        sig,
        endpointSecret
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event, res);
      case "checkout.session.async_payment_failed":
        return handleAsyncPaymentFailed(event, res);
      case "checkout.session.async_payment_succeeded":
        return handleAsyncPaymentSucceeded(event, res);
      case "checkout.session.expired":
        return handleCheckoutSessionExpired(event, res);
      case "payment_intent.amount_capturable_updated":
        return handlePaymentIntentAmountUpdated(event, res);
      case "invoice.payment_succeeded":
        return handleInvoicePaymentSucceeded(event, res);
      default:
        console.log(`Unhandled event type: ${event.type}`);
        res.status(200).json({ received: true });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

async function handleCheckoutSessionCompleted(event, res) {
  const checkoutSession = event.data.object;
  console.log("checkout.session.completed:", checkoutSession);

  try {
    const userId = "6694f9ac861846fd20bfe307";
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "subscription.status": "active",
          "payment.status": "success",
          "payment.checkoutSessionId": checkoutSession.id,
          "payment.paymentIntentId": checkoutSession.payment_intent,
          "payment.amountTotal": checkoutSession.amount_total,
          "payment.currency": checkoutSession.currency,
          "payment.webhookEvent": JSON.stringify(event),
          "payment.webhookStatus": "received",
          "payment.webhookTimestamp": new Date(),
        },
      },
      { new: true }
    );

    if (!user) {
      console.error(`User not found for userId: ${userId}`);
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`Updated payment info for user ${user}`);
  } catch (error) {
    console.error("Error updating user payment info:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  res.status(200).json({ received: true });
}

function handleAsyncPaymentFailed(event, res) {
  const asyncPaymentFailed = event.data.object;
  console.log("checkout.session.async_payment_failed:", asyncPaymentFailed);

  res.status(200).json({ received: true });
}

function handleAsyncPaymentSucceeded(event, res) {
  const asyncPaymentSucceeded = event.data.object;
  console.log(
    "checkout.session.async_payment_succeeded:",
    asyncPaymentSucceeded
  );

  res.status(200).json({ received: true });
}

function handleCheckoutSessionExpired(event, res) {
  const checkoutSessionExpired = event.data.object;
  console.log("checkout.session.expired:", checkoutSessionExpired);

  res.status(200).json({ received: true });
}

function handlePaymentIntentAmountUpdated(event, res) {
  const amountCapturableUpdated = event.data.object;
  console.log(
    "payment_intent.amount_capturable_updated:",
    amountCapturableUpdated
  );

  // Handle payment intent amount capturable updated event
  // Example: Update database or send notification

  res.status(200).json({ received: true });
}

function handleInvoicePaymentSucceeded(event, res) {
  const invoicePaymentSucceeded = event.data.object;
  console.log("invoice.payment_succeeded:", invoicePaymentSucceeded);

  res.status(200).json({ received: true });
}
