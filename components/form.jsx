'use client'

import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import { useSendTransaction } from 'wagmi'

import { parseEther } from 'viem'

import { ethers } from 'ethers'

import { contractABI, contractAddress } from '@/utils/constants'
import { Spin } from 'antd'


export const Form = () => {

  const [FormData, setFormData] = useState({

    addressTo: '', amount: '', message: ''

})

  const {address, isConnected} = useAccount()

  const { data: hash, sendTransaction, isLoading } = useSendTransaction();

  const { addressTo, amount, message} = FormData

  const [transactionCount, setTransactionCount] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("transactionCount")) || 0;
    }

    return 0;
  });


  const getEthereumContract = async () => {

    const provider = new ethers.BrowserProvider(ethereum)

    const signer = await provider.getSigner()

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    
    return transactionContract

}

const handleChange = (e, name) => {
  setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
};

  const makeTransaction = async (ev) =>{
    ev.preventDefault()
    try {
      if(!addressTo || !amount || !isConnected || isLoading){
        console.log('no required values present')
      }
      sendTransaction({to: addressTo, value: parseEther(amount)})

      const amountAsBigInt = BigInt(Math.floor(amount * 1e18));

      const transactionContract = await getEthereumContract();

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        amountAsBigInt,
        message,
      );

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(Number(transactionCount));

      setFormData({
        addressTo: "",
        amount: "",
        message: "",
      });

    } catch (error) {
      console.log('transaction failed due to ', error)
    }
  }

    return(
        <div className="grid jusify-center">

            <div className=" w-full justify-start px-2">
            <div className="flex items-center justify-center">
        <div className="p-6 rounded-xl shadow-md w-full md:max-w-md form"> 
          <form onSubmit={makeTransaction}>
            <div className="mb-4">
            <input
                  style={{ caretColor: 'white', color: 'gray' }}
                  spellCheck="false"
                  placeholder="To"
                  autoComplete="off"
                  type="text"
                  name="addressTo"
                  value={addressTo}
                  onChange={(e) => handleChange(e, "addressTo")}
                  className="mt-1 p-2 w-full rounded-md outline-none bg-blue-200 border-0" 
                />
            </div>
  
            <div className="mb-4">
            <input
                  style={{ caretColor: 'white', color: 'gray' }}
                  spellCheck="false"
                  placeholder="Amount"
                  autoComplete="off"
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={(e) => handleChange(e, "amount")}
                  className="mt-1 p-2 w-full rounded-md outline-none bg-blue-200 border-0" 
                />
            </div>
  
            <div className="mb-4">
            <textarea
                  rows={3}
                  style={{ caretColor: 'white', color: 'gray' }}
                  spellCheck="false"
                  placeholder="Message"
                  autoComplete="off"
                  name="message"
                  value={message}
                  onChange={(e) => handleChange(e, "message")}
                  className="mt-1 p-2 w-full rounded-md outline-none bg-blue-200 border-0" 
                />
            </div>
  
            <button type="submit" className="button-clr text-white p-2 rounded-md" disabled={!isConnected}>{isLoading ? <Spin/> : 'Send Now'}</button>
          </form>
        </div>
      </div>
            </div>
        </div>
    )
}