import './DashBoard.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
function DashBoard() {
    let {currentUser}=useSelector(state=>state.userLogin)
    let [err,setErr]=useState('')
    let [transaction,setTransaction]=useState([])
    let [balance,setBalance]=useState([])
    const getUserBalance= async () => {
      let res= await axios.get(`http://localhost:4000/user-api/user-balance/${currentUser.username}/${currentUser.accountNo}`)
      // let res1= await axios.get(`http://localhost:4000/user-api/transfer/${currentUser.username}`)
      // console.log(res.data.payload)
      // console.log(res1.data.message)
      if(res.data.message==='Amount'){
        setBalance(res.data.payload)
        console.log(res.data.payload);
        
      }else{
       setErr(res.data.message)
      }
     };
   
   
     useEffect(() => {
       getUserBalance();
     }, []);
  return (
    <div class="container12">
      <div>
        <img src="https://img.freepik.com/premium-vector/bank-building-white-background-giving-out-money-vector-flat-modern-design-illustration_566886-645.jpg"></img>
      </div>
      <div class="text">
      {balance === null ? (
        <p
          className="display-1  text-center"
          style={{ color: "var(--crimson)" }}
        >
          0
        </p>
      ):(
      <p className='lead fs-3 mt-3 text-primary'><b>Total Balance: </b>{
        balance.map((bal)=>
        <div className='text-primary' key={bal._id}>
          <div style={{color:'maroon'}}>
          <b>{bal.balance}</b>
          </div>
          <b>Username: {bal.username}</b>
          <br></br>
          <div style={{color:'maroon'}}>
          <b>Account No: {bal.accountNo}</b>
          </div>
        </div>
  
        )
      }</p>
  )}
  </div>
    </div>
  )
}

export default DashBoard