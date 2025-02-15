import React, { useState } from 'react';
import { TextField, MenuItem, Box, Button } from '@mui/material';
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
const Overview: React.FC = () => {
  // State to manage edit mode and form values
  const authState = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    foundingYear: '',
    websiteURL: '',
    country: '',
    city: '',
    businessType: '',
    productType: '',
    annualRevenue: '',
    mrr: '',
    companyStage: '',
    numberOfEmployees: '',
    linkedinURL: '',
    facebookURL: '',
    twitterURL: '',
  });

  // Handle change for text fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic, such as saving changes
    console.log('Form Submitted:', formValues);
    // Optionally, exit edit mode after saving changes
    setIsEditing(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Company Overview</h2>
        <Button className='button2'onClick={handleEditClick}>
          {isEditing ? 'Cancel Edit' : 'Edit'}
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          variant="outlined"
          name="title"
          value={formValues.title??authState.user?.companyName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Founding Year"
          fullWidth
          margin="normal"
          variant="outlined"
          name="foundingYear"
          value={formValues.foundingYear}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Website URL"
          fullWidth
          margin="normal"
          variant="outlined"
          name="websiteURL"
          value={formValues.websiteURL}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Country"
          select
          fullWidth
          margin="normal"
          variant="outlined"
          name="country"
          value={formValues.country}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <MenuItem value="Country1">Country1</MenuItem>
          <MenuItem value="Country2">Country2</MenuItem>
        </TextField>
        <TextField
          label="City"
          fullWidth
          margin="normal"
          variant="outlined"
          name="city"
          value={formValues.city}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Business Type"
          fullWidth
          margin="normal"
          variant="outlined"
          name="businessType"
          value={formValues.businessType}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Product Type"
          select
          fullWidth
          margin="normal"
          variant="outlined"
          name="productType"
          value={formValues.productType}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <MenuItem value="ProductType1">ProductType1</MenuItem>
          <MenuItem value="ProductType2">ProductType2</MenuItem>
        </TextField>
        <TextField
          label="Annual Revenue"
          fullWidth
          margin="normal"
          variant="outlined"
          name="annualRevenue"
          value={formValues.annualRevenue}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="MRR"
          fullWidth
          margin="normal"
          variant="outlined"
          name="mrr"
          value={formValues.mrr}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Company Stage"
          select
          fullWidth
          margin="normal"
          variant="outlined"
          name="companyStage"
          value={formValues.companyStage}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <MenuItem value="Stage1">Stage1</MenuItem>
          <MenuItem value="Stage2">Stage2</MenuItem>
        </TextField>
        <TextField
          label="Number of Employees"
          fullWidth
          margin="normal"
          variant="outlined"
          name="numberOfEmployees"
          value={formValues.numberOfEmployees}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="LinkedIn URL"
          fullWidth
          margin="normal"
          variant="outlined"
          name="linkedinURL"
          value={formValues.linkedinURL}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Facebook URL"
          fullWidth
          margin="normal"
          variant="outlined"
          name="facebookURL"
          value={formValues.facebookURL}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Twitter URL"
          fullWidth
          margin="normal"
          variant="outlined"
          name="twitterURL"
          value={formValues.twitterURL}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }} // Adds margin-top
          disabled={!isEditing} // Disable the button when not editing
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default Overview;
