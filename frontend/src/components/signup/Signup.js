import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [err,setErr]=useState('')
  let navigate=useNavigate()

  async function onSignUpFormSubmit(userObj) {
    console.log(userObj)
    let res;
    //http post req to user-api
    userObj={
      ...userObj,
      balance:0
    }
    let ans=await axios.post('http://localhost:4000/user-api/user-add-balance/first',userObj)
    res=await axios.post('http://localhost:4000/user-api/user',userObj)
    if(res.data.message==='User created' && ans.data.message==="Added"){
      //navigate to signin
      navigate("/signin")
    }else{
      setErr(res.data.message)
    }
    
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Register To Net Banking</h2>
            </div>
            <div className="card-body">

              {/* user register error message */}
              
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
              {err.length!==0&&<p className="text-danger text-center">{err}</p>}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    id="username"
                    {...register("username", { required: true, minLength: 4, maxLength: 20 })}
                  />
                  {errors.username && errors.username.type === "required" && <p className="text-danger">Username is required.</p>}
                  {errors.username && errors.username.type === "minLength" && <p className="text-danger">Username must be at least 4 characters long.</p>}
                  {errors.username && errors.username.type === "maxLength" && <p className="text-danger">Username cannot exceed 20 characters.</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="password"
                    {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                  />
                  {errors.password && errors.password.type === "required" && <p className="text-danger">Password is required.</p>}
                  {errors.password && errors.password.type === "minLength" && <p className="text-danger">Password must be at least 6 characters long.</p>}
                  {errors.password && errors.password.type === "maxLength" && <p className="text-danger">Password cannot exceed 20 characters.</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account No"
                    id="email"
                    {...register("accountNo", { required: true,minLength: 6, maxLength: 20 })}
                  />
                  {errors.accountNo && <p className="text-danger">Account No is required.</p>}
                  {errors.accountNo && errors.accountNo.type === "minLength" && <p className="text-danger">Account must be 10 digits.</p>}
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="text-light"
                    style={{ backgroundColor: "maroon" }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
