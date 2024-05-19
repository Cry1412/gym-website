import React, { useEffect, useState, useRef } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function GoogleMap() {
  const [addressTemp, setAddressTemp] = useState("");
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadScripts = async () => {
      if (!window.google) {
        const polyfillScript = document.createElement('script');
        polyfillScript.src = 'https://polyfill.io/v3/polyfill.min.js?features=default';
        document.head.appendChild(polyfillScript);

        const markerClustererScript = document.createElement('script');
        markerClustererScript.src = 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js';
        document.head.appendChild(markerClustererScript);

        const googleMapsApiScript = document.createElement('script');
        googleMapsApiScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD04tA6vhD43ywZgiG7FiisEKWuSXwDJiQ&loading=async&libraries=places&callback=initMap`;
        googleMapsApiScript.async = true;
        googleMapsApiScript.defer = true;
        document.head.appendChild(googleMapsApiScript);

        window.initMap = initMap;
      } else {
        initMap();
      }
    };

    loadScripts();

    return () => {
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    if (address && map) {
      const geocoder = new window.google.maps.Geocoder();
      const service = new window.google.maps.places.PlacesService(map);
      const marker = new window.google.maps.Marker({
        map,
      });
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          map.setCenter(location);
          marker.setPosition(location);
          marker.setMap(location);
          marker.setIcon("http://maps.gstatic.com/mapfiles/ms2/micons/red-pushpin.png")
          const request = {
            location: location,
            radius: '500',
            type: 'gym'
          }
          service.nearbySearch(request, function(results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
            }
          });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
  }, [address, map]);

  const initMap = async () => {
    const googleMaps = await window.google.maps;
    const map = new googleMaps.Map(document.getElementById('map'), {
      center: { lat: 21.0221987, lng: 105.8172885 },
      zoom: 16,
      fullscreenControl: false,
      streetViewControl: false,
      mapId: "DEMO_MAP_ID",
    });
    setMap(map);
  };

  const handleAddressChange = (event) => {
    setAddressTemp(event.target.value);
  };

  const handleSubmit = () => {
    setAddress(addressTemp);
  };

  const createMarker = (place) => {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new window.google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: `<div><button class='info-window-click-here' data-place-name="${place.name}">${place.name}</button></div>`,
      ariaLabel: "Uluu",
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });

    infowindow.addListener('domready', () => {
      const clickHereButtons = document.querySelectorAll('.info-window-click-here');
      clickHereButtons.forEach(button => {
        button.addEventListener('click', () => {
          const placeName = button.getAttribute('data-place-name');
          // Chuyển hướng đến /place-name
          window.location.href = `/gyms/${placeName}`;
        });
      });
    });
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
            inputRef={inputRef}
          />
        </Box>
        <Box marginLeft={1} marginTop={5} marginBottom={5}>
          <Button variant="contained" onClick={handleSubmit}>Tìm kiếm</Button>
        </Box>
      </Box>
      <div id="map" style={{ height: 'calc(100vh - 104px)' }}></div>
    </div>
  );
}

export default GoogleMap;
