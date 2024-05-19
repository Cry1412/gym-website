import React, { useEffect, useState } from 'react';

function Map({ address }) {
  // function Map() {
    const [map, setMap] = useState(null);
    

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
      // Clean up
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    //  const infowindow = new window.google.maps.InfoWindow();
    function createMarker(place) {
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


    
      // window.google.maps.event.addListener(marker, "click", () => {
      //   infowindow.setContent(place.name || "");
      //   infowindow.open(map);
      // });
    }
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
                console.log(results[i].name)
              }
              //map.setCenter(results[0].geometry.location);
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
    //const directionsService = new googleMaps.DirectionsService();
    const map = new googleMaps.Map(document.getElementById('map'), {
      center: { lat: 21.0221987, lng: 105.8172885 },
      // center: { address },
      zoom: 16,
      fullscreenControl: false,
      streetViewControl: false,
      mapId: "DEMO_MAP_ID",
    });
    setMap(map);
    // new window.markerClusterer.MarkerClusterer({ markers, map });
  };
  


  return (
    <div>
      <div id="map" style={{ height: '100vh' }}></div>
    </div>
  );
}

export default Map;
