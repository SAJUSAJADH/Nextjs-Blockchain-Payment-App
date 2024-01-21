'use client'

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export const Header = () => {

     const connectButton = () => {
        return (
          <ConnectButton
            label="Connect"
            showBalance="false"
            accountStatus="address"
            chainStatus={{ smallScreen: "none", largeScreen: "full" }}
          />
        );
      };


    return(
        <nav  className="fixed nav z-40 mx-auto p-6 px-8 lg:px-32 w-full flex justify-between items-center">
                <a href='/' className="font-bold italic text-3xl text-white  font-mono tracking-widest cursor-pointer">ChainPay</a>
                {connectButton()}
        </nav>
    )
}