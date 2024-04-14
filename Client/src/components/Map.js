import React, { useEffect, useState } from 'react';

function Map({ address }) {
  // function Map() {
    const [map, setMap] = useState(null);
    

  useEffect(() => {
    const loadScripts = async () => {
      const polyfillScript = document.createElement('script');
      polyfillScript.src = 'https://polyfill.io/v3/polyfill.min.js?features=default';
      document.head.appendChild(polyfillScript);

      const markerClustererScript = document.createElement('script');
      markerClustererScript.src = 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js';
      document.head.appendChild(markerClustererScript);

      const googleMapsApiScript = document.createElement('script');
      googleMapsApiScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBksaBNHIG1lfz9_rc7--1dj6VQ5UTkEYQ&loading=async&libraries=places&callback=initMap`;
      googleMapsApiScript.async = true;
      googleMapsApiScript.defer = true;
      document.head.appendChild(googleMapsApiScript);

      

      window.initMap = initMap;

      

      window.initMap = initMap;
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
            window.location.href = `/${placeName}`;
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
      center: { lat: 48.13641, lng: 11.57754 },
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

// const londonMarker = new googleMaps.Marker({
        //   position: { lat: 51.50136, lng: -0.14191 },
        //   map: map
        // });

        // londonMarker.addListener("click", () => {
        //   map.setCenter(londonMarker.getPosition());

        //   const infowindow = new googleMaps.InfoWindow({
        //     content: "<div><p>Hello!</p> </div>"
        //   });

        //   infowindow.open(map, londonMarker);
        // });

        // // Add other markers and listeners...
        // const italianMarker = new googleMaps.Marker({
        //   position: { lat: 41.88989, lng: 12.49337 },
        //   map: map
        // });
        
        // italianMarker.addListener("click", () => {
        //   map.setCenter(italianMarker.getPosition());
        
        //   const infowindow = new googleMaps.InfoWindow({
        //     content: "<div><p>Ciao!</p> </div>"
        //   });
        
        //   infowindow.open(map, italianMarker);
        // });
        
        // const netherlandsMarker = new googleMaps.Marker({
        //   position: { lat: 52.2277, lng: 6.89701 },
        //   map: map
        // });
        
        // netherlandsMarker.addListener("click", () => {
        //   map.setCenter(netherlandsMarker.getPosition());
        
        //   const infowindow = new googleMaps.InfoWindow({
        //     content: "<div><p>Hallo!</p></div>"
        //   });
        
        //   infowindow.open(map, netherlandsMarker);
        // });
        
        
        // // Directions rendering...
        // directionsService.route({
        //   origin: { lat: 52.51628, lng: 13.3777 },
        //   destination: { lat: 48.85824, lng: 2.2945 },
        //   travelMode: googleMaps.DirectionsTravelMode.DRIVING
        // }, (result, status) => {
        //   if (status === 'OK') {
        //     const directionsRenderer = new googleMaps.DirectionsRenderer({
        //       suppressMarkers: true
        //     });
        //     directionsRenderer.setDirections(result);
        //     const leg = result.routes[0].legs[0];
        
        //     // Add markers for the route
        //     new googleMaps.Marker({
        //       position: leg.start_location,
        //       map: map
        //     });
        
        //     new googleMaps.Marker({
        //       position: leg.end_location,
        //       map: map
        //     });
        //   } else {
        //     window.alert('Directions request failed due to ' + status);
        //   }
        // });
        // // Directions rendering...
        // directionsService.route({
        //   origin: { lat: 52.51628, lng: 13.3777 },
        //   destination: { lat: 48.85824, lng: 2.2945 },
        //   travelMode: googleMaps.DirectionsTravelMode.DRIVING
        // }, (result, status) => {
        //   if (status === 'OK') {
        //     const directionsRenderer = new googleMaps.DirectionsRenderer({
        //       suppressMarkers: true
        //     });
        //     directionsRenderer.setDirections(result);
        //     const leg = result.routes[0].legs[0];
        //     new googleMaps.Marker({
        //       position: { lat: 52.51628, lng: 13.3777 },
        //       map: map
        //     });
        //     new googleMaps.Marker({
        //       position: { lat: 48.85824, lng: 2.2945 },
        //       map: map
        //     });
        //   } else {
        //     window.alert('Directions request failed due to ' + status);
        //   }
        // });

        // const locations = [
        //   { lat: 48.18485, lng: 16.31224 },
        //   { lat: 48.20871, lng: 16.37265 },
        //   { lat: 48.20681, lng: 16.36683 }
        // ];

        // const markers = locations.map((position, i) => {
        //   return new googleMaps.Marker({ position });
        // });
