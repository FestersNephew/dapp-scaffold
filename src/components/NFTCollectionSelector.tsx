import React, { useState, useEffect, FC } from 'react';

interface NFTCollectionSelectorProps {
    onCollectionsSelect: (collections: string[]) => void; // Updated to handle multiple collections
}

const NFTCollectionSelector: FC<NFTCollectionSelectorProps> = ({ onCollectionsSelect }) => {
    const [collections, setCollections] = useState<string[]>([]);
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

    useEffect(() => {
        // Fetch collections logic
        setCollections(['Collection 1', 'Collection 2', 'Collection 3']);
    }, []);

    useEffect(() => {
        onCollectionsSelect(selectedCollections); // Call the parent handler whenever selections change
    }, [selectedCollections, onCollectionsSelect]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative inline-flex w-full md:w-1/2">
                <select
                    multiple
                    size={5}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto"
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedCollections(selectedOptions);
                    }}
                >
                    {collections.map((collection, index) => (
                        <option key={index} value={collection}>
                            {collection}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default NFTCollectionSelector;
