import React, { useState } from "react";
import "./Donote.css";
import { loadStripe } from "@stripe/stripe-js";
import { CustomFetch } from "../axios/CustionFetch";
const Donate = () => {
  const [data, setData] = useState({ name: "", amount: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OnZUpSB5YEoLiYMpT1485D9HyF8Aj4k8Qbq09X2q2YJkjik2HRqwuyLo3mT6a5yU83Sfa3jppWWT5pZqJXFsAVo00ie9U0Okq"
      );

      const response = await CustomFetch.post("/api/payment/insert", data);

      const { id } = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl pb-6 pt-4">Donate</h1>
      <p>
        <h3 className="text-2xl pb-8 pt-4">🐾 Help Support PetPals! 🐾</h3>
        Dear Pet Lovers, We need your support to continue our mission of
        providing love, care, and shelter to animals in need through our PetPals
        program. Every day, countless furry friends rely on us for food,
        shelter, medical care, and love. With your generous donations, we can
        ensure that every pet receives the care and attention they deserve.{" "}
      </p>
      <div className="payment">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={data.amount}
          onChange={handleInputChange}
          required
        />

        <button onClick={handlePayment} className="btn">
          Donate now
        </button>
      </div>
    </div>
  );
};

export default Donate;
