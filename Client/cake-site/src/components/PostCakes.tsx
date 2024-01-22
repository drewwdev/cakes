import React, { useState } from "react";

const PostCakes = () => {
  const [cakeName, setCakeName] = useState("");
  const [cakeDescription, setCakeDescription] = useState("");
  const [cakePrice, setCakePrice] = useState(0);
  const [cakeImage, setCakeImage] = useState("");
  const [cakeFlavors, setCakeFlavors] = useState([]);
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

  const handleCakeFlavorChange = (index, value) => {
    const newArray = [...cakeFlavors];
    newArray[index] = value;
    setCakeFlavors(newArray);
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
      !cakeImage
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    const jsonData = {
      name: cakeName,
      cakeFlavors: cakeFlavors,
      price: cakePrice,
      description: cakeDescription,
      imageUrl: cakeImage,
      isAvailable: available,
    };

    console.log("JSON data to be sent:", jsonData);
    console.log("Type of cakeFlavors:", Array.isArray(cakeFlavors));
    const cleanedCakeFlavors = cakeFlavors.map((flavor) => flavor.trim());
    console.log(
      "JSON data to be sent:",
      JSON.stringify({
        name: cakeName,
        cakeFlavors: cleanedCakeFlavors,
        price: cakePrice,
        description: cakeDescription,
        imageUrl: cakeImage,
        isAvailable: available,
      })
    );

    fetch("http://localhost:5194/cakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cakeName,
        flavors: cleanedCakeFlavors,
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
          {cakeFlavors.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input || ""}
              onChange={(e) => handleCakeFlavorChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={() => setCakeFlavors([...cakeFlavors, ""])}>
            Add Input
          </button>
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
