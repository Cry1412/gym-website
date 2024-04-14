import React, { useState } from "react";
import Map from "../components/Map";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function TestMap() {
  const [addressTemp, setAddressTemp] = useState("");
  const [address, setAddress] = useState("");

  const handleAddressChange = (event) => {
    setAddressTemp(event.target.value);
  };

  const handleSubmit = () => {
    console.log(addressTemp)
    setAddress(addressTemp)
    console.log("Địa chỉ đã nhập:", address);
  };

  return (
    <div className="App">
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box width="50%" marginTop={5} marginBottom={5}>
        <TextField
          label="Địa chỉ"
          variant="outlined"
          value={addressTemp}
          onChange={handleAddressChange}
          fullWidth
        />
      </Box>
      <Box marginLeft={1} marginTop={5} marginBottom={5}>
        <Button variant="contained" onClick={handleSubmit}>Tìm kiếm</Button>
      </Box>
    </Box>
    <Map address={address}/>
    {/* <Map/> */}
    </div>
    
  );
}

export default TestMap;

{/* <style>
        {`
    .map-h2 {
      text-transform: uppercase;
      font-size: 1rem;
      padding: 20px;
      padding-left: 10px;
      text-align: center;
    }
    
    .google-map {
      width: 100%;
      height: 60vh;
    }
    
    .pin {
      display: flex;
      align-items: center;
      width: 180px;
      color: var(--main-blue);
    }
    
    .pin:hover {
      cursor: pointer;
    }
    
    .pin-icon {
      font-size: 4rem !important;
    }
    
    .pin-text {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
      padding: 10px;
      font-size: 1.3em;
      color: var(--main-blue);
    }
    
    @media screen and (min-width: 799px) {
      .google-map {
        height: 80vh;
      }
    
      .map-h2 {
        font-size: 1.3rem;
        font-weight: 400;
      }
    
      .pin {
        width: 15vw;
      }
    
      .pin-icon {
        font-size: 10vw;
      }
    }
  `
        }
        </style> */}