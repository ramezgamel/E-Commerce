import { Outlet } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  useEffect(() => {
    // window.matchMedia("(prefers-color-scheme: dark)").matches
    if (theme == 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light')
    }
  }, [theme]);
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
          theme={theme}
        />
    <Header theme={theme} setTheme={setTheme}/>
    <Outlet/>
  </> ;
}

export default App;
