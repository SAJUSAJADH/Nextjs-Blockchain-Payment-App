'use client'

import React, { useState, useContext, useEffect } from 'react'

import { TransactionContext } from '../context/TransactionContext'


export const Form = () => {

  const { handleChange, sendTransaction, FormData, setFormData, connectedAccounts, Loading} = useContext(TransactionContext)

  const { addressTo, amount, message} = FormData

  useEffect(() => {
    const resetForm = async () => {
      try {
        if (!Loading) {

          await setFormData({
            addressTo: '',
            amount: '',
            message: '',
          });
        }
      } catch (error) {
        console.error('Error resetting form:', error);
      }
    };


    resetForm();
  }, [Loading, setFormData]);

  const makeTransaction = async (e) => {

    e.preventDefault();

    try {

      if(!addressTo || !amount || !message)  return;

      else {

        await sendTransaction();

      }

      
    } catch (error) {
      
      console.log(error)

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
  
            <button type="submit" className="button-clr text-white p-2 rounded-md" disabled={!connectedAccounts}>{Loading ? 'Sending...' : 'Send Now'}</button>
          </form>
        </div>
      </div>
            </div>
        </div>
    )
}