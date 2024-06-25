// pages/collections/[symbol].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Define the structure for collection details data
interface CollectionDetails {
  symbol: string;
  name: string;
  floorPrice: number;
  // Include other relevant details based on API response
}

const CollectionDetailsPage = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails | null>(null);

  useEffect(() => {
    if (!symbol) return;
    const fetchCollectionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/collections/${symbol}`);
        const data = await response.json();
        setCollectionDetails(data);
      } catch (error) {
        console.error("Failed to fetch collection details:", error);
      }
    };

    fetchCollectionDetails();
  }, [symbol]);

  if (!collectionDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{collectionDetails.name}</h1>
      <p>Floor Price: {collectionDetails.floorPrice}</p>
      {/* Display more details as needed */}
    </div>
  );
};

export default CollectionDetailsPage;
