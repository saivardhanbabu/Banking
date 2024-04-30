import React from 'react'
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { userTransferThunk } from '../../redux/slices/userTransferSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Transfer() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [err,setErr]=useState('')
  let dispatch=useDispatch();
  let [balance,setBalance]=useState([])
  let navigate=useNavigate()
  const {  errorStatus, errorMessage, transferStatus } = useSelector(state => state.transfer)
  let {currentUser}=useSelector((state)=>state.userLogin)
  async function onSignUpFormSubmit(userCred) {
    let actionObj = userTransferThunk(userCred)
    dispatch(actionObj)

  //   try{
  //     let result = await axios.get(`http://localhost:4000/user-api/user-balance/${currentUser.username}/${currentUser.accountNo}`);
  //   if (result.data.message === 'Amount') {
  //   const availableBalance = result.data.payload[0].balance; // Assuming the balance is fetched as an array with a single element
  //   console.log(availableBalance)
  //   if (availableBalance < Number(userCred.amount)) {
  //     alert("Insufficient Funds");
  //     return;
  //     }
  //     setBalance(result.data.payload);
  //   }
  // }catch(error){
  //   console.error("Error fetching balance",error)
  // }
    userCred={
      ...userCred,
      usernameFrom:currentUser.username
    };
    try{
    let flag=await axios.post('http://localhost:4000/user-api/verify/transfer',userCred)
    console.log(flag.data.message)
    if(flag.data.message==="Amount Not Transferred"){
      setErr(flag.data.message)
    }
    else if(flag.data.message==="Verified"){
    let obj=await axios.post('http://localhost:4000/user-api/transfer/update',userCred)
    let response=await axios.post('http://localhost:4000/user-api/transfer',userCred)
    if(response.data.message==="transfer success"){
      alert("transaction successful")
      navigate(`../funds-history/${currentUser.username}`)
    }
    else if(response.data.message==="Insufficient funds"){
      alert("Insufficient funds")
      navigate(`../funds/${currentUser.username}`)
    }
  }
}catch(error){
  console.error("Error during transfer",error)
}
}
  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card shadow">
          <div className="card-title text-center border-bottom">
            <h2 className="p-3">Transfer Funds</h2>
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
                  From acc
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  {...register("accountFrom", { required: true })}
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
                  {...register("accountTo", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  Enter amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  {...register("amount", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  Enter IFSC code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  {...register("ifsc", { required: true })}
                />
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
  )
}
export default Transfer