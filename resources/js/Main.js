import React , { useState , useEffect } from 'react'
import { BrowserRouter as Router , Route, Switch  } from 'react-router-dom'



import Swal2 from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


// STATE
import { useDispatch , useSelector} from 'react-redux'





// PAGES
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// AUTH PAGES
import ProtectedRoute from './components/ProtectedRoute'
import ProviderLoginResolve from './pages/auth/ProviderLoginResolve'
import SocialLogin from './pages/SocialLogin'


import Dashboard from './pages/auth/Dashboard';
import Loader from './components/Loader'
import CarListing from './pages/CarListing'
import SingleCar from './pages/SingleCar'
import ChatUI from "./pages/ChatUI";
import Chats from "./pages/Chats";
import AdminSingleCar from "./pages/AdminSingleCar";






// SWEETALERT2 SETUP
const Swal = withReactContent(Swal2)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


// SWEETALERT2 HOOK
window.Toast = Toast;
window.Swal = Swal;




function App() {

    const dispatch =  useDispatch();

    const authUser = useSelector( state => state.authUser)

    const { loggedInUser , loading , auth , error } = authUser;





  return (
  <div className="app-wrapper">

    <Router>

         <Navbar/>

         <Loader isLoggedIn={auth} />

          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/listing" exact component={() => (<CarListing fullMode={true} inAdmin={false}/>)}/>

            <Route path="/:carID-:carSlug" exact component={SingleCar}/>
            <Route path="/about" exact component={About}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>

            <ProtectedRoute path="/dashboard/cars" exact component={() => (<CarListing fullMode={true} inAdmin={true}/>)}/>
            <ProtectedRoute path="/dashboard/mycars" exact component={() => (<CarListing fullMode={true} inAdmin={true} MyCars={true}/>)}/>
            <ProtectedRoute path="/dashboard/:carID-:carSlug" exact component={AdminSingleCar}/>
            {/* <ProtectedRoute path="/dashboard/mycars" exact component={MyCars}/> */}
            <ProtectedRoute path="/dashboard/chats" exact component={Chats}/>
            <ProtectedRoute path="/dashboard/chat/:threadID/messages" exact component={ChatUI}/>
            <ProtectedRoute path="/dashboard" exact component={Dashboard}/>

            <Route path="/social/authorize/:provider" exact component={ProviderLoginResolve}/>
            <Route path="/login-with-social" exact component={SocialLogin}/>

            <Route component={NotFound}/>
          </Switch>

        {!auth && <Footer/>}

     </Router>

  </div>
  );
}

export default App;
