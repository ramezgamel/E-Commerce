import { Outlet, useLocation } from 'react-router-dom';
import './index.css';
import { Suspense } from 'react';
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import FullPageLoader from './components/FullPageLoader';
import NavAnimation from './animation/NavAnimation';
function App() {
  const location = useLocation();
  return <>
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      stacked
      pauseOnHover={false}
    />
    <Header />
    <NavAnimation id={location.pathname.split("/")[1]}>
      <Suspense fallback={<FullPageLoader />}>
        <Outlet />
      </Suspense>
    </NavAnimation>
  </>;
}

export default App;
