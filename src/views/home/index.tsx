// HomeView/index.tsx
import { FC, useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import NFTSearch from '../../components/NFTSearch';
import WalletNFTsDisplay from '../../components/WalletNFTsDisplay';
import CollectionSearch from '../../components/CollectionSearch';
import NFTCollectionView from '../../components/NFTCollectionView';

export const HomeView: FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="dashboard">
      <h1>Slodowna Dashboard</h1>
      {/* Display NFTs from the user's wallet */}
      <WalletNFTsDisplay wallet={wallet} />
      {/* Allow users to search NFTs by wallet address */}
      <NFTSearch />
      {/* Search for collections */}
      <CollectionSearch />
      {/* Detailed viewing area for selected NFTs/Collections */}
      <NFTCollectionView />
    </div>
  );
};
