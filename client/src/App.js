import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Landing, Register, ProtectedRoute } from '../src/pages/index'
import { AddJob, AllJob, Profile, SharedLayout, Stats } from './pages/Dashboard'



function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={

            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>

          }>
            <Route index element={<Stats />} />
            <Route path='all-jobs' element={<AllJob />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='/Register' element={<Register />} />
          <Route path='/Landing' element={<Landing />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>



    </div>

  );
}

export default App;
