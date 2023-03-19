// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CitizenFeedback {
    struct Complaint {
        address owner; 
        string title;
        // string description;
        string target;
        uint256 date;
        // uint256 amountCollected;
        string image;
        // address[] donators;
        // uint256[] donations;
    }

    mapping(uint256 => Complaint) public complaints;
    uint public numberOfComplaints = 0;

    function createComplaint(
        address _owner,
        string memory _title,
        // string memory _description,
        string memory target,
        uint256 date,
        string memory _image
    ) public returns (uint256) {
        Complaint storage complaint = complaints[numberOfComplaints];

        // require(
        //     complaint.deadline < block.timestamp,
        //     "The deadline should be a date in the future"
        // );

        complaint.owner = _owner;
        complaint.title = _title;
        // complaint.description = _description;
        complaint.target = target;
        complaint.date = date;
        // complaint.amountCollected = 0;
        complaint.image = _image;
        // complaint.donators = _donators;
        // complaint.donations = _donations;

        numberOfComplaints++;

        return numberOfComplaints - 1;
    }

    

    

    function getComplaints() public view returns (Complaint[] memory) {
        Complaint[] memory allCampaigns = new Complaint[](numberOfComplaints);
        for (uint i = 0; i < numberOfComplaints; i++) {
            Complaint storage item = complaints[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
