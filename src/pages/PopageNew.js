import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, InputLabel, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Popage from './Popage';
import axios from 'axios';
// import CustomerPoService from "../services/service";
import { useNavigate } from "react-router-dom";
// import Dropdown from './dropdown';
// import CustomerPoService from '../pages/service';

// const customerPoService = new CustomerPoService();
// const [showAddCustomerPoDialog, setShowAddCustomerPoDialog] = useState(false);

export default function PoPage() {
  const [customer_name, setcustomer_name] = useState("")
  const [region, setregion] = useState("")
  const [report_to, setreport_to] = useState("")
  const [Po_Number, setpo_no] = useState("")
  
 

   const postData = (e) => {
     e.preventDefault();
     axios.post('http://localhost:8000/api/poapp/pd/' ,{
      customer_name:customer_name,
      region:region,
      report_to: report_to,
      Po_Number: Po_Number,
     }).then(res => console.log('Posting data',res)).catch(err => console.log(err))
   }
    

//    componentDidMount() {
//     // PUT request using axios with error handling
//     const article = { title: 'React PUT Request Example' };
//     axios.put('https://reqres.in/invalid-url', article)
//         .then(response => this.setState({ updatedAt: response.data.updatedAt }))
//         .catch(error => {
//             this.setState({ errorMessage: error.message });
//             console.error('There was an error!', error);
//         });
// }

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

        <Stack direction="row" spacing={2} sx={{ paddingLeft: 70 }} >
          <Button startIcon={<SaveAltIcon />}  onClick={postData}>save</Button>
          {/* //   label="Save"
          //   className="p-button-text"
          //   type="submit"

          // /> */}


          <Button startIcon={<EditIcon />}>Edit</Button>
          {/* //   label="Edit"
          //   icon="pi pi-pencil"
          //   type="button"
          //   className="p-button-text"


          // /> */}
        </Stack>


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
          type="number"/>
        
        
      </Box>
      // <AddCustomerPoDialog
      //       isVisible={showAddCustomerPoDialog}
      //       hideDialog={() => setShowAddCustomerPoDialog(false)}
      //     />
    )
  }

//   import { useEffect, useState, useRef, useContext } from "react";
// import { Link } from "react-router-dom";
// import { DataTable } from "primereact/datatable";
// import { Button } from "primereact/button";
// import { Column } from "primereact/column";
// import { Toolbar } from "primereact/toolbar";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";

// import CustomerPoService from "../service";
// import AddCustomerPoDialog from "./AddCustomerPoDialog";
// import DataTableSkeleton from "../../../common/DataTableSkeleton";
// import { ToastContext } from "../../../providers/ToastProvider";
// import { url as splitUrl } from "../../../axiosInstance";

// const tableHeaderStyle = {
//     display: "flex",
//     alignItem: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
// };

// const customerPoService = new CustomerPoService();

// export function ListCustomerPo() {
//     const [customerPoList, setCustomerPoList] = useState(null);

//     const [selectedCustomerPo, setSelectedCustomerPo] = useState(null);

//     const [showAddCustomerPoDialog, setShowAddCustomerPoDialog] = useState(false);
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(20);
//     const [last, setLast] = useState(rows);
//     const [nextUrl, setNextUrl] = useState("");
//     const [prevUrl, setPrevUrl] = useState("");
//     const [totalCount, setTotalCount] = useState();
//     const [prevDisable, setPrevDisable] = useState(false);
//     const [nextDisable, setNextDisable] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const dt = useRef(null);
//     const toast = useContext(ToastContext);

//     const getCustomerPO = (params) => {
//         setLoading(true);
//         customerPoService
//             .getCustomerPoList(params)
//             .then((data) => {
//                 setTotalCount(data.count);
//                 setNextUrl(data.next);
//                 setPrevUrl(data.previous);
//                 data.next == null ? setNextDisable(true) : setNextDisable(false);
//                 data.previous === null ? setPrevDisable(true) : setPrevDisable(false);
//                 setCustomerPoList(data.results);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 if (err.response.status === 404) {
//                     toast.showError("There was an error fetching data");
//                 }
//                 toast.showWarning("There was an error fetching data");
//             });
//     };

//     useEffect(() => {
//         getCustomerPO(`/api/customer_po/po/?po_confirmation=true&ordering=-created_on&limit=${rows}`);
//     }, [rows]); // eslint-disable-line react-hooks/exhaustive-deps


//     const searchCustomerPo = (term) => {
//         const searchUrl = `/api/customer_po/po/?po_confirmation=true&ordering=-created_on&limit=${rows}&search=${term}`;
//         customerPoService
//             .getCustomerPoList(searchUrl)
//             .then((data) => {
//                 setTotalCount(data.count);
//                 setNextUrl(data.next);
//                 setPrevUrl(data.previous);
//                 data.next == null ? setNextDisable(true) : setNextDisable(false);
//                 data.previous === null ? setPrevDisable(true) : setPrevDisable(false);
//                 setCustomerPoList(data.results);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 if (err.response.status === 404) {
//                     toast.showError("There was an error fetching data");
//                 }
//                 toast.showWarning("There was an error fetching data");
//             });
//     };

//     const onCustomPage = (event) => {
//         setFirst(event.first);
//         setRows(event.rows);
//     };

//     const customTemplate = {
//         layout: "RowsPerPageDropdown PrevPageLink NextPageLink",

