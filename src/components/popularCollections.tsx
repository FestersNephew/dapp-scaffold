import React, { useEffect, useState } from 'react';

interface Collection {
  symbol: string;
  name: string;
  description: string;
  image: string;
  floorPrice: number;
}

interface PopularCollectionsProps {
  onSelectCollection: (symbol: string) => void;
  selectedCollections: string[];
}

const PopularCollections: React.FC<PopularCollectionsProps> = ({ onSelectCollection, selectedCollections }) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetch('/api/popularCollections')
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setCollections(data);
      })
      .catch((error) => console.error("Failed to fetch popular collections:", error));
  }, []);

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-wrap justify-center">
        {collections.map((collection, index) => (
          <div
            key={index}
            onClick={() => onSelectCollection(collection.symbol)}
            className={`m-4 w-60 h-80 flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 ${
              selectedCollections.includes(collection.symbol) ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden">
              <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{collection.name}</h3>
            <p className="text-gray-500">Floor: {collection.floorPrice / 1e9} SOL</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCollections;
