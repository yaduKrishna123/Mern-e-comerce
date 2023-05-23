

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Allproducts from './pages/allproducts/Allproducts'
import './pages/bootstrapmin.css'
import Cart from './pages/cart/Cart'
import View from './pages/Viewproducts/View'
import Wishlist from './pages/wishlist/Wishlist'
import Login from './pages/login/Login';
import AdminLogin from './pages/adminLogin/AdminLogin';
import AdminRegister from './pages/adminregister/AdminRegister';
import Userregister from './pages/login/Userregister';
import Admindashboard from './dashboard/admindashboard/Admindashboard'
import Addproducts from './dashboard/admindashboard/Addproducts';
import Userdashboard from './dashboard/userdashboard/Userdashboard';





function App() {
  return (
    <>
<Routes>
  <Route path='/' element={<Allproducts/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/products/:id' element={<View/>}/>
  <Route path='/wishlist' element={<Wishlist/>} />
  <Route path='/login' element={<Login />} />
  <Route path='/userregister' element={<Userregister/>}/>
  <Route path='adminlogin' element={<AdminLogin />} />
<Route path='/adminregister' element={<AdminRegister/>}/>
<Route path='/admindashboard' element={<Admindashboard/>}/>
<Route path='/userdashboard' element={<Userdashboard/>}/>
<Route path='/addproducts' element={<Addproducts/>}/>

</Routes>
    </>
  );
}

export default App;
