import {useEffect} from 'react';
import axios from 'axios';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllCampgrounds from './campgrounds/AllCampgrounds';
import NewCampground from './campgrounds/NewCampground';
import ShowCampground from './campgrounds/ShowCampground';
import Home from './campgrounds/Home';
import NoPage from './campgrounds/NoPage';
import Register from './users/Register';
import Login from './users/Login';
import Logout from './users/Logout';
import Reviews from './campgrounds/Reviews'

function App() {


  return (
    <BrowserRouter>
             
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
      
          {/* Campground routes */}
          <Route path="/campgrounds" element={<AllCampgrounds/>}/>
          <Route path="/campgrounds/new" element={<NewCampground/>}/>
          <Route path="/campgrounds/:id" element={<ShowCampground/>}/>
          <Route path="/campgrounds/:id/reviews" element={<Reviews/>}/>

          {/* User routes */}
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>

          {/* Other routes */}
          <Route path="/*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
