import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React,{ useState,useEffect } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';


export default function Create() {
    const [data,setdata]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/poapp/pd/')
        .then(res=>{
          console.log("Getting from ",res.data)
          setdata(res.data)
        }).catch(err => console.log(err))
      },[])

  return (
    <div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Region</TableCell>
            <TableCell align="right">Report to</TableCell>
            <TableCell align="right">PO Number</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        {data.map((data) => {
             return (
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                 <TableCell align="right">{data.id}</TableCell>
                 <TableCell align="right">{data.customer_name}</TableCell>
                 <TableCell align="right">{data.region}</TableCell>
                 <TableCell align="right">{data.report_to}</TableCell>
                 <TableCell align="right">{data.Po_Number}</TableCell>
                 <TableCell align="right">
                 <Link to ='/Edit'>
                     <Button variant='contained'color='secondary'>Edit</Button>
                     </Link>
                 </TableCell>
                 <TableCell align="right">
                 <Link to ='/Delete'>
                     <Button variant='contained'color='error'>Delete</Button>
                     </Link>
                 </TableCell>
               </TableRow>
             )
        })}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
  )
    }

