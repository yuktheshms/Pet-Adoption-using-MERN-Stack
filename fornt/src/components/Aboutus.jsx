import React from "react";
import "./About.css";

const AboutAndContact = () => {
  return (
    <div>
      <div className="pt-10">
        <h1 className="font-bold text-3xl">About Us</h1>
        <p>
          Welcome to PetPals! We are passionate about connecting pets with
          loving families.
        </p>
        <p>
          Our mission is to make the adoption process easy and enjoyable for
          both pets and their new owners.
        </p>
        <p>
          Whether you're looking for a furry friend or want to find a loving
          home for a pet in need, PetPals is here to help.
        </p>
      </div>
      <div className="pt-10">
        <h1 className="font-bold text-3xl">Contact Us</h1>
        <p>If you have any questions or inquiries, feel free to contact us:</p>
        <ul>
          <li>Email: usera5653@gmail.com</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutAndContact;
