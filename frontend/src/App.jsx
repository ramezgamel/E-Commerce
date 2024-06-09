import { Outlet } from 'react-router-dom';
import './index.css';
import { Suspense } from 'react';
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import FullPageLoader from './components/FullPageLoader';
function App() {

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
    <Suspense fallback={<FullPageLoader />}>
      <Outlet />
    </Suspense>
  </>;
}

export default App;
