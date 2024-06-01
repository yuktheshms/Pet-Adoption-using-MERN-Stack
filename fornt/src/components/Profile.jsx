import React, { useEffect, useState } from "react";
import "./Profile.css";
import { CustomFetch } from "../axios/CustionFetch";

const Profile = (uid) => {
  // console.log(uid.uuid);
  const [data, setData] = useState([]);
  useEffect(() => {
    CustomFetch.post("/api/petpals/getSingle", { _id: uid.uuid })
      .then((res) => {
        const userData = res.data;
        setData([userData]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  return (
    <div>
      <div>
        <h1 className="text-4xl pb-8 text-cyan-700">Profile</h1>
        <div>
          {data.map((data) => {
            return (
              <div className="flex flex-row justify-evenly mt-32">
                <img
                  src={data.image}
                  alt="err"
                  className="pb-8 w-80 h-80 rounded-full"
                />

                <div className="font-bold text-2xl flex flex-col gap-3">
                  <p> Username : {data.Username}</p>
                  <p> dob : {data.dob}</p>
                  <p> email : {data.email}</p>
                  <p> country : {data.country}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
