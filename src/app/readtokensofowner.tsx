'use client';
import { useReadContract } from 'wagmi';
import React from 'react';
import { useState, useMemo } from 'react';
import { getContractConfig } from './getcontractconfig';
import Image from 'next/image';

interface PaginatedProps {
    address: `0x${string}`;
    collection: string;
    balance: number;
  }

export const ReadTokensOfOwner: React.FC<PaginatedProps> = ({ address, collection, balance }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const contractconfig = getContractConfig(collection);

    const { data: tokensOfOwner } = useReadContract({
        ...contractconfig,
        functionName: 'tokensOfOwner',
        args: [address],
    })
    console.log("tokensOfOwner", tokensOfOwner?.toString());

    const totalPages = Math.ceil(Number(balance) / itemsPerPage);
    console.log("totalPages", totalPages);
    let mappedArray: string[] | null = null;

    try {
        const bigIntArray: unknown = tokensOfOwner;
        if (Array.isArray(bigIntArray)) {
        if (bigIntArray.every((item) => typeof item === "bigint")) {
            mappedArray = (bigIntArray as bigint[]).map((value) => value.toString());
            console.log("mappedArray", mappedArray); // ['2438', '2547']
        } else if (bigIntArray.every((item) => typeof item === "number")) {
            mappedArray = (bigIntArray as number[]).map((value) => value.toString());
            console.log("mappedArray", mappedArray); // ['2438', '2547']
        } else {
            throw new Error("The variable is not a valid array.");
        }
        } else if (typeof bigIntArray === "bigint") {
        mappedArray = [bigIntArray.toString()];
        console.log("mappedArray", mappedArray); // ['2438']
        } else {
        // throw new Error("The variable is not an array or a single value.");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
        console.error(error);
        }
    }

    const paginatedTokens = useMemo(() => {
        if (!mappedArray) return [];
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return mappedArray.slice(start, end);
    }, [mappedArray, currentPage, itemsPerPage]);

    if (tokensOfOwner === null|| tokensOfOwner === undefined) {
        // Render a loading state while waiting for the balance
        return (<div>Loading...</div>)
    }

    return (
        <div className="containerofwholeimages">
            <div className="flex flex-wrap justify-center gap-4">
            {paginatedTokens.map((token, index) => (
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

            <div className="flex flex-wrap justify-center mt-4">
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                    key={page}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`py-2 px-4 rounded-lg ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                    {page + 1}
                    </button>
                ))}
                </div>
            )}
            </div>
        </div>
    );
}