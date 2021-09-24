import React from "react";

const CustomerRecord = ({ name, sales_purchased, customer_contact }) => {
  return (
    <tr className="tableau">
      <td className="customer-name">{name}</td>
      <td className="sales-purchased">{sales_purchased} units</td>
      <td className="customer-contact">{customer_contact}</td>
    </tr>
  );
};

export default CustomerRecord;
