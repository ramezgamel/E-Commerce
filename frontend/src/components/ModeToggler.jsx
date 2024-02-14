import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

function ModeToggler() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const toggleMode = () => {
    if (theme == 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };
  useEffect(() => { 
  // window.matchMedia("(prefers-color-scheme: dark)").matches
    if (theme == 'dark') {
      document.documentElement.classList.add('dark');
    } 
  else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button onClick={toggleMode} >
      {theme == 'dark' ? (
        <BsFillSunFill className="h-5 w-5 text-main" />
      ) : (
        <BsFillMoonFill className="h-5 w-5 text-main" />
      )}
    </button>
  )
}

export default ModeToggler
