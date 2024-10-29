"use client";

import CheckoutPage from "@/components/Checkout-page/page";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import PaymentLinks from "@/components/auth/Constants";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
    const [clientSecret, setClientSecret] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const amount = 49.99;

    const stripeLink = PaymentLinks.Stripe;

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else if (data.error) {
                setErrorMessage(data.error);
            }
        })
        .catch((error) => {
            console.error("Error fetching client secret:", error);
            setErrorMessage(
                error.message || "An error occurred while fetching the payment information."
            );
        });
    }, [amount]);

    return (
        <main className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-[var(--secondary-color)] shadow-lg rounded-lg p-16 h-[550px] max-w-4xl w-full mx-4">
                <div className="mb-6">
                    <h1 className="text-5xl font-bold text-center text-[var(--primary-color)] mb-8">HelloDoctor</h1>
                    <h2 className="text-3xl text-black text-center mb-8">
                        has requested <span className="font-semibold">${amount.toFixed(2)}</span>
                    </h2>
                </div>

                {stripeLink ? (
                    <a
                        href={stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-[var(--primary-color)] hover:opacity-50 text-white font-semibold py-4 px-16 rounded-md text-2xl transition duration-300"
                    >
                        Pay with Stripe
                    </a>
                ) : clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutPage amount={amount} />
                    </Elements>
                ) : errorMessage ? (
                    <div className="text-red-500 text-center mb-6 text-2xl">{errorMessage}</div>
                ) : (
                    <p className="text-center text-black text-xl">Loading payment information...</p>
                )}
            </div>
        </main>
    );
}