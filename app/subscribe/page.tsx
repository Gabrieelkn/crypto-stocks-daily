"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/sendSubscribeEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        throw new Error("Error! Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-8 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Stay Informed with Our Newsletter
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Get daily news and expert articles on stocks and crypto delivered
            straight to your inbox.
          </p>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setValidationError("");
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                {validationError && (
                  <p className="mt-2 text-sm text-red-600">{validationError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!validationError || loading}
              >
                {loading ? "Sending email..." : "Subscribe to newsletter"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="text-center p-4 bg-green-100 rounded-md">
              <p className="text-green-800 font-medium">
                Thank you for subscribing!
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 text-center mt-6">
            By subscribing, you agree to receive daily updates on stocks and
            crypto news. You can unsubscribe at any time. We respect your
            privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
