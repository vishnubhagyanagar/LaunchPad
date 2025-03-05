"use client";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Documents from "./documents";
import Overview from "./overview";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

interface StartupProfileProps {
  startup: {
    companyName: string;
    description: string;
    websiteUrl: string;
    country: string;
    city: string;
    sector: string;
  };
}

const StartupProfile: React.FC<StartupProfileProps> = ({ startup }) => {
  const [type, setType] = useState<string>("Overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ ...startup });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const authState = useSelector((state: RootState) => state.auth);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved data:", profileData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  return (
    <div style={{ width: "100%", padding: "24px", backgroundColor: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Profile</h1>
        <Button variant="outlined" color="primary" onClick={handleEditToggle}>
          {isEditing ? "Save Changes" : "Edit"}
        </Button>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "24px" }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            border: "1px dashed grey",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "16px",
            marginRight: "24px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Drag & Drop
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or
          </Typography>
          <input
            type="file"
            id="upload-input"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button variant="contained" size="small" onClick={() => document.getElementById("upload-input")?.click()}>
            Upload
          </Button>
        </div>

        <div style={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={profileData.companyName ?? authState.user?.companyName}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={profileData.description ?? authState.user?.companyDescription}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
            multiline
            rows={2}
          />
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              fullWidth
              label="Website URL"
              name="websiteUrl"
              value={profileData.websiteUrl}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={profileData.country}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={profileData.city}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
            />
          </div>
          <TextField
            fullWidth
            label="Sector"
            name="sector"
            value={profileData.sector ?? authState.user?.industry}
            onChange={handleChange}
            disabled={!isEditing}
            variant="outlined"
            margin="normal"
          />
        </div>
      </div>

      <div style={{ borderBottom: "1px solid #e0e0e0", marginBottom: "24px" }}>
        <Button onClick={() => setType("Overview")} style={{ textTransform: "none", marginRight: "16px" }}>
          Overview
        </Button>
        <Button onClick={() => setType("Documents")} style={{ textTransform: "none", marginRight: "16px" }}>
          Documents
        </Button>
      </div>

      {type === "Documents" ? <Documents /> : <Overview />}
    </div>
  );
};

export default StartupProfile;
