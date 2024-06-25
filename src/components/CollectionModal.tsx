import React, { FC } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

interface CollectionModalProps {
  isOpen: boolean;
  selectedCollections: string[];
  collectionData: any; // Consider defining a more specific type based on the structure of the data
  onClose: () => void;
}

const CollectionModal: FC<CollectionModalProps> = ({ isOpen, selectedCollections, collectionData, onClose }) => {
  const router = useRouter(); // Use the useRouter hook for navigation

  // Function to handle checkout action
  const handleCheckout = () => {
    onClose(); // First, close the modal
    // Then, navigate to the details page with selected collections
    // Adjust the URL as needed for your application's routing structure
    router.push(`/collections/details?collections=${selectedCollections.join(',')}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Selected Collections</h2>
        {selectedCollections.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-800">
            {selectedCollections.map((collection, index) => (
              <li key={index}>{collection}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800">No collections selected.</p>
        )}
        <div className="flex justify-end mt-4">
          {/* Close button */}
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
          {/* Checkout button */}
          <button onClick={handleCheckout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
