import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, InputLabel, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import axios from 'axios';

export default function Edit() {
    const [customer_name, setcustomer_name] = useState("")
    const [region, setregion] = useState("")
    const [report_to, setreport_to] = useState("")
    const [Po_Number, setpo_no] = useState("")
    const [ID,setID]=useState();



    const postData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/poapp/pd/${ID}`, {
            customer_name,
            region,
            report_to,
            Po_Number
        })
        // .then(res => console.log('Posting data', res))
        //     .catch(err => console.log(err))
    }

    // useEffect(() =>{
    //     setcustomer_name(localStorage.getItem('customer_name'));
    //     setregion(localStorage.getItem('region'));
    //     setreport_to(localStorage.getItem('report_to'));
    //     setpo_no(localStorage.getItem('Po_Number'));
    //     setID(localStorage.getItem('ID'))

    // },[])

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 0,
                    width: "98%",

                    //  backgroundColor: 'primary.dark',
                    marginLeft: '1ch', marginTop: '1ch'
                },
            }}
        // noValidate
        // autoComplete="off"
        >

            <TextField size='small' sx={{ backgroundColor: "gray" }}
                id="outlined-uncontrolled"
                defaultValue="CustomerPo Detail"
            />

            <h3>PO Details</h3>
            <InputLabel>
                Customer Name*
            </InputLabel>
            <TextField size='small' sx={{ fullWidth: true }}
                id="outlined-basic" variant="outlined"
                value={customer_name}
                onChange={(e) => setcustomer_name(e.target.value)}
                required />


            <InputLabel>
                Region*
            </InputLabel>
            <TextField size='small' sx={{ fullWidth: true }}
                variant="outlined"
                id="region"
                name="region"
                value={region}
                onChange={(e) => setregion(e.target.value)}
                required />

            <InputLabel>
                Report to*
            </InputLabel>
            <TextField size='small' sx={{ fullWidth: true }}
                type="text"
                variant="outlined"
                id="report_to"
                name="report_to"
                value={report_to}
                onChange={(e) => setreport_to(e.target.value)}
                type="text"
                required
            />

            <InputLabel>
                PO number
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="po_no"
                name="po_no"
                value={Po_Number}
                onChange={(e) => setpo_no(e.target.value)}
                type="number" />

                
            <Stack direction="row" spacing={2} sx={{ paddingLeft: 50 }} >
                <Button startIcon={<SaveAltIcon />} onClick={postData}>Update</Button>

                {/* <Button startIcon={<EditIcon />}>Edit</Button>  */}
                </Stack>


        </Box>
    )
}