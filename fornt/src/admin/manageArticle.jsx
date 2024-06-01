import React, { useState, useEffect } from "react";
import { CustomFetch } from "../axios/CustionFetch";
import { toast } from "react-toastify";

const ManageArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    CustomFetch.get("/api/artical/get")
      .then((res) => {
        console.log(res.data);
        setArticles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  };

  const deleteArticle = (id) => {
    let data = { _id: id };
    CustomFetch.delete(`/api/artical/deleteOne`, { data })
      .then((res) => {
        console.log(res.data);
        toast.success("deleted Successfully");
        fetchData();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="donations-container">
      <div className="donation-header ">
        <h1>Donations</h1>
        <button
          className="btn bg-cyan-400 hover:bg-cyan-300 "
          onClick={refreshPage}
        >
          Refresh
        </button>{" "}
      </div>
      {articles.map((article, index) => (
        <div key={index} className="article bg-slate-200 ">
          <div className="article-content">
            <h2 className="text-2xl">Title : {article.title}</h2>
            <p className="font-bold">Author: {article.author}</p>
            <p>content : {article.content}</p>
          </div>
          <div className="article-buttons">
            <button onClick={() => deleteArticle(article._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageArticle;
