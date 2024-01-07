'use client'

import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';


export const Header = () => {

    const [isToggle, setIstoggle] = useState(false);
    const { connectWallet, connectedAccounts } = useContext(TransactionContext)


    const menus = [
        {name: 'Market', href: "https://coinmarketcap.com/currencies/ethereum/"},
        {name: 'Swap', href: "https://app.uniswap.org/swap"},
        {name: 'Services', href: "#services"},
        {name: 'Wallets', href:"https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"},
    ]


    const open =()=>{
        setIstoggle(!isToggle)
    }


    return(
        <nav  className="fixed nav z-40 mx-auto p-6 px-8 lg:px-32 w-full flex justify-between items-center">
                <a href='/' className="font-bold italic text-3xl text-white  font-mono tracking-widest cursor-pointer">ChainPay</a>
                <div className="hidden md:flex space-x-16 text-white justify-between">
                    <a href='https://coinmarketcap.com/currencies/ethereum/' target='_blank' className="hover-underline-animation tracking-widest cursor-pointer py-2 font-lexend text-lg">Market</a>
                    <a href='https://app.uniswap.org/swap' target='_blank' className="hover-underline-animation tracking-widest cursor-pointer py-2 font-lexend text-lg">Swap</a>
                    <a href='#services' className="hover-underline-animation tracking-widest cursor-pointer py-2 font-lexend text-lg">Services</a>                
                    <a href='https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank' className="hover-underline-animation tracking-widest cursor-pointer py-2 font-lexend text-lg">Wallets</a>
                    <button onClick={ connectWallet } className='px-10 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white mx-2 tracking-widest text-xl font-lexend'>{connectedAccounts ? shortenAddress(connectedAccounts) : 'Login'}</button>
                </div>
                <button onClick={open} id="menu-btn" className={isToggle ? 'open block hamburger md:hidden focus:outline-none ml-auto' : 'block hamburger md:hidden focus:outline-none ml-auto'}>
                    <span className="hamburger-top"></span>
                    <span className="hamburger-middle"></span>
                    <span className="hamburger-bottom"></span>
                </button>
                <div className="md:hidden">
                    <div onClick={open} id="menu" className={isToggle ? "absolute mt-6 flex flex-col items-center self-end py-8 text-xl duration-1000 rounded-2xl shadow-2xl space-y-6 header bg-opacity-90 border text-opacity-100 border-b-0 border-r-0 border-opacity-10 backdrop-filter backdrop-blur-sm text-[#fff] sm:w-auto sm:self-center left-6 right-6 drop-shadow-md" : "absolute hidden flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md" }>
                        {menus.map((menu,index)=>(
                            <a key={index} href={menu.href} target='_blank'>{menu.name}</a>
                        ))}
                        <button onClick={connectWallet} className='px-10 py-2 rounded-full bg-blue-600 text-white mx-2 tracking-widest text-xl font-lexend'>{connectedAccounts ? shortenAddress(connectedAccounts) : 'Login'}</button>
                     </div>
                </div>
        </nav>
    )
}