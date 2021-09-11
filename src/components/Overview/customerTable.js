import React from 'react'
import CustomerRecord from './customerRecord'

export default function CustomerTable() {
    return (
        <div className="customerTable">
            <p>           Most Popular Customers
</p>
            <table >
                <thead>
                
                    <tr>
                    <th>customer Name</th>
                    <th>sales purchased</th>
                    <th>contact</th>
                    </tr>
                    </thead>
                <tbody>
                    <CustomerRecord name='Etikc' sales_purchased='50' customer_contact='0348508385'/>
                    <CustomerRecord name='Etikc' sales_purchased='50' customer_contact='0348508385'/>
                    <CustomerRecord name='Etikc' sales_purchased='50' customer_contact='0348508385'/>
                    <CustomerRecord name='Etikc' sales_purchased='50' customer_contact='0348508385'/>


                </tbody>
            </table>
        </div>
    )
}
