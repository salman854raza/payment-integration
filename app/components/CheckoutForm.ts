import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useStore } from "../lib/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useStore();
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedRate, setSelectedRate] = useState("");
  const [error, setError] = useState("");
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const fetchShippingRates = async () => {
    try {
      const response = await axios.post("/api/shipping-rates", {
        address: shipping,
        items: cart,
      });
      setShippingRates(response.data.rates);
    } catch (err) {
      setError("Failed to fetch shipping rates");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !selectedRate) return;

    try {
      const response = await axios.post("/api/create-payment-intent", {
        amount: Math.round((total + parseFloat(selectedRate)) * 100),
        currency: "usd",
      });

      const { clientSecret } = response.data;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setError(error.message || "Payment failed");
      } else {
        clearCart();
        window.location.href = "/success";
      }
    } catch (err) {
      setError("Payment processing failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold">Shipping Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shipping.address}
          onChange={handleShippingChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shipping.city}
          onChange={handleShippingChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shipping.state}
          onChange={handleShippingChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={shipping.zip}
          onChange={handleShippingChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="button"
        onClick={fetchShippingRates}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Get Shipping Rates
      </button>
      {shippingRates.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold">Shipping Options</h3>
          {shippingRates.map((rate) => (
            <div key={rate.service_code} className="flex items-center mt-2">
              <input
                type="radio"
                name="shippingRate"
                value={rate.shipping_amount.amount}
                onChange={(e) => setSelectedRate(e.target.value)}
                className="mr-2"
              />
              <label>
                {rate.service_name} - ${rate.shipping_amount.amount}
              </label>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-2xl font-semibold mt-6">Payment Information</h2>
      <CardElement className="border p-2 rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || !elements || !selectedRate}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600"
      >
        Place Order
      </button>
    </form>
  );
}

const CheckoutWrapper = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutWrapper;