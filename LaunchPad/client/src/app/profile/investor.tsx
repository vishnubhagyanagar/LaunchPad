"use client";
import React, { useState } from 'react';
import { TextField, Button } from "@mui/material";

interface InvestorProfileProps {
  investor: {
    email: string;
    fullName: string;
    phoneNumber: string;
    typeOfInvestor: string;
    location: string;
    sectorsOfInterest: string;
    stageFocus: string;
    preferredBusinessModels: string;
    following: string[]; // Array of startup IDs
    ticketSize: string;
    equityStake: string;
    investmentHorizon: string;
    trackRecord: string;
    sectorExpertise: string;
    limitedPartners: string;
    geoPreferences: string;
    availability: string;
    createdAt: Date;
  };
}

const InvestorProfile: React.FC<InvestorProfileProps> = ({ investor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ ...investor });

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Perform save operation here, such as an API call
    console.log("Saved data:", profileData);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-200 text-black rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{profileData.fullName}'s Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Investor Details</h2>
          <TextField
            fullWidth
            label="Type of Investor"
            name="typeOfInvestor"
            value={profileData.typeOfInvestor}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Investment Horizon"
            name="investmentHorizon"
            value={profileData.investmentHorizon}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ticket Size"
            name="ticketSize"
            value={profileData.ticketSize}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Equity Stake"
            name="equityStake"
            value={profileData.equityStake}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Investment Focus</h2>
          <TextField
            fullWidth
            label="Sectors of Interest"
            name="sectorsOfInterest"
            value={profileData.sectorsOfInterest}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Stage Focus"
            name="stageFocus"
            value={profileData.stageFocus}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Preferred Business Models"
            name="preferredBusinessModels"
            value={profileData.preferredBusinessModels}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <TextField
            fullWidth
            label="Track Record"
            name="trackRecord"
            value={profileData.trackRecord}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Sector Expertise"
            name="sectorExpertise"
            value={profileData.sectorExpertise}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Limited Partners"
            name="limitedPartners"
            value={profileData.limitedPartners}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
        <TextField
          fullWidth
          label="Geo Preferences"
          name="geoPreferences"
          value={profileData.geoPreferences}
          onChange={handleChange}
          disabled={!isEditing}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Availability"
          name="availability"
          value={profileData.availability}
          onChange={handleChange}
          disabled={!isEditing}
          variant="outlined"
          margin="normal"
        />
        {/* <TextField
          fullWidth
          label="Profile Created At"
          value={new Date(profileData.createdAt).toLocaleDateString()}
          disabled
          variant="outlined"
          margin="normal"
        /> */}
      </div>

      <div className="flex justify-end mt-4">
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleSave} className="mr-2">
            Save Changes
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={handleEditToggle}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvestorProfile;
