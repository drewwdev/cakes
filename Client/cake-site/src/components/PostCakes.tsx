import React, { useState } from "react";

const PostCakes = () => {
  const [cakeName, setCakeName] = useState("");
  const [cakeDescription, setCakeDescription] = useState("");
  const [cakePrice, setCakePrice] = useState(0);
  const [cakeImage, setCakeImage] = useState("");
  const [cakeFlavors, setCakeFlavors] = useState("");
  const [available, setAvailable] = useState(false);

  const handleCakeNameChange = (event) => {
    setCakeName(event.target.value);
  };

  const handleCakeDescriptionChange = (event) => {
    setCakeDescription(event.target.value);
  };

  const handleCakePriceChange = (event) => {
    setCakePrice(event.target.value);
  };

  const handleCakeImageChange = (event) => {
    setCakeImage(event.target.value);
  };

  const handleCakeFlavorChange = (event) => {
    setCakeFlavors(event.target.value);
  };

  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !cakeName ||
      !cakeFlavors ||
      !cakePrice ||
      !cakeDescription ||
      !cakeImage ||
      !available
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    const flavorsArray = cakeFlavors.split(",").map((flavor) => flavor.trim());

    const jsonData = {
      name: cakeName,
      flavor: flavorsArray,
      price: cakePrice,
      description: cakeDescription,
      imageUrl: cakeImage,
      isAvailable: available,
    };

    console.log("JSON data to be sent:", jsonData);

    fetch("http://localhost:5194/cakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cakeName,
        flavor: cakeFlavors,
        price: cakePrice,
        description: cakeDescription,
        imageUrl: cakeImage,
        isAvailable: available,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cake posted successfully:", data);
      })
      .catch((error) => {
        console.error("Error posting cake:", error);
      });
  };

  return (
    <div>
      <h2>Post a Cake</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Cake Name:
          <input type="text" value={cakeName} onChange={handleCakeNameChange} />
        </label>
        <br />
        <label>
          Cake Description:
          <input
            type="text"
            value={cakeDescription}
            onChange={handleCakeDescriptionChange}
          />
        </label>
        <br />
        <label>
          Cake Price:
          <input
            type="number"
            value={cakePrice}
            onChange={handleCakePriceChange}
          />
        </label>
        <br />
        <label>
          Cake Image:
          <input
            type="text"
            value={cakeImage}
            onChange={handleCakeImageChange}
          />
        </label>
        <br />
        <label>
          Cake Flavors:
          <input
            type="text"
            value={cakeFlavors}
            onChange={handleCakeFlavorChange}
          />
        </label>
        <br />
        <label>
          <label>
            Available:
            <input
              type="checkbox"
              checked={available}
              onChange={handleAvailableChange}
            />
          </label>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostCakes;
