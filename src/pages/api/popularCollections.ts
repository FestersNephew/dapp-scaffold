// pages/api/popularCollections.js
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api-mainnet.magiceden.dev/v2/marketplace/popular_collections?timeRange=1d');
    if (!response.ok) {
      throw new Error('Failed to fetch popular collections');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
