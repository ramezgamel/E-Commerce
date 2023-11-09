import { Outlet } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';
import Header from "./components/Header"
function App() {
  useEffect(() => {
    // window.matchMedia("(prefers-color-scheme: dark)").matches
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme == 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return <>
    <Header/>
    <Outlet/>
  </> ;
}

export default App;
