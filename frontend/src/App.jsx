import { Outlet } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';

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
  return <Outlet />;
}

export default App;
