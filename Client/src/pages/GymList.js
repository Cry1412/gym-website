import React, { useState, useEffect } from 'react';
import { Grid, Box, Pagination, Typography, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const itemsPerPage = 9;

function GymBox({ gym }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gyms/${gym.Name}`);
  };

  return (
    <Grid item xs={4} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Box textAlign="center">
        <img src={gym.Image} alt={gym.Name} style={{ maxWidth: '100%', height: 'auto' }} />
        <Typography variant="h6">{gym.Name}</Typography>
        <Typography variant="body2">{gym.Address}</Typography>
      </Box>
    </Grid>
  );
}

function GymList() {
  const [gymData, setGymData] = useState([]);
  const [page, setPage] = useState(1);
  const [filterService, setFilterService] = useState('All');
  const [filteredGyms, setFilteredGyms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:2000/gym')
      .then(response => response.json())
      .then(data => {
        setGymData(data);
        setFilteredGyms(data);
      })
      .catch(error => console.error('Error fetching gym data:', error));
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    setFilterService(event.target.value);
    filterGyms(event.target.value);
  };

  const filterGyms = (service) => {
    if (service === 'All') {
      setFilteredGyms(gymData);
    } else {
      const filtered = gymData.filter(gym => gym.Services.includes(service));
      setFilteredGyms(filtered);
    }
    setPage(1);
  };

  const handleSearchByLocation = () => {
    navigate('/testmap');
  };

  const numPages = Math.ceil(filteredGyms.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const gymsOnPage = filteredGyms.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box mx={4} my={2}>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Select
          value={filterService}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Gym">Gym</MenuItem>
          <MenuItem value="Boxing">Boxing</MenuItem>
          <MenuItem value="Yoga">Yoga</MenuItem>
          <MenuItem value="Swimming Pool">Swimming Pool</MenuItem>
          <MenuItem value="Zumba">Zumba</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleSearchByLocation}>
          Search by location
        </Button>
      </Box>
      <Grid container spacing={3}>
        {gymsOnPage.map((gym, index) => (
          <GymBox key={index} gym={gym} />
        ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={numPages} page={page} onChange={handleChangePage} />
      </Box>
    </Box>
  );
}

export default GymList;
