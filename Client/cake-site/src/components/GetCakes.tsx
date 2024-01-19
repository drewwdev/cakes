import React, { useEffect, useState, FC } from "react";
import { Cake } from "../types";

const GetCakes: FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);

  const fetchCakes = async () => {
    const res = await fetch("http://localhost:5194/cakes");
    const data = await res.json();
    return data;
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetCakes;
