import React, { useEffect, useState, FC } from "react";
import { Cake } from "../types";

const GetCakes: FC = () => {
  const localhostUrl = "http://localhost:5194/cakes";

  const [cakes, setCakes] = useState<Cake[]>([]);

  const fetchCakes = async () => {
    const res = await fetch(localhostUrl);
    const data = await res.json();
    return data;
  };

  const deleteCake = async (id: number) => {
    await fetch(`${localhostUrl}/${id}`, {
      method: "DELETE",
    });

    setCakes((prevCakes) => prevCakes.filter((cake) => cake.id !== id));
  };

  useEffect(() => {
    const getCakes = async () => {
      const cakesFromServer = await fetchCakes();
      setCakes(cakesFromServer);
    };

    getCakes();
  });

  return (
    <div>
      <h2>Cake List</h2>
      <ul>
        {cakes.map((cake) => (
          <li key={cake.id}>
            <h3>{cake.name}</h3>
            <p>{cake.description}</p>
            <p>Price: ${cake.price}</p>
            <p>Flavors: {cake.flavors.toString()}</p>
            <p>Available: {cake.isAvailable.toString()}</p>
            <button onClick={() => deleteCake(cake.id)}>Delete Cake</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetCakes;
