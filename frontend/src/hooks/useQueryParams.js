import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  
  const params = Object.fromEntries(searchParams.entries());
  
  const addParam = (fieldName, value) => {
    newParams.set(fieldName, value); 
    setSearchParams(newParams);
  };

  const removeParam = (fieldName) => {
    newParams.delete(fieldName); 
    setSearchParams(newParams);
  };
  
  const clearParams = ()=> {
    setSearchParams({});
  }
  return {params, addParam, removeParam,clearParams}
};

export default useQueryParams