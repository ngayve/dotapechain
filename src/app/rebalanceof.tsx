
'use client';
import { useReadContract } from 'wagmi';
import React from 'react';
import { useEffect } from 'react';
import { getContractConfig } from './getcontractconfig';

interface BalanceProps {
    address: `0x${string}`;
    collection: string;
    onBalanceChange: (balance: number) => void;
  }

export const ReadBalanceOf: React.FC<BalanceProps> = ({ address, collection, onBalanceChange }) => {
  const contractconfig = getContractConfig(collection);
  const { data: balance } = useReadContract({
    ...contractconfig,
    functionName: 'balanceOf',
    args: [address],
  }) as { data: number }

  useEffect(() => {
    if (balance !== undefined && balance !== null) {
      onBalanceChange(balance);
    }
  }, [balance, onBalanceChange]);
  // console.log("balance", balance);
  
  if (balance === null|| balance === undefined) {
    // Render a loading state while waiting for the balance
    return (<div>Loading...</div>)
  } else {
    return (
        <div>
            <div className="mt-4 text-3xl font-bold">{balance?.toString()}</div>
        </div>
    )
  }
}
