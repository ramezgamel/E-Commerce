import { Outlet } from 'react-router-dom';
import './index.css';
import { Suspense } from 'react';
import  Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import FullPageLoader from './components/FullPageLoader';
function App() {
  return <>
  <ToastContainer
    position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
  />
    <div className='fixed w-full z-50 top-0'>
      <Header/>
    </div>
    <Suspense fallback={<FullPageLoader/>}>
      <Outlet/>
    </Suspense>
    
  </> ;
}

export default App;
