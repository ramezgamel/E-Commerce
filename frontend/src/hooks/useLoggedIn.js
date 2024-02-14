import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useRedirect from "./useRedirect";

function useLoggedIn() {
  const { userInfo } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [redirect] = useRedirect()
  const userInfoMemo = useMemo(()=> userInfo, [userInfo]);
  useEffect(() => {
  if (userInfoMemo) {
    setIsLoggedIn(true);
    redirect()
  }else { 
    setIsLoggedIn(false);
  }
  }, [userInfoMemo]);
  return [isLoggedIn,userInfoMemo]
}

export default useLoggedIn
