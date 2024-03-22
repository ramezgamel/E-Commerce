import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {AnimatePresence, motion as m} from "framer-motion"
import NavAnimation from "../animation/NavAnimation"
function Auth() {
  const [formType, setFormType] = useState("login") ;
  return (
    <NavAnimation>
    <FormContainer>
      <AnimatePresence>
      {formType == 'login'? <m.h2 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className="text-main pb-3 font-bold text-3xl absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2"
      >Login</m.h2> : <m.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className="w-24 h-24 border bd rounded-full absolute right-1/2 top-0 translate-x-1/2 -translate-y-1/2">
          <div className="relative h-full">
            <div className="rounded-full h-full flex items-center overflow-hidden">
              <img src="../../public/default.jpeg" className="h-full"/>  
            </div>
            <div className="p-1 border bd hover:cursor-pointer hover:bg-blue-500 rounded-full bg-blue-700 absolute bottom-0 right-2">
              <FaCamera className="w-3 h-3 text-white "/>
            </div>
          </div>
      </m.div>}
      </AnimatePresence>
        <div className="mt-14 text-main flex">
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
        <Link to='/forget' className="text-main hover:text-blue-700">Forget your password?</Link>
      </div> }
    </FormContainer>
    </NavAnimation>
  )
}

export default Auth
