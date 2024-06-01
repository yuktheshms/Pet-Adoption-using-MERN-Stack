import React, { useEffect, useState } from "react";
import "./AdoptionRequest.css";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/CustionFetch";

const AdoptionRequest = () => {
  const [data, setData] = useState([]);

  const [viewRequest, isViewResquest] = useState(true);
  const [selectedPet, setSingleData] = useState(false);
  const [view, setView] = useState("user");
  useEffect(() => {
    CustomFetch.get("/api/request/get")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handledeletereq = (id) => {
    CustomFetch.delete(`/api/request/deleteSingle/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleView = (id) => {
    CustomFetch.get(`/api/form/getSingle/${id}`)
      .then((res) => {
        console.log(res);
        setSingleData(res.data);
        setView("pet");
        console.log(view);
        if (viewRequest) {
          return isViewResquest(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleuser = (uid) => {
    let data = { _id: uid };

    CustomFetch.post("/api/petpals/getSingle", data)
      .then((res) => {
        console.log("Setting view to user");
        // setView("user");

        console.log(res.data);
        const userData = res.data;
        setSingleData(userData);
        isViewResquest(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAccept = (id) => {
    // console.log("id bbbbb", id);
    CustomFetch.post(`/api/request/success/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("successfully Accepted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReject = (id) => {
    CustomFetch.post(`/api/request/reject/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("successfully Rejected");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="admin-reqform">
      <h1>Adoption Request</h1>
      {viewRequest ? (
        <ul>
          {data.map((req) => (
            <li key={req._id}>
              <p>request id : {req._id}</p>
              <p>Name : {req.fullName}</p>
              <p>Address : {req.address}</p>
              <p>Email :{req.email}</p>
              <p>Experience :{req.experience}</p>
              <p>no of pets Owned : {req.petsOwned}</p>
              <p>Phone no : {req.phone}</p>
              <p>reason : {req.reason}</p>
              <button
                className="btn btn-secondary inline"
                onClick={() => {
                  handledeletereq(req._id);
                }}
              >
                Remove
              </button>
              <button
                className="btn btn-secondary inline"
                onClick={() => {
                  handleView(req.reqpet);
                }}
              >
                View Request
              </button>
              <button
                className="btn btn-secondary inline"
                onClick={() => {
                  handleuser(req.uid);
                }}
              >
                User profile
              </button>
              <button
                className="btn btn-secondary inline"
                onClick={() => {
                  handleAccept(req._id);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary inline"
                onClick={() => {
                  handleReject(req._id);
                }}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : view === "pet" ? (
        <div id="singlerequestview">
          <div className="singleRequest">
            <h1>{selectedPet.petName}</h1>
            <img src={selectedPet.image} alt="photo" />
            <p>Age: {selectedPet.age}</p>
            <p>Pet Type: {selectedPet.petType}</p>
            <p>Description: {selectedPet.description}</p>
            <p>Friendly With Kids: {selectedPet.friendlyWithKids}</p>
            <p>Reason For Adoption: {selectedPet.reasonForAdoption}</p>
            <p>Any Illness: {selectedPet.anyIllness}</p>
            <button
              className="btn"
              onClick={() => {
                isViewResquest(true);
              }}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div id="singlerequestview">
          <div className="singleRequest">
            <div id="single-profile">
              <img src={selectedPet.image} alt="err" />
              <p> Username : {selectedPet.Username}</p>
              <p> dob : {selectedPet.dob}</p>
              <p> email : {selectedPet.email}</p>
              <p> country : {selectedPet.country}</p>
            </div>
            <button
              className="btn"
              onClick={() => {
                isViewResquest(true);
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequest;
