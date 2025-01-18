'use client';
import { useReadContract } from 'wagmi';
import React from 'react';
import { dotContractConfig } from './dotcontract';
import Image from 'next/image';

interface AddressProps {
    address: `0x${string}`;
    collection: string;
    // address: string;
  }

function getContractConfig(collection: string) {
  let contractconfig;
  if (collection === 'DOT') {
    contractconfig = dotContractConfig;
  }
  return contractconfig;
}

const ReadBalanceOf: React.FC<AddressProps> = ({ address, collection }) => {
  const contractconfig = getContractConfig(collection);
  const { data: balance } = useReadContract({
    ...contractconfig,
    functionName: 'balanceOf',
    //args: ['0x3f7b91816280237DDF0fE4D47a7A81086ea15a30'],
    args: [address],
  })
  // console.log("balance", balance);

  return (
    // <div>Balance: {balance?.toString()}</div>
    <div>
      <h2 className="text-lg font-bold mb-2">Number of NFT owned</h2>
      {/* <div className="text-gray-600">Balance of tokens in the account</div> */}
      <div className="mt-4 text-3xl font-bold">{balance?.toString()}</div>
    </div>
  )
}

type CollectionProps = {
  collection: string;
};

function ReadTotalSupply( {collection}: CollectionProps ) {
  const contractconfig = getContractConfig(collection);
  const { data: totalSupply } = useReadContract({
    ...contractconfig,
    functionName: 'totalSupply',
  })
  // console.log("totalSupply", totalSupply);

  return (
    // <div>totalSupply: {totalSupply?.toString()}</div>
    <div>
      <h2 className="text-lg font-bold mb-2">Total Supply</h2>
      {/* <div className="text-gray-600">Total supply of tokens in the collection</div> */}
      <div className="mt-4 text-3xl font-bold">{totalSupply?.toString()}</div>
    </div>
  )
}

const ReadtokensOfOwner: React.FC<AddressProps> = ({ address, collection }) => {
  const contractconfig = getContractConfig(collection);
  
  const { data: tokensOfOwner } = useReadContract({
    ...contractconfig,
    functionName: 'tokensOfOwner',
    args: [address],
  })
  // console.log("tokensOfOwner", tokensOfOwner?.toString());
  // console.log(typeof tokensOfOwner);
  const bigIntArray: unknown = tokensOfOwner;
  let mappedArray: string[] | null = null;
  if (Array.isArray(bigIntArray) && bigIntArray.every((item) => typeof item === "bigint")) {
    mappedArray = (bigIntArray as bigint[]).map((value) => value.toString());
    console.log(mappedArray); // ['2438', '2547']
  } else {
    console.error("The variable is not a valid BigInt array.");
  }


  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Owned NFT</h2>
      
      {mappedArray?.map((token, index) => (
        <div key={index} className="mt-2 flex flex-col items-center">
          <Image
            src={`https://ipfs.io/ipfs/bafybeih3p3vbpq7obssha3mt2ufwzvkyhdfavt5gwmvpriwta4cqyxcajq/${token}.png`}
            width={100}
            height={100}
            alt={`Token ${token}`}
            quality={40}
            className="rounded-lg shadow-md hover:shadow-lg transition duration-300"
          />
          <span className="text-center">{token.toString()}</span>
        </div>
      ))}
    </div>
    
  )
}

interface tokenId {
    Id: number,
    collection: string
}

const ReadtokenURI: React.FC<tokenId> = ({ Id, collection }) => {
  const contractconfig = getContractConfig(collection);
//   const { data: tokenURI } = useReadContract({
    const data = useReadContract({
    ...contractconfig,
    functionName: 'tokenURI',
    args: [BigInt(Id)],
  })
//   console.log("tokenURI", tokenURI);
console.log("tokenURI", data);

  return (
    // <div>tokenURI: {tokenURI?.toString()}</div>
    <div>tokenURI: {data.data?.toString()}</div>
  )
}

export { ReadBalanceOf, ReadTotalSupply, ReadtokensOfOwner, ReadtokenURI };