//         RowsPerPageDropdown: (options) => {
//             const dropdownOptions = [
//                 { label: 5, value: 5 },
//                 { label: 20, value: 20 },
//                 { label: 50, value: 50 },
//                 { label: 100, value: 100 },
//                 { label: "All", value: totalCount },
//             ];
//             return (
//                 <Dropdown
//                     value={options.value}
//                     options={dropdownOptions}
//                     onChange={options.onChange}
//                     appendTo={document.body}
//                 />
//             );
//         },

//         PrevPageLink: () => {
//             const onPrevClick = () => {
//                 let url = prevUrl.split(splitUrl)[1];
//                 first - rows < 0 ? setFirst(1) : setFirst(first - rows);
//                 setLast(last - rows);
//                 getCustomerPO(url);
//             };

//             return (
//                 <button type="button" onClick={onPrevClick} disabled={prevDisable}>
//                     <span className="p-3">Previous</span>
//                 </button>
//             );
//         },

//         NextPageLink: () => {
//             const onNextClick = () => {
//                 let url = nextUrl.split(splitUrl)[1];
//                 setFirst(first + rows);
//                 last + rows > totalCount ? setLast(totalCount) : setLast(last + rows);
//                 getCustomerPO(url);
//             };

//             return (
//                 <button type="button" onClick={onNextClick} disabled={nextDisable}>
//                     <span className="p-3">Next</span>
//                 </button>
//             );
//         },
//     };
//     const regionBodyTemplate = (rowData) => {
//         return (
//             <>
//                 <span
//                     className={`flag-icon flag-icon-${rowData.region.toLowerCase()}`}
//                     width={30}
//                 ></span>
//                 <span className="image-text"> {rowData.region_name}</span>
//             </>
//         );
//     };

//     const exportCSV = () => {
//         dt.current.exportCSV();
//     };

//     const leftToolbarTemplate = () => {
//         return (
//             <>
//                 <Button
//                     label="New"
//                     icon="pi pi-plus"
//                     className="p-button-success mr-2"
//                     onClick={() => setShowAddCustomerPoDialog(true)}
//                 />
//             </>
//         );
//     };

//     const rightToolbarTemplate = () => {
//         return (
//             <>
//                 <Button
//                     label="Export"
//                     icon="pi pi-upload"
//                     className="p-button-help"
//                     onClick={exportCSV}
//                 />
//             </>
//         );
//     };

//     const customerNameTemplate = (rowData) => {
//         return (
//             <>
//                 <Link
//                     to={{
//                         pathname: `/crm/customerpo/${rowData.id}`,
//                     }}
//                 >
//                     {rowData.customer}
//                 </Link>
//             </>
//         );
//     };

//     const header = (
//         <div className="table-header" style={tableHeaderStyle}>
//             <h5 className="m-0">List of Customer PO</h5>
//             <span className="p-input-icon-left">
//                 <i className="pi pi-search" />
//                 <InputText
//                     type="search"
//                     onInput={(e) => searchCustomerPo(e.target.value)}
//                     placeholder="Global Search"
//                     className="mt-2 mt-md-0"
//                 />
//             </span>
//         </div>
//     );

//     return (
//         <div className="card">
//           <Toolbar
//             className="mb-0"
//             left={leftToolbarTemplate}
//             right={rightToolbarTemplate}
//           ></Toolbar>
//           {customerPoList ? (
//             <DataTable
//               ref={dt}
//               paginator
//               paginatorTemplate={customTemplate}
//               first={first}
//               rows={rows}
//               onPage={onCustomPage}
//               value={customerPoList}
//               rowHover
//               header={header}
//               selection={selectedCustomerPo}
//               onSelectionChange={(e) => setSelectedCustomerPo(e.value)}
//               dataKey="id"
//             //   className="data-table-y-scroll"
//               loading={loading}
//             >
//               <Column
//                 selectionMode="multiple"
//                 headerStyle={{ width: "3em" }}
//               >

//               </Column>
//               <Column field="po_no" header="Po Number" 
//               style={{ minWidth: '12rem' }}
//               sortable></Column>
//               <Column
//                 field="customer_name"
//                 header="Customer"
//                 body={customerNameTemplate}
//                 sortable
//                 style={{ minWidth: '10rem' }}
//               ></Column>
//               <Column
//                 field="region_name"
//                 filterField="region_name"
//                 header="Region"
//                 body={regionBodyTemplate}
//                 style={{ minWidth: '10rem' }}
//                 sortable
//               />
//               <Column field="issue_date" header="Issue Date" sortable></Column>
//               <Column
//                 field="quotation_date"
//                 header="Quotation Date"
//                 sortable
//                 style={{ minWidth: '10rem' }}
//               ></Column>
//               <Column field="expiry_date" header="Expiry Date" sortable></Column>
//               <Column
//                 field="created_by_email"
//                 header="Created By"
//                 sortable
//                 style={{ minWidth: '12rem' }}
//               ></Column>
//             </DataTable>
//           ) : (
//             <DataTableSkeleton columnCount={6} />
//           )}
//           <AddCustomerPoDialog
//             isVisible={showAddCustomerPoDialog}
//             hideDialog={() => setShowAddCustomerPoDialog(false)}
//           />
//         </div>

//     );
// }
// export default ListCustomerPo;

