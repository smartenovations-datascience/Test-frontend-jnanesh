import React, { useState,useEffect } from 'react'
import axios from 'axios';



function Popage() {
    const [data,setdata]=useState([])

    
   useEffect(()=>{
    axios.get('http://localhost:8000/api/poapp/pd/')
    .then(res=>{
      console.log("Getting from ",res.data)
      setdata(res.data)
    }).catch(err => console.log(err))
  },[])

   const arr=data.map((data,index) =>{
       return(
           <tr style={{}}>
               <td>{data.id}</td>
               <td>{data.customer_name}</td>
               <td>{data.region}</td>
               <td>{data.report_to}</td>
               <td>{data.Po_Number}</td>
           </tr>
       )
   })

    return (
        <div className="Popage">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Region</th>
                    <th>Report to</th>
                    <th>PO Number</th>

                </tr>
                {arr}
            </table>
        </div>
    )
}

export default Popage;



{/* <Button variant="contained" startIcon={<AddBoxIcon/>} onClick={() => setShowPopageNew(true)}>New</Button> */}