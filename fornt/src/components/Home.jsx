import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import img1 from "../img/Home10.jpeg";

const Home = () => {
  return (
    <div>
      <div className="container1">
        <div className="box" id="box1">
          <Link to="/Find_a_pet">
            <h2>Click Here</h2>
          </Link>
        </div>
        <div className="box" id="box2">
          <Link to="/Find_a_pet">
            <h2>Click Here</h2>
          </Link>
        </div>
        <div className="box" id="box3">
          <Link to="/article">
            <h2>Share your story</h2>
          </Link>
        </div>
      </div>
      <div className="container6">
        <h2> The Benefits of Pet Ownership</h2>
        <div className="sub-container6">
          <img src={img1} alt="pet" />
          <p>
            Pets offer companionship, reducing loneliness, stress, and improving
            emotional well-being. They encourage physical activity, leading to
            better cardiovascular health. Pets facilitate social connections and
            provide a sense of routine and responsibility. They offer a sense of
            security and teach empathy and nurturing. Overall, pets enrich our
            lives by fostering happiness, health, and social interaction.
          </p>
        </div>
      </div>
      <div class="container2">
        <h2>Check out adoption advice</h2>
        <p>
          Get the inside scoop on pet adoption and bring home a furry friend.
        </p>
        <div class="column">
          <div>
            <h2>Why we recommend adopting</h2>
            <p>
              There are so many reasons to adopt: meeting a unique pet, spending
              less, doing a good deed—but let’s talk facts. Millions of pets
              enter shelters every year. And hundreds of thousands are
              euthanized each year. We don’t tell you that to guilt you or be a
              downer, but that’s why adoption really matters to us. So we would
              love it if you considered adopting. And, since you're here, we’re
              guessing you are. Seriously, no judgment if you find a pet another
              way (every pet parent journey is different!). But we’re here to
              help make adoption easier, however we can.
            </p>
          </div>
          <div>
            <h2>How to find the perfect pet</h2>
            <p>
              Let’s bust a myth. The perfect pet? Doesn’t exist. Because there
              are so many pets that can be the right fit for you. It’s just
              about knowing what you’re looking for. So start by thinking about
              your criteria based on your lifestyle, breed preferences, living
              situation, (fur and human) family, etc. From there, our team can
              help match you with the right pet. Check out our New Pet Alerts
              too: with Alerts, we’ll email you newly added adoptable pets that
              fit your search—so you can check out matches and meet your next
              best friend faster.
            </p>
          </div>
        </div>
      </div>
      <div className="container4">
        <h2>Our Mission :</h2>
        <p>
          "Our mission is to foster a world where every pet finds a loving home.
          Through education, advocacy, and community engagement, we strive to
          raise awareness about pet adoption and promote responsible pet
          ownership. We believe that every animal deserves compassion, care, and
          a forever family, and we are dedicated to making a difference in the
          lives of pets and people alike."
        </p>
        <div className="donation-home">
          <h3>Support Our Mission</h3>
          <p>
            Your donation can make a difference in the lives of pets in need.
          </p>
          <Link to="/Donate" className="text-blue-500">
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
