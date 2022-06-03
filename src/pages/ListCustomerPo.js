import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import PopageNew from './PopageNew'
import { useState } from 'react';

function ListCustomerPo() {

    const [ShowPopageNew,  setShowPopageNew] = useState(false);


    return (
        <>
        <Button variant="contained" startIcon={<AddBoxIcon/>} onClick={() => setShowPopageNew(true)}>New</Button>

         <div>
        <PopageNew
            isVisible={ShowPopageNew}
            hideDialog={() => setShowPopageNew(false)}
          />
          </div>
        </>
    )
    
}

export default ListCustomerPo;
