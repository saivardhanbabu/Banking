import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
function TransferHistory() {
  let {currentUser}=useSelector((state)=>state.userLogin)
  let [transfer,setTransfer]=useState([])
  let [details,setDetails]=useState([])
  async function getTransactionDetails(){
      let ans=await axios.get(`http://localhost:4000/user-api/transfer/${currentUser.username}`)
      let response=await axios.get(`http://localhost:4000/user-api/transfer/${currentUser.username}/get`)
      console.log(ans.data.payload)
      setTransfer(ans.data.payload)
      setDetails(response.data.payload)
  }
  useEffect(() => {
    getTransactionDetails();
  }, []);
  return (
    <div>
        {transfer.length===0 &&details.length === 0 ? (
        <p
          className="display-1  text-center"
          style={{ color: "var(--crimson)" }}
        >
          No Transactions
        </p>
      ):(
        <div>
      <p className='lead fs-3 mt-3 text-success'>
        <div className='text-primary'>
          <h1>Amount Sent</h1>
          <table className='table table-striped thead-dark'>
          <thead>
              <tr>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transfer.map((transferObj) => {
                return (<tr key={transferObj._id}>
                <td>{transferObj.accountFrom}</td>
                <td>{transferObj.accountTo}</td>
                <td>{transferObj.amount}</td>
                </tr>)
              })}
              </tbody>
            </table>
        </div>
      </p>
      <p className='lead fs-3 mt-3 text-success'>
      <div className='text-primary'>
        <h1>Amount Received</h1>
        <table className='table table-striped thead-dark'>
        <thead>
            <tr>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detailsObj) => {
              return (<tr key={detailsObj._id}>
              <td>{detailsObj.accountFrom}</td>
              <td>{detailsObj.accountTo}</td>
              <td>{detailsObj.amount}</td>
              </tr>)
            })}
            </tbody>
          </table>
      </div>
    </p>
    </div>
  )}
    </div>
  )
}

export default TransferHistory