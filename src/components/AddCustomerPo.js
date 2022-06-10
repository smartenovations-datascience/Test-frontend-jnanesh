import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, InputLabel,Select,Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import CustomerPoService from './service';
import { useNavigate } from "react-router-dom";

const customerPoService = new CustomerPoService();
export default function AddCustomerPo() {
    const [customer_name, setcustomer_name] = useState("")
    const [region, setregion] = useState("")
    const [report_to, setreport_to] = useState("")
    const [po_Number, setpo_Number] = useState("")
    const [issue_date, setissue_date] = useState("")
    const [quotation_no, setquotation_no] = useState("")
    const [quotation_date, setquotation_date] = useState("")
    const [expiry_date, setexpiry_date] = useState("")
    const [currency, setcurrency] = useState("")
    const [rate_per_unit, setrate_per_unit] = useState("")
    const [rate_po, setrate_po] = useState("")
    const [no_of_units, setno_of_units] = useState("")
    const [no_of_units_consumed, setno_of_units_consumed] = useState("")
    const [place_of_delivery, setplace_of_delivery] = useState("")
    const [ssi_no, setssi_no] = useState("")
    const [payment_terms, setpayment_terms] = useState("")
    const [po_confirm_date, setpo_confirm_date] = useState("")
    const [invoice_to, setinvoice_to] = useState("")
    const [invoice_contact_no, setinvoice_contact_no] = useState("")
    const [vendor_code, setvendor_code] = useState("")
    const [vendor_gstn, setvendor_gstn] = useState("")
    const [vendor_state, setvendor_state] = useState("")
    const [vendor_state_code, setvendor_state_code] = useState("")
    const [consignee, setconsignee] = useState("")
    const [consignee_email, setconsignee_email] = useState("")
    const [consignee_gstn, setconsignee_gstn] = useState("")
    const [consignee_state, setconsignee_state] = useState("")
    const [consignee_state_code, setconsignee_state_code] = useState("")
    const [service_description, setservice_description] = useState("")


    // const [options, setOptions] = useState({
    //     customer_name: { choices: [] },
    //     region: { choices: [] },
    //     currency: { choices: [] },
    //     rate_per_unit: { choices: [] },
    //   });
      



    const postData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/poapp/pd/', {
            customer_name: customer_name,
            region: region,
            report_to: report_to,
            po_Number: po_Number,
        }).then(res => console.log('Posting data', res))
            .catch(err => console.log(err))
    }

    
//   let navigate = useNavigate();

//   const getOptions = () => {
//     customerPoService
//       .getCustomerPoOptions()
//       .then((data) => {
//         setOptions(data.options);
//       })
//       .catch((_) =>Error("There was an error fetching data"));
//   };

//   useEffect(() => {
//     getOptions();
//   }, []);

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
                PO Number*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="po_Number"
                name="po_Number"
                value={po_Number}
                onChange={(e) => setpo_Number(e.target.value)}
                type="number" />


            <InputLabel>
                Issue date*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="issue_date"
                name="issue_date"
                value={issue_date}
                onChange={(e) => setissue_date(e.target.value)}
                type="date" />

            <InputLabel>
                Quotation Number
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="quotation_no"
                name="quotation_no"
                value={quotation_no}
                onChange={(e) => setquotation_no(e.target.value)}
                type="text" />

            <InputLabel>
                Quatation Date*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="quotation_date"
                name="quotation_date"
                value={quotation_date}
                onChange={(e) => setquotation_date(e.target.value)}
                type="date"
                required />

            <InputLabel>
                Expiry date*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="expiry_date"
                name="expiry_date"
                value={expiry_date}
                onChange={(e) => setexpiry_date(e.target.value)}
                type="date" />

            <InputLabel>
                Currency*
            </InputLabel>
            {/* <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="currency"
                name="currency"
                value={currency}
                onChange={(e) => setcurrency(e.target.value)}
                required /> */}

                
<FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={currency}
          variant="outlined"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(e) => setcurrency(e.target.value)}
          required
        >
          <MenuItem value="">
            <em>------</em>
          </MenuItem>
          <MenuItem value={10}>rupees</MenuItem>
          <MenuItem value={20}>dollar</MenuItem>
          {/* <MenuItem value={30}>Week</MenuItem> */}
          {/* <MenuItem value={30}>Year</MenuItem> */}
          {/* <MenuItem value={30}>Month</MenuItem> */}
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>

            <InputLabel>
                Rate per Unit*
            </InputLabel>
            {/* <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="rate_per_unit"
                name="rate_per_unit"
                value={rate_per_unit}
                onChange={(e) => setrate_per_unit(e.target.value)}
                required /> */}

<FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={rate_per_unit}
          variant="outlined"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        //   options={options.rate_per_unit.choices}
          onChange={(e) => setrate_per_unit(e.target.value)}
          required
        >
          <MenuItem value="">
            <em>"Select a rate per unit"</em>
          </MenuItem>
          {/* <MenuItem value={10}>Hour</MenuItem>
          <MenuItem value={20}>Day</MenuItem>
          <MenuItem value={30}>Week</MenuItem>
          <MenuItem value={30}>Year</MenuItem>
          <MenuItem value={30}>Month</MenuItem> */}
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>


            <InputLabel>
                Rate*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="rate_po"
                name="rate_po"
                value={rate_po}
                onChange={(e) => setrate_po(e.target.value)}
                type="number"
                required />

            <InputLabel>
                Number of Units*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="no_of_units"
                name="no_of_units"
                value={no_of_units}
                onChange={(e) => setno_of_units(e.target.value)}
                type="number"
                required />

            <h3>Designer*</h3>
            <InputLabel>
                Number of Units consumed *
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="no_of_units_consumed"
                name="no_of_units_consumed"
                value={no_of_units_consumed}
                onChange={(e) => setno_of_units_consumed(e.target.value)}
                type="number" />


            <InputLabel>
                Place of Delivery*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="place_of_delivery"
                name="place_of_delivery"
                value={place_of_delivery}
                onChange={(e) => setplace_of_delivery(e.target.value)}
                type="text" />

            <InputLabel>
                SSI Number
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="ssi_no"
                name="ssi_no"
                value={ssi_no}
                onChange={(e) => setssi_no(e.target.value)}
                type="text" />

            <InputLabel>
                Payment Term*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="payment_terms"
                name="payment_terms"
                value={payment_terms}
                onChange={(e) => setpayment_terms(e.target.value)}
                type="text" />

            <InputLabel>
                PO confirmation Date
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="po_confirm_date"
                name="po_confirm_date"
                value={po_confirm_date}
                onChange={(e) => setpo_confirm_date(e.target.value)}
                type="date"
                required />


            <h3>Invoice</h3>
            <InputLabel>
                Invoice To Address*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="invoice_to"
                name="invoice_to"
                value={invoice_to}
                onChange={(e) => setinvoice_to(e.target.value)}
                type="text"
                required />

            <InputLabel>
                Contact Number*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="invoice_contact_no"
                name="invoice_contact_no"
                value={invoice_contact_no}
                onChange={(e) => setinvoice_contact_no(e.target.value)}
                type="text"
                required />

            <InputLabel>
                Vendor code*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="vendor_code"
                name="vendor_code"
                value={vendor_code}
                onChange={(e) => setvendor_code(e.target.value)}
                type="text"
                required />

            <InputLabel>
                Vendor GSTN/VAT Number*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="vendor_gstn"
                name="vendor_gstn"
                value={vendor_gstn}
                onChange={(e) => setvendor_gstn(e.target.value)}
                type="text"
                required />


            <InputLabel>
                State*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="vendor_state"
                name="vendor_state"
                value={vendor_state}
                onChange={(e) => setvendor_state(e.target.value)}
                type="text"
                required />


            <InputLabel>
                State code*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="vendor_state_code"
                name="vendor_state_code"
                value={vendor_state_code}
                onChange={(e) => setvendor_state_code(e.target.value)}
                type="text"
                required />

            <h3>Consignee</h3>
            <InputLabel>
                Consignee to address*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="consignee"
                name="consignee"
                value={consignee}
                onChange={(e) => setconsignee(e.target.value)}
                type="text" />

            <InputLabel>
                Consignee Email*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="consignee_email"
                name="consignee_email"
                value={consignee_email}
                onChange={(e) => setconsignee_email(e.target.value)}
                type="email" />

            <InputLabel>
                Consignee GSTN
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="consignee_gstn"
                name="consignee_gstn"
                value={consignee_gstn}
                onChange={(e) => setconsignee_gstn(e.target.value)}
                type="text" />

            <InputLabel>
                State
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="consignee_state"
                name="consignee_state"
                value={consignee_state}
                onChange={(e) => setconsignee_state(e.target.value)}
                type="text" />

            <InputLabel>
                State code
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="consignee_state_code"
                name="consignee_state_code"
                value={consignee_state_code}
                onChange={(e) => setconsignee_state_code(e.target.value)}
                type="text" />

            <InputLabel>
                Service Description*
            </InputLabel>
            <TextField size='small'
                sx={{ width: 650, marginRight: 20 }}
                variant="outlined"
                id="service_description"
                name="service_description"
                value={service_description}
                onChange={(e) => setservice_description(e.target.value)}
                type="text" />




            <Stack direction="row" spacing={2} sx={{ paddingLeft: 130}} >
                <Button startIcon={<SaveAltIcon />} onClick={postData}>save</Button>

                {/* <Button startIcon={<EditIcon />}>Edit</Button>  */}
            </Stack>


        </Box>
    )
}