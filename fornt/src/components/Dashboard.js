import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { CustomFetch } from "../axios/CustionFetch";

const Dashboard = ({ uid }) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    CustomFetch.get("/api/item/get")
      .then((res) => {
        // console.log(res.data);
        const filteredItems = res.data.filter((item) => item.uid === uid);
        setItems(filteredItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.price_INR),
      0
    );
    setTotalPrice(total);
  }, [items]);

  const handleDelete = (id) => {
    CustomFetch.delete(`/api/item/deleteOne`, { data: { _id: id } })
      .then((res) => {
        const updatedItems = items.filter((item) => item._id !== id);
        setItems(updatedItems);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div>
      <h2 className="text-3xl">Dashboard</h2>
      {items.map((item) => (
        <div key={item._id} className="item-container">
          <h3 className="font-bold">{item.name}</h3>
          <p>Type: {item.type}</p>
          <p>Description: {item.description}</p>
          <p>Price: {item.price_INR}</p>
          <img src={item.img} alt={item.name} className="item-image" />
          <button className="btn" onClick={() => handleDelete(item._id)}>
            Remove this item
          </button>
        </div>
      ))}
      <h3 className="font-bold text-2xl">Total Price: {totalPrice} rps</h3>
      <button className="btn">Make Payment</button>
    </div>
  );
};

export default Dashboard;
