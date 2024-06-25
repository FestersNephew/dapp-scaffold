import React from 'react';

interface ModalProps {
  selectedCollections: string[];
  onClose: () => void; // Function to close the modal
}

const Modal: React.FC<ModalProps> = ({ selectedCollections, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Selected Collections</h2>
        <ul>
          {selectedCollections.map((collection, index) => (
            <li key={index}>{collection}</li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
