import styled from "styled-components";
import {BrowserRouter, Routes , Route } from 'react-router-dom'
import {Dashboard,Error,Landing,Register} from '../src/pages/index'



function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/Landing' element={<Landing />}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      
    

    </div>
    
  );
}

export default App;
