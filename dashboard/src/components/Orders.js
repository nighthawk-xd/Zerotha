import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const { orders } = useContext(GeneralContext);

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5">No orders found.</td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.symbol}</td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price).toFixed(2)}</td>
                  <td>{order.side}</td>
                  <td>{order.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
