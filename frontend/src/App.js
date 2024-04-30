import logo from './logo.svg';
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import Signin from './components/login/Login';
import RootLayout from './RootLayout';
import UserProfile from './components/userdashboard/UserProfile';
import AddFunds from './components/addfunds/AddFunds';
import TransferHistory from './components/transferhistory/TransferHistory';
import Transfer from './components/transfer/Transfer';
import DashBoard from './components/dashboard/DashBoard';
function App() {
  let {currentUser}=useSelector(state=>state.userLogin)
    const browserRouter=createBrowserRouter([{
      path:'',
      element:<RootLayout />,
      children:[
        {
          path:'',
          element:<Home />
        },
        {
          path:'/signup',
          element:<Signup />
        },
        {
          path:"/signin",
          element:<Signin />
        },
        {
          path:'/user-dashboard',
          element:<UserProfile />,
          children:[
            {
              path:'dashboard/:username',
              element:<DashBoard/>
            },
            {
                path:"funds/:username",
                element:<AddFunds/>
            },
            {
              path:'funds-transfer',
              element:<Transfer/>
            },
            {
              path:"funds-history/:username",
              element:<TransferHistory/>
            },
            {
              path:'',
              element:<Navigate to={`dashboard/${currentUser.username}`} />
            }
          ]
        }
      ]}])
        return (
          <div>
            <RouterProvider router={browserRouter} />
          </div>
        );
}

export default App;
