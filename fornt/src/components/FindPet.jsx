import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Findpet.css";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/CustionFetch";

const FindPet = (props) => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("cats");

  const [cat, setCat] = React.useState([]);
  const [dog, setDog] = React.useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  React.useEffect(() => {
    CustomFetch.get("/api/form/get")
      .then((res) => {
        const cats = [];
        const dogs = [];
        res.data.forEach((pet) => {
          const { petType } = pet;
          if (petType === "cat" && !cats.some((c) => c._id === pet._id)) {
            cats.push(pet);
          } else if (
            petType === "dog" &&
            !dogs.some((d) => d._id === pet._id)
          ) {
            dogs.push(pet);
          }
        });
        setCat(cats);
        setDog(dogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handlePetSelect = (pet) => {
    if (!props.login) {
      toast.success("Please login");
      return navigate("/Signin");
    }
    setSelectedPet(pet);
    props.setPetreq(pet);
  };

  const handleBack = () => {
    setSelectedPet(null);
  };

  return (
    <>
      {selectedPet ? (
        <div id="single">
          <h1 className="text-3xl m-4">{selectedPet.petName}</h1>
          <div>
            <div className="flex gap-20 mt-10">
              <div>
                <img
                  src={selectedPet.image}
                  alt={`Photo of ${selectedPet.petName}`}
                />
              </div>
              <div className="flex justify-center flex-col gap-4 ">
                <p>Age: {selectedPet.age} years</p>
                <p>Pet Type: {selectedPet.petType}</p>
                <p>Description: {selectedPet.description}</p>
                <p>Friendly With Kids: {selectedPet.friendlyWithKids}</p>
                <p>Reason For Adoption: {selectedPet.reasonForAdoption}</p>
                <p>Any Illness: {selectedPet.anyIllness}</p>
                <div className="ml-16">
                  <Link to="/AdoptionForm">
                    <button className="btn">Adopt Me</button>
                  </Link>

                  <button onClick={handleBack} className="btn">
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="all" className="bg-slate-300 min-h-screen">
            <h1 className="font-bold text-3xl">Choose Your pals</h1>
            <select
              className="w-52 h-14"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="cats">Cats</option>
              <option value="dogs">Dogs</option>
            </select>

            <div id="maincontainer">
              {filter === "cats" ? (
                <>
                  <h2 className="font-bold text-2xl">Cats</h2>
                  <ul className="flex gap-28 flex-wrap justify-center align-middle">
                    {cat.map((data, index) => (
                      <li
                        key={index}
                        className="items border-2 border-black p-3 mt-4 bg-sky-100 w-72 ml-6"
                      >
                        <img
                          src={data.image}
                          alt={data.breed}
                          className="img"
                        />

                        <p>{data.petName}</p>
                        <p>{data.description}</p>
                        <button
                          className="btn"
                          onClick={() => {
                            handlePetSelect(data);
                          }}
                        >
                          Adopt Me
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-2xl">Dogs</h2>
                  <ul className="flex gap-28 flex-wrap justify-center align-middle">
                    {dog.map((data, index) => (
                      <li
                        key={index}
                        className="items border-2 border-black p-3 mt-4 bg-sky-100 w-72 ml-6"
                      >
                        <img
                          src={data.image}
                          alt={data.breed}
                          className="img"
                        />
                        <p>{data.petName}</p>
                        <p>{data.description}</p>
                        <button
                          className="btn"
                          onClick={() => {
                            handlePetSelect(data);
                          }}
                        >
                          Adopt Me
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FindPet;
