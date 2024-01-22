import React, { useState } from "react";

const PostCakes = () => {
  const [cake, setCake] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    flavors: [],
    available: false,
  });

  const {
    name,
    description,
    price,
    image: imageUrl,
    flavors,
    available: isAvailable,
  } = cake;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCake({
      ...cake,
      [name]: name === "flavors" ? [value] : value,
    });
  };

  const handleCheckboxChange = (event) => {
    setCake({
      ...cake,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCakeFlavorChange = (index, value) => {
    const newFlavors = [...flavors];
    newFlavors[index] = value;
    setCake({
      ...cake,
      flavors: newFlavors,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || flavors.length === 0 || !price || !description || !imageUrl) {
      console.error("Please fill in all required fields");
      return;
    }

    const jsonData = {
      name: name,
      flavors: flavors,
      price: price,
      description: description,
      imageUrl: imageUrl,
      isAvailable: isAvailable,
    };

    const cleanedCakeFlavors = flavors.map((flavor) => flavor.trim());

    fetch("http://localhost:5194/cakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        flavors: flavors,
        price: price,
        description: description,
        imageUrl: imageUrl,
        isAvailable: isAvailable,
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
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cake Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cake Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cake Image:
          <input
            type="text"
            name="image"
            value={imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cake Flavors:
          {flavors.map((input, index) => (
            <input
              key={index}
              type="text"
              name={`flavors[${index}]`}
              value={input || ""}
              onChange={(e) => handleCakeFlavorChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setCake((prevCake) => ({
                ...prevCake,
                flavors: [...flavors, ""],
              }))
            }>
            Add Input
          </button>
        </label>
        <br />
        <label>
          <label>
            Available:
            <input
              type="checkbox"
              name="available"
              checked={isAvailable}
              onChange={handleCheckboxChange}
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
