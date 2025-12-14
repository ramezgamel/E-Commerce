import { Outlet, useLocation } from 'react-router-dom';
import './index.css';
import { Suspense } from 'react';
import FullPageLoader from './components/FullPageLoader';
import NavAnimation from './animation/NavAnimation';
import { Toaster } from "sonner";
function App() {
  const location = useLocation();
  return <>
    <Toaster richColors />
    <NavAnimation id={location.pathname.split("/")[1]} >
      <Suspense fallback={<FullPageLoader />}>
        <Outlet />
      </Suspense>
    </NavAnimation>
  </>;
}

export default App;
