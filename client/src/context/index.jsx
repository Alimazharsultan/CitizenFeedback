import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';
// import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import axios from 'axios'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading, error } = useContract('0xDB005120b5Ba73A165A41102b7D9A34C5B4420e7');
  const { mutateAsync: CreateComplaint } = useContractWrite(contract, 'createComplaint');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    if(error){
        console.log(error)
    }
    // console.log(form)
    // console.log([
    //   address, // owner
    //   form.title, // title
    //   // form.description, // description
    //   form.target,
    //   new Date(form.date).getTime(), // deadline,
    //   form.image
    // ])
    try {
      const data = await CreateComplaint([
        address, // owner
        form.title, // title
        // form.description, // description
        form.target,
        new Date(form.date).getTime(), // deadline,
        form.image
      ])
      const complaints = await contract.call('numberOfComplaints');
      const blockNo = parseInt(complaints?._hex) - 1

      const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
      const body = JSON.stringify({
				blockNo, 
        userName: form.name,
        description: form.description,
			})
      await axios.post('http://localhost:5001/createComplaint', body, config)

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getComplaints = async () => {
    const complaints = await contract.call('getComplaints');
    
    const parsedCampaings = complaints.map((complaint, i) => ({
      owner: complaint.owner,
      title: complaint.title,
      // description: complaint.description,
      target: complaint.target,
      date: complaint.date.toNumber(),
      // amountCollected: ethers.utils.formatEther(complaint.amountCollected.toString()),
      image: complaint.image,
      pId: i
    }));
    
    // console.log(complaints)
    // console.log(parsedCampaings)
    return parsedCampaings;
  }

  const getUserComplaints = async () => {
    const allComplaints = await getComplaints();

    const filteredComplaints = allComplaints.filter((complaints) => complaints.owner === address);

    return filteredComplaints;
  }

  // const donate = async (pId, amount) => {
  //   const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

  //   return data;
  // }

  // const getDonations = async (pId) => {
  //   const donations = await contract.call('getDonators', pId);
  //   const numberOfDonations = donations[0].length;

  //   const parsedDonations = [];

  //   for(let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: ethers.utils.formatEther(donations[1][i].toString())
  //     })
  //   }

  //   return parsedDonations;
  // }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        CreateComplaint: publishCampaign,
        getComplaints,
        getUserComplaints,
        // donate,
        // getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);