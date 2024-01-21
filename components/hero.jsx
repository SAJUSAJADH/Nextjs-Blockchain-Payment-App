'use client'

import React from 'react'

import Image from 'next/image'
import { shortenAddress } from '../utils/shortenAddress'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'


export const Hero = () => {

    const { address, isConnected } = useAccount()


    const connectButton = () => {
        return (
          <ConnectButton
            label="Get Started"
            showBalance="false"
            accountStatus="address"
            chainStatus={{ smallScreen: "none", largeScreen: "full" }}
          />
        );
      };


    return(
        <div className="grid lg:grid-cols-2 pt-10 lg:pt-32 py-6 px-8 lg:px-32 gap-6">
            <div className="px-2 py-2">
                <p className="text-3xl lg:text-4xl pb-6 text-center lg:text-start font-lexend tracking-widest text-white font-semibold">
                    Send Crypto Across The World
                </p>
                <p className="text-lg lg:text-lg pb-6 text-center lg:text-start font-lexend tracking-widest text-white">
                    Explore the Crypto world. Buy and Sell CryptoCurrencies easily.
                </p>
                <div className='flex justify-center lg:justify-start'>
                {!isConnected &&
                    connectButton()
                }
                </div>
            </div>
            <div className="px-2 py-2 hidden lg:flex justify-center">
                <div className='hero w-3/5 h-7/8 rounded-xl z-30 shadow-xl '>
                    <div className="flex justify-between">
                        <Image className='w-[40px] h-[40px] ps-2 pt-2 cursor-pointer' src='/eth.png' width={40} height={40} alt="eth"/>
                        <Image className='w-[25px] h-[25px] pe-2 pt-2 cursor-pointer' src='/i.png' width={25} height={25} alt="i"/>
                    </div>
                    <div className='ps-2 mt-16'>
                        <p className='text-white italic text-lg'>{isConnected ? shortenAddress(address) : 'Address'}</p>
                        <h1 className='font-bold text-xl text-white tracking-widest'>Ethereum</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}