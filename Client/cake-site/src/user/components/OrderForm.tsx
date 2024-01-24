import React, { useState } from "react";

const OrderForm = () => {
  const [order, setOrder] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    orderTotal: 0,
    orderDate: new Date().toISOString(),
  });

  const localhostUrl = "http://localhost:5194/orders";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(localhostUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        console.log("Order posted successfully!");
      } else {
        console.error(
          "Failed to post order:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error posting order:", error);
    }
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={order.customerName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Customer Email:
          <input
            type="email"
            name="customerEmail"
            value={order.customerEmail}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Customer Phone:
          <input
            type="tel"
            name="customerPhone"
            value={order.customerPhone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Order Total:
          <input
            type="number"
            name="orderTotal"
            value={order.orderTotal}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
