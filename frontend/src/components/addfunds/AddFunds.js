import './AddFunds.css'
import React from 'react'
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
function AddFunds() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [err,setErr]=useState('')
  let {currentUser}=useSelector(state=>state.userLogin)
  let navigate=useNavigate()
async function onSignUpFormSubmit(userCred){
  console.log(userCred)
  let flag=await axios.post('http://localhost:4000/user-api/verify',userCred)
  console.log(flag.data.message)
  if(flag.data.message==="Amount Not Added"){
    setErr(flag.data.message)
  }
  else if(flag.data.message==="Verified"){
  // let response=await axios.post('http://localhost:4000/user-api/update-add-balance',userCred)
  let result= await axios.get(`http://localhost:4000/user-api/user-balance/${currentUser.username}/${currentUser.accountNo}`)
  console.log(result.data.payload)
  let res=await axios.post('http://localhost:4000/user-api/user-add-balance',userCred)
  console.log(res.data.message)
  navigate(`../dashboard/${currentUser.username}`)
  }
  }
  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card shadow">
          <div className="card-title text-center border-bottom">
            <h2 className="p-3">Add Funds</h2>
          </div>
          <div className="card-body">

            {/* user register error message */}
            
            <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
            {err.length!==0&&<p className="text-danger text-center">{err}</p>}
            <div className="mb-4">
                <label className="form-label">
                  Enter username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  {...register("usernameTo", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  Enter acc
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  {...register("accountNo", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  Enter amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  {...register("amount", { required: true })}
                />
              </div>

              <div className="text-end">
                <button
                  type="submit"
                  className="text-light"
                  style={{ backgroundColor: "maroon" }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddFunds