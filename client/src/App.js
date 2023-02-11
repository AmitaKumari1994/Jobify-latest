import Landing from "./pages/Landing";
import styled from "styled-components";
import {BrowserRouter, Routes , Route , Link} from 'react-router-dom'



function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to='/'>Dashboard</Link>
          <Link to='/Register'>Register</Link>
          <Link to='/Landing'>Landing</Link>
        </nav>
        <Routes>
            <Route path='/' element={<div>Dashboard</div>}/>
            <Route path='/Register' element={<div>Register</div>}/>
            <Route path='/Landing' element={<Landing />}/>
            <Route path='*' element={<h1>Error</h1>}/>
        </Routes>
      </BrowserRouter>
      
    

    </div>
    
  );
}

export default App;
