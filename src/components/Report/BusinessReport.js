import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { Link } from 'react-router-dom'
import {logout} from '../../auth/index'

const BusinessReport = () => {
    const business_name = localStorage.getItem('business_name')
    const business_id = localStorage.getItem('Business')
    const user = JSON.parse(localStorage.getItem('User'))
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const [business_report_summary,setBusinessReportSummary] = useState({'total_sales_made':0,'total_stock_purchased':0,
    'total_products_bought':0,'total_products_sold':0,'total_products_remaining':0,'total_profit_or_loss':0,'products_overview':[]})
    const date = '29/08/2021'


    const fetchBusinessReport = async() => {
        const response = await fetch(`http://localhost:9000/business/${business_id}/report`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })

        const res = await response.json()
        if(response.status === 401){
            alert('Session Expired')
            logout()
        }
        else if(response.status === 200){
            setBusinessReportSummary(res)
        }
        else{
            alert('Could not fetch Report')
        }
    }

    useEffect(()=>{
        fetchBusinessReport()
    },[])

    return (
        <div className='report-business'>
            <div className='business-report-header'>
                <div className='business-report-head'>
                 <Link className="business-name" to='/business/overview'> {business_name}</Link>

                    <div className='business-user'>{user.name}</div>
                </div>
                <div className='date-generated'>Date Generated:{date}</div>
            </div>
            <div className='business-report-summary'>
                <div className='business-report-summary-header'>Business Summary</div>
                <div className='business-summaries business-summary '>
                    <SummaryCard title='Total Sales Made' value={`GHC ${business_report_summary.total_sales_made}`}/>
                    <SummaryCard title='Total Stock Purchased' value={`GHC ${business_report_summary.total_stock_purchased}`}/>
                    <SummaryCard title='Profit/Loss' value={`GHC ${business_report_summary.total_profit_or_loss}`}/>
                    <SummaryCard title='Total Products Bought' value={business_report_summary.total_products_bought}/>
                    <SummaryCard title='Total Products Sold' value={business_report_summary.total_products_sold}/>
                    <SummaryCard title='Products Remaining' value={business_report_summary.total_products_remaining}/>
                </div>
            </div>
            <div className='business-product-report-summary'>
                <div className='product-report-summary-header'>Product Summary</div>
                {business_report_summary.products_overview.map(product_overview=>{
                    return(
                        <>
                            <div className='product-name'>{product_overview.product_name}</div>
                            <div className='product-summaries product-summary'>
                                <SummaryCard title='Total Sales Made' value={`GHC ${product_overview.product_sales}`}/>
                                <SummaryCard title='Total Stock Purchased' value={`GHC ${product_overview.product_stock}`}/>
                                <SummaryCard title='Profit/Loss' value={`GHC ${product_overview.product_profit_loss}`}/>
                                <SummaryCard title='Total Products Bought' value={product_overview.products_total_bought}/>
                                <SummaryCard title='Total Products Sold' value={product_overview.products_total_sold}/>
                                <SummaryCard title='Products Remaining' value={product_overview.products_total_remaining}/>
                            </div>
                        </>
                    )
                })}
                
            </div>
        </div>
    )
}

export default BusinessReport
