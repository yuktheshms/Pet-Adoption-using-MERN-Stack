import React, { useState } from "react";
import { useEffect } from "react";
import "./donation.css";
import { CustomFetch } from "../axios/CustionFetch";
const Donation = () => {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    CustomFetch.get("/api/payment/get")
      .then((res) => {
        console.log(res);
        setData(res.data);
        const total = res.data.reduce(
          (acc, curr) => acc + parseInt(curr.amount),
          0
        );
        setTotalAmount(total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="donations-container">
      <div className="donation-header">
        <h1>Donations</h1>
        <h2 className="text-xl font-bold text-gray-800">
          Total Amount: {totalAmount}
        </h2>
      </div>
      {data.map((p) => (
        <div className="donation-card" key={p._id}>
          <h2>{p.name}</h2>
          <p>Transaction ID: {p._id}</p>
          <p>Amount: {p.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default Donation;
