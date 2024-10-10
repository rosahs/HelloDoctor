// import { NextRequest, NextResponse } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function POST(request: NextRequest) {
//   try {
//     const { amount } = await request.json();

//     // Create a payment intent with specific payment methods
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       payment_method_types: ['card', 'us_bank_account', 'cashapp', 'klarna'], // Exclude 'link'
//       automatic_payment_methods: { enabled: false }, // Disable automatic inclusion of Link
//     });

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  
//   } catch (error) {
//     console.error("Internal Error:", error);

//     // Handle other errors (e.g., network issues, parsing errors, etc.)
//     return NextResponse.json(
//       { error: `Internal Server Error: ${error}` },
//       { status: 500 }
//     );
//   }
// }