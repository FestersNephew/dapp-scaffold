// pages/collections/details.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface CollectionDetails {
  symbol: string;
  name: string;
  floorPrice: number;
  // Define additional properties as needed
}

const CollectionsDetailsPage = () => {
  const router = useRouter();
  const { collections } = router.query; // Assuming collections is a comma-separated string of symbols
  const [collectionsDetails, setCollectionsDetails] = useState<CollectionDetails[]>([]);

  useEffect(() => {
    if (!collections || typeof collections !== 'string') return;
    const symbolsArray = collections.split(',');
    const fetchCollectionsDetails = async () => {
      try {
        const promises = symbolsArray.map(symbol =>
          fetch(`http://localhost:5000/api/collections/${symbol}`).then(res => res.json())
        );
        const details = await Promise.all(promises);
        setCollectionsDetails(details);
      } catch (error) {
        console.error("Failed to fetch collections details:", error);
      }
    };

    fetchCollectionsDetails();
  }, [collections]);

  if (collectionsDetails.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {collectionsDetails.map((collection, index) => (
        <div key={index}>
          <h1>{collection.name}</h1>
          <p>Floor Price: {collection.floorPrice}</p>
          {/* Display more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default CollectionsDetailsPage;
