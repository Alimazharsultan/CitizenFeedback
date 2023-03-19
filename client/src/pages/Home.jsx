import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getComplaints } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getComplaints();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Complaints"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home