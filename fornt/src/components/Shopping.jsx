import React from "react";
import img1 from "../img/pet-mountain-pet-supplies.png";
import img2 from "../img/PetPlate-sup.jpg";
import img3 from "../img/OIP.jpeg";

const Shopping = () => {
  return (
    <div>
      <h1 className="text-3xl">Shopping</h1>
      <div className="flex gap-20 justify-center align-middle mt-20">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={img1} alt="shop1" className="w-full h-72 object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-yellow-900">
              Pet Mountain Pet Supplies
            </h2>
            <p>
              A one-stop destination for all your pet supply <br /> needs.
            </p>
            <div className="card-actions justify-center align-middle">
              <a
                href="https://petmountain.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Shop Now</button>
              </a>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={img2} alt="shop2" className="w-full h-72 object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-yellow-900">PetPlate</h2>
            <p>High-quality and nutritious meals for your beloved pets.</p>
            <div className="card-actions justify-end">
              <a
                href="https://www.petproductnews.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Shop Now</button>
              </a>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={img3} alt="Shoes" className="w-full h-72 object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-yellow-900">Pet Product News</h2>
            <p>
              Stay updated with the latest news and trends in the pet industry.
            </p>

            <div className="card-actions justify-end">
              <a
                href="https://www.amazon.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Shop Now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
