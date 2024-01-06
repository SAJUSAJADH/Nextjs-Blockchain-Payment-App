'use client'

import { unstable_noStore as noStore } from 'next/cache'
import { useEffect, useState } from "react"
import Image from "next/image"
import Moralis from "moralis"

export const Market = () => {
    

    const [tokenData, setTokenData] = useState([]);

  const addresses = [
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  ];

  useEffect(() => {
    const getPrice = async () => {
      try {
        noStore()
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });

        const chain = '0x1';
        const data = await Promise.all(
          addresses.map(async (address) => {
            try {
              const response = await Moralis.EvmApi.token.getTokenPrice({
                chain: chain,
                address: address,
              });
              return response.toJSON();
            } catch (e) {
              console.log(e);
              return null;
            }
          })
        );

        setTokenData(data.filter((item) => item !== null));
      } catch (e) {
        console.error(e);
      }
    };

    getPrice();
  }, []);

  const getData = (value) => {
    const item = tokenData.find((token) => token.tokenSymbol === value);
    return item ? item.usdPrice.toFixed(2) : '0.00';
  };



  
    


    

    return(
        <>
            <div className="container mx-auto pt-10 lg:pt-32 py-6 px-8">
                <p className="text-3xl lg:text-8xl font-lexend font-bold text-white text-center">
                    TRACK AND TRADE
                </p>
                <p className="text-3xl lg:text-9xl font-lexend font-bold text-white text-center market">
                    CRYPTO CURRENCIES
                </p>
                <div className="hidden lg:grid grid-cols-4 gap-4 justify-center pt-8">
                    <div className="grid justify-center">
                        <Image src={'/polygon.webp'} width={100} height={100} alt=""/>
                        <p className="text-2xl font-lexend font-bold text-white text-center">MATIC</p>
                        <p className="text-2xl font-lexend font-bold text-white text-center">{getData('MATIC')}$</p>
                    </div>
                    <div className="grid justify-center">
                        <Image src={'/chainlink.webp'} width={100} height={100} alt=""/>
                        <p className="text-2xl font-lexend font-bold text-white text-center">Chainlink</p>
                        <p className="text-2xl font-lexend font-bold text-white text-center">{getData('LINK')}$</p>
                    </div>
                    <div className="grid justify-center">
                        <Image src={'/Tether.webp'} width={100} height={100} alt=""/>
                        <p className="text-2xl font-lexend font-bold text-white text-center">Tether</p>
                        <p className="text-2xl font-lexend font-bold text-white text-center">{getData('USDT')}$</p>
                    </div>
                    <div className="grid justify-center">
                        <Image src={'bnb-icon2_2x.webp'} width={100} height={100} alt=""/>
                        <p className="text-2xl font-lexend font-bold text-white text-center">BNB</p>
                        <p className="text-2xl font-lexend font-bold text-white text-center">{getData('BNB')}$</p>
                    </div>
                </div>
            </div>
        </>
    )
}