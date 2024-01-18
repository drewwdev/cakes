import React, { useEffect, useState } from "react";
import { Cake } from "../types";

const CakeList: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await fetch("http://localhost:5194/cakes", {
          mode: "no-cors",
        });

        if (response.ok) {
          const cakesData: Cake[] = await response.json();
          setCakes(cakesData);
        } else {
          console.error("Failed to fetch cakes:", response.statusText);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching cakes:", error.message);
      }
    };

    fetchCakes();
  }, []);

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

export default CakeList;
