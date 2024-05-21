import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useRedirect from "./useRedirect";

function useLoggedIn() {
  const { userInfo } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [redirect] = useRedirect()
  useEffect(() => {
  if (userInfo) {
    setIsLoggedIn(true);
    redirect()  
  }else { 
    setIsLoggedIn(false);
  }
  }, [redirect, userInfo]);
  return [isLoggedIn,userInfo]
}

export default useLoggedIn
