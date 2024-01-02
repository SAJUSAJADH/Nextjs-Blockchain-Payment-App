'use client'

import React, { useEffect, useState, useContext } from "react"

import { ethers } from "ethers";

import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext()

let ethereum

if (typeof window !== 'undefined') {

    ethereum = window.ethereum

  }

const getEthereumContract = async () => {

    const provider = new ethers.BrowserProvider(ethereum)

    const signer = await provider.getSigner()

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    
    return transactionContract

}

export const TransactionProvider = ({children}) => {

    const [FormData, setFormData] = useState({

        addressTo: '', amount: '', message: ''

    })

    const [connectedAccounts, setConnectedAccounts] = useState()

    const [Loading, setLoading] = useState(false)

    const [transactionCount, setTransactionCount] = useState(() => {

        if (typeof window !== 'undefined') {

          return parseInt(localStorage.getItem('transactionCount')) || 0

        }

        return 0

      })

    const checkWalletConnection = async () => {

        try {

            if (!ethereum) return alert('Please install metamask!')

            const accounts = await ethereum.request({method: 'eth_accounts'})

            await accounts.length && setConnectedAccounts(accounts[0]) 

            // console.log(accounts)
            
        } catch (error) {

            console.log(error)
            
        }

    }

    useEffect(()=>{

        checkWalletConnection()

    },[])

    const connectWallet = async () => {

        try {
                       
            if(!ethereum) return alert('please install metamask!')

            const accounts = await ethereum.request({method: "eth_requestAccounts" })

            setConnectedAccounts(accounts[0])

        } catch (error) {

            console.log(error)
            
        }

    }

    const sendTransaction = async () => {

        try {

            if(!ethereum) return alert('please install metamask!')

            const transactionContract = await getEthereumContract();

            const {addressTo, amount, message} = FormData

            const parsedAmount = ethers.parseEther(amount)

            // await ethereum.request({

            //     method: 'eth_sendTransaction',

            //     params: [{

            //         from: connectedAccounts,

            //         to: addressTo,

            //         gas: '0x5208', //21000 GWEI

            //         value: parsedAmount._hex,

            //     }]

            // })

            const transaction = {

                to: addressTo,

                value: parsedAmount,

                gasPrice: ethers.parseUnits('21000', 'gwei'), 

            }

            const signedTransaction = await transactionContract.deploymentTransaction(transaction)

            const amountAsBigInt = BigInt(Math.floor(amount * 1e18))

            const transactionHash = await transactionContract.addToBlockchain(addressTo, amountAsBigInt, message)

            setLoading(true)

            console.log(`Loading - ${transactionHash.hash}`)
            
            await transactionHash.wait()

            console.log(`Success - ${transactionHash.hash}`)

            setLoading(false)

            setFormData({addressTo: '', amount: '', message: ''})

            const transactionCount = await transactionContract.getTransactionCount()

            setTransactionCount(Number(transactionCount))

        } catch (error) {

            console.log(error)
            
        }
    }

    const handleChange = (e, name) => {

        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    return(
        <TransactionContext.Provider  value={{ connectWallet, connectedAccounts, FormData, setFormData, handleChange, sendTransaction, Loading, setLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}


