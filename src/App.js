import CustomizedDialogs from './components/Polist';
// import Polistpage from './components/AddCustomerPo'
import AddCustomerPo from './components/AddCustomerPo'
import Create from './components/create';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Edit from './components/edit';
import Delete from './components/delete';
// import AddCustomerPo from './components/AddCustomerPo';

function App() {
  return (
    <div>
      <CustomizedDialogs>
        <AddCustomerPo />
      </CustomizedDialogs>

      
  
     <BrowserRouter> 
      <Routes>
      
        <Route path="/" element={<Create />} />
      

      
       <Route path="/addcustomerpo" element={<AddCustomerPo />} />
      
     <Route path="/edit" element={<Edit />} />
       <Route path="/delete" element={<Delete />} />
      
     </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
