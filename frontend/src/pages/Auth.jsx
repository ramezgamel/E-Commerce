import { useState } from "react";
import FormContainer from "../components/form/FormContainer";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {AnimatePresence} from "framer-motion"
import NavAnimation from "../animation/NavAnimation"
function Auth() {
  const [formType, setFormType] = useState("login") ;
  return (
    <NavAnimation>
    <FormContainer>
        <div className="mt-2 text-main flex">
        <div onClick={()=>setFormType('login')} className= {`${formType == 'login' && '!border-blue-700 font-bold'} bd border-b-2 w-1/2 text-center pb-1 cursor-pointer`}>
          Login
        </div>
        <div onClick={()=>setFormType('register')} className={`${formType == 'register' && '!border-blue-700 font-bold'} bd border-b-2 w-1/2 text-center pb-1 cursor-pointer`}>
          Register
        </div>
      </div>
      <div className="transition-all delay-500 duration-1000"></div>
      <AnimatePresence mode="wait">
        <div className="overflow-hidden">
          {formType == 'login'? <Login/> : <Register/>}
        </div>
      </AnimatePresence>
      {formType == 'login' && <div className="mt-4 text-center">
        <Link to='/resetPassword' className="text-main hover:text-blue-700">Forget your password?</Link>
      </div> }
    </FormContainer>
    </NavAnimation>
  )
}

export default Auth
