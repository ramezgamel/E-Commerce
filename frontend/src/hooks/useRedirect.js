import { useLocation, useNavigate } from "react-router-dom";

function useRedirect() {
  const navigate = useNavigate();
  const {pathname}  = useLocation();
  // const searchParams = useMemo(()=> new URLSearchParams(search),[search] ) ;
  // const redirectPath = searchParams.get('redirect') || '/';
  const redirect = () => {  
    navigate(pathname)  
  };
  return [redirect]
}

export default useRedirect
