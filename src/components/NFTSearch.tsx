// NFTSearch.tsx
import React, { FC, useState } from 'react';

interface NFT {
    // Define the structure of your NFT data
    name: string;
    // Add more properties as needed
}

const NFTSearch: FC = () => {
  const [address, setAddress] = useState('');
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [error, setError] = useState('');

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'; // Use environment variable or default

  const fetchSolanaNFTsByAccount = async (accountAddress: string) => {
    try {
      const response = await fetch(`${backendURL}/api/nftscan/solana/nfts/${accountAddress}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNfts(data.content || []); // Adjusted to account for the 'content' array
    } catch (error) {
      console.error('Error fetching NFT data:', error);
      setError('Failed to fetch NFTs. Please try again.');
    }
  };
  

  const handleSearch = () => {
    if (!address.trim()) {
      setError('Please enter a valid Solana wallet address.');
      return;
    }
    setError(''); // Clear previous errors
    fetchSolanaNFTsByAccount(address);
  };

  return (
    <div>
     <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Solana wallet address"
        style={{ color: 'black', backgroundColor: 'lightgray', border: '1px solid black', padding: '8px', borderRadius: '4px' }}
      />
      <button onClick={handleSearch}>Search NFTs</button>
      {error && <p className="error">{error}</p>}
      <div>
        {Array.isArray(nfts) ? (
          nfts.map((nft, index) => (
            <div key={index}>
              <p>{nft.name}</p>
              {/* Render other NFT details as needed */}
            </div>
          ))
        ) : (
          <p>No NFTs found or invalid data format.</p>
        )}
      </div>
    </div>
  );
};

export default NFTSearch;
