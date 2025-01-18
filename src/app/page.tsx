'use client';
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import { useState, useEffect } from 'react';
import { ReadTotalSupply } from './read-contract'
import { ReadBalanceOf } from './rebalanceof';
import { ReadTokensOfOwner } from './readtokensofowner';
const DOT = "DOT";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="navbar-start w-auto lg:w-1/2">
        
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-20 h-12">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">DOT</span>
          </div>
        </Link>
      </div>
      <div className="ml-auto">
        <ConnectButton />
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="px-5">
    <h1 className="text-center">
      <span className="block text-2xl mb-2">Welcome to</span>
      <span className="block text-4xl font-bold">DOT FARMING CENTER</span>
    </h1>
      <div className="flex justify-center items-center py-2">
      <Image
        src="/dotlogo.png"
        width={200}
        height={200}
        alt="DOTlogo"
        quality={100}
        className="rounded-lg shadow-md"
      />
      </div>
  </div>
  )
}

export default function Home() {
  console.log('Home component rendered');
  const { address: connectedAddress } = useAccount();
  const [ add, setAdd ] = useState<`0x${string}` | undefined>(connectedAddress);
  const [isMounted, setIsMounted] = useState(false); 
  const [balance, setBalance] = useState(0);

  const handleBalanceChange = (balance: number) => {
    setBalance(balance);
  };

  useEffect(() => {
    // Update the text based on client-side data or logic
    setIsMounted(true);
    setAdd(connectedAddress);
  }, [connectedAddress]);

  if (!isMounted) {
    return (
      <div>
        <div className="sticky top-0 bg-white z-10">
        <Header />
        </div>
        <Logo />
        <div className="content">
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="sticky top-0 bg-white z-10">
      <Header />
      </div>
      <Logo />
      <div className="content">
        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
        {add ? (
          <p className="my-2 font-medium">Connected Address:  {add}</p>
        ) : (
          <p className="my-2 font-medium">Waiting for address...</p>
        )}
        </div>
        {/* Cards Section */}
        <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-screen-md mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300 min-h-32">
            <h2 className="text-lg font-bold mb-2">Total Supply</h2>
            <ReadTotalSupply collection={DOT} />
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300 min-h-32">
            <h2 className="text-lg font-bold mb-2">Number of hold NFTs</h2>
            {add && (
                <ReadBalanceOf address={add} collection={DOT} onBalanceChange={handleBalanceChange}/>
              )}
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-4 col-span-2 border-2 border-gray-300 min-h-32">
            <h2 className="text-lg font-bold mb-2">Owned NFT Image</h2>
            {add && (
                <ReadTokensOfOwner address={add} collection={DOT} balance={balance}/>
              )}
          </div>
  
        </div>
      </div>
    </div>
  );
}
        

      


         
    
          
    
          


