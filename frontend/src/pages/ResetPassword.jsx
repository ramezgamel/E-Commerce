import { useRef, useState } from "react";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useForgetPasswordMutation, useResetPasswordMutation, useVerifyCodeMutation } from "../store/userApiSlice";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [forgetPassword] = useForgetPasswordMutation();
  const [verifyPasswordCode] = useVerifyCodeMutation();
  const [setNewPassword] = useResetPasswordMutation();
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const codeRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const sentCode = async () => {
    if(!email) return toast.error("Write Your email.");
    try {
      await forgetPassword(email).unwrap();
      setStep(2)
    } catch (err) {
      toast.error(err?.data?.message)
    }
  };
  const verifyCode =async () => {
    const code = codeRef.current.value;
    if(!code) return toast.error("Write verify code.");
    try {
      await verifyPasswordCode(code).unwrap();
      setStep(3)
    } catch (err) {
      toast.error(err?.data?.message)
    }
  };
  const resetPassword = async() => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if(!password || !confirmPassword) return toast.error("Fill all fields.")
    if(password !== confirmPassword) return toast.error("Password dos not match.")
  try {
    await setNewPassword({password, confirmPassword, email}).unwrap();
    navigate("/login")
  } catch (err) {
    toast.error(err?.data?.message)
  }
  };
  const submit = (e)=> {
    e.preventDefault()
    if(step == 1) return sentCode()
    if(step == 2) return verifyCode()
    if(step == 3) return resetPassword()
  }
  return (
    <FormContainer>
      <h2 className="text-main pb-3 font-bold text-3xl text-center  ">Reset password</h2>
      {step == 1 && <form onSubmit={submit}>
        <div>
          <label >Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your email"/>
        </div>
      </form>
      }
      {step == 2 && <form onSubmit={submit}>
        <div>
          <label >Verify Code</label>
          <input ref={codeRef} type="text" minLength={6} placeholder="Enter Code"/>
        </div>
      </form>
      }
      {step == 3 && <form onSubmit={submit}>
        <div>
          <label >New password</label>
          <input ref={passwordRef} type="password" placeholder="Enter new password"/>
        </div>
        <div>
          <label >Confirm password</label>
          <input ref={confirmPasswordRef} type="password" placeholder="Enter confirm password"/>
        </div>
      </form>
      }
      <div className="py-2 flex justify-between" >
        {step > 1 && <button className="btn" onClick={()=>setStep(prev=>prev-1)}>Back</button>}
        <button className="btn" onClick={submit}>{step < 3 ? "Next" : "Change"}</button>
      </div>
    </FormContainer>
  )
}

export default ResetPassword
