'use client';
import { useReadContract } from 'wagmi';
import React from 'react';
import { getContractConfig } from './getcontractconfig';

type CollectionProps = {
  collection: string;
};

function ReadTotalSupply( {collection}: CollectionProps ) {
  const contractconfig = getContractConfig(collection);
  const { data: totalSupply } = useReadContract({
    ...contractconfig,
    functionName: 'totalSupply',
  }) as { data: number };
  const supply = Number(totalSupply)-1;
  // console.log("totalSupply", supply);

  return (
    <div>
      <div className="mt-4 text-3xl font-bold">{supply.toString()}</div>
    </div>
  )
}

interface tokenId {
    Id: number,
    collection: string
}

const ReadtokenURI: React.FC<tokenId> = ({ Id, collection }) => {
  const contractconfig = getContractConfig(collection);
    const data = useReadContract({
    ...contractconfig,
    functionName: 'tokenURI',
    args: [BigInt(Id)],
  })
  // console.log("tokenURI", data);

  return (
    <div>tokenURI: {data.data?.toString()}</div>
  )
}

export { ReadTotalSupply, ReadtokenURI };