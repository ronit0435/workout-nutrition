
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function DemoOrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [productId, setProductId] = useState("whey-protein");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setOrderNumber("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-demo-order",
        {
          body: {
            customerName,
            customerEmail,
            customerPhone,
            productId,
            quantity,
          },
        }
      );

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.message || "Could not save demo order.");
      }

      setOrderNumber(data.order.orderNumber);
      setMessage(
        `Demo order saved successfully. Total: ₹${data.order.total}`
      );
    } catch (err) {
      console.error("Demo order failed:", err);
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-lg rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold">Demo Checkout</h2>
      <p className="mb-5 text-sm text-gray-600">
        Demo only — no payment will be taken.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Customer name</label>
          <input
            className="w-full rounded-lg border p-3"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            minLength={2}
            maxLength={100}
            required
          />
        </div>

        <div>
          <label className="mb-1 block">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border p-3"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            maxLength={254}
            required
          />
        </div>

        <div>
          <label className="mb-1 block">Phone (optional)</label>
          <input
            type="tel"
            className="w-full rounded-lg border p-3"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            maxLength={30}
          />
        </div>

        <div>
          <label className="mb-1 block">Product</label>
          <select
            className="w-full rounded-lg border p-3"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="whey-protein">Whey Protein 1kg — ₹1,999</option>
            <option value="creatine">Creatine Monohydrate 250g — ₹999</option>
            <option value="pre-workout">Pre-Workout 300g — ₹1,499</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block">Quantity (1–10)</label>
          <input
            type="number"
            className="w-full rounded-lg border p-3"
            min={1}
            max={10}
            step={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black p-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Saving order..." : "Place Demo Order"}
        </button>
      </form>

      {message && (
        <div className="mt-4 rounded-lg bg-gray-100 p-3" role="status">
          <p>{message}</p>
          {orderNumber && (
            <p className="mt-1 font-semibold">
              Order ID: {orderNumber}
            </p>
          )}
          {orderNumber && (
            <p className="mt-1 text-sm text-gray-600">
              Demo order only — no payment was made.
            </p>
          )}
        </div>
      )}
    </section>
  );
}