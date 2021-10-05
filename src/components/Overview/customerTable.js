import React from "react";
import CustomerRecord from "./customerRecord";

export default function CustomerTable() {
  return (
    <div className="customerTable">
      <p> Most Popular Customers</p>
      <table>
        <thead>
          <tr>
            <th>customer Name</th>
            <th>sales purchased</th>
            <th>contact</th>
          </tr>
        </thead>
        <tbody>
          <CustomerRecord
            name="Etikc"
            sales_purchased="50"
            customer_contact="0348508385"
          />
          <CustomerRecord
            name="shantelle"
            sales_purchased="500"
            customer_contact="0348508385"
          />
          <CustomerRecord
            name="Estelle"
            sales_purchased="70"
            customer_contact="0348508385"
          />
          <CustomerRecord
            name="dEville"
            sales_purchased="150"
            customer_contact="0348508385"
          />
        </tbody>
      </table>
    </div>
  );
}
