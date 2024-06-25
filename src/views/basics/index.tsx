import React, { FC, useState } from "react";
import PopularCollections from "components/popularCollections";
import CollectionModal from "components/CollectionModal";
import { SignMessage } from "components/SignMessage";
import { SendTransaction } from "components/SendTransaction";
import { SendVersionedTransaction } from "components/SendVersionedTransaction";
import CartIcon from "components/CartIcon";

export const BasicsView: FC = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionData, setCollectionData] = useState(null);


  const fetchCollectionDataFromBitquery = async (collectionSymbol: string) => {
    // Example function to fetch data from your server, which queries Bitquery
    try {
      const response = await fetch(`/api/bitquery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            ethereum {
              dexTrades(
                options: {limit: 10, desc: "tradeIndex"}
                exchangeName: {is: "Uniswap"}
                baseCurrency: {is: "${collectionSymbol}"}
              ) {
                transaction {
                  hash
                }
                tradeIndex
                date {
                  date
                }
              }
            }
          }`
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching collection data from Bitquery:', error);
      return null;
    }
  };
  

  const handleSelectCollectionFromPopular = async (collectionSymbol: string) => {
    const updatedSelections = selectedCollections.includes(collectionSymbol)
      ? selectedCollections.filter(symbol => symbol !== collectionSymbol)
      : selectedCollections.length < 3 ? [...selectedCollections, collectionSymbol] : selectedCollections;
    setSelectedCollections(updatedSelections);
  
    // Fetch data from Bitquery for the selected collection
    const fetchedData = await fetchCollectionDataFromBitquery(collectionSymbol);
    if (fetchedData) {
      setCollectionData(fetchedData); // Store fetched data in state
      setIsModalOpen(true); // Automatically open the modal when a collection is selected and data is fetched
    } else {
      // Handle the case where fetching data fails, e.g., by showing an error message or logging
      console.error('Failed to fetch collection data from Bitquery');
    }
  };
  
  

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        {/* Your existing content */}
        <PopularCollections onSelectCollection={handleSelectCollectionFromPopular} selectedCollections={selectedCollections} />
        <CartIcon count={selectedCollections.length} onClick={() => setIsModalOpen(true)} />
        <SignMessage />
        <SendTransaction />
        <SendVersionedTransaction />
        {isModalOpen && (
          <CollectionModal
            isOpen={isModalOpen}
            selectedCollections={selectedCollections}
            collectionData={collectionData} // Assuming you've set this state to store Bitquery data
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};


          