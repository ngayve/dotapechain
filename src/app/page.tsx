'use client';
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import Head from 'next/head';
import { useAccount } from "wagmi";
import { useState, useEffect } from 'react';
import { ReadBalanceOf, ReadTotalSupply, ReadtokensOfOwner } from './read-contract'
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

export default function Home() {
  console.log('Home component rendered');
  const { address: connectedAddress } = useAccount();
  // const [ add, setAdd ] = useState<`0x${string}` | undefined>(connectedAddress);
  const [add] = useState<`0x${string}` | undefined>(connectedAddress);

  useEffect(() => {
    // Update the text based on client-side data or logic

  }, []);

  return (
    <div>
      <Header />

      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">DOT</span>
        </h1>
        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
          <p className="my-2 font-medium">Connected Address: {add}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <div className="bg-white rounded-lg shadow-md p-4 w-64">
            <ReadTotalSupply collection={DOT} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 w-64">
            {add && (
              <ReadBalanceOf address={add} collection={DOT} />
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-4 w-64">
            {add && (
              <ReadtokensOfOwner address={add} collection={DOT} />
            )}
          </div>
        </div>


      </div>
    </div>
  );
}


// if (!connectedAddress) {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10">
//       <div className="px-5">
//         <h1 className="text-center">
//           <span className="block text-2xl mb-2">Welcome to</span>
//           <span className="block text-4xl font-bold">DOT</span>
//         </h1>
//         <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
//           <p className="my-2 font-medium">Please connect your wallet</p>
//         </div>
//       </div>
//     </div>
//   );
// }
