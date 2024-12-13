/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Button, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  className?: string;
  setStartLocationName: (value: string) => void;
  setEndLocationName: (value: string) => void;
  startPoint: google.maps.LatLngLiteral | null;
  endPoint: google.maps.LatLngLiteral | null;
  setStartPoint: (value: google.maps.LatLngLiteral | null) => void;
  setEndPoint: (value: google.maps.LatLngLiteral | null) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '20px',
};

const center = {
  lat: 41.311081,
  lng: 69.240562,
};

export const MapContent: React.FC<Props> = ({
  startPoint,
  endPoint,
  setStartPoint,
  setEndPoint,
  setStartLocationName,
  setEndLocationName,
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [mapKey, setMapKey] = useState(1);

  const API_KEY = 'AIzaSyA0uyKXghT3P9scsghb_9lOErLudw1lnPQ';

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  // React.useEffect(() => {
  //   form.setFieldsValue({
  //     startLine: startPoint ? `${startPoint.lat}, ${startPoint.lng}` : '',
  //     endLine: endPoint ? `${endPoint.lat}, ${endPoint.lng}` : '',
  //   });
  // }, [startPoint, endPoint]);

  useEffect(() => {
    if (isLoaded) {
      setGeocoder(new google.maps.Geocoder());
    }
  }, [isLoaded]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const latLng = {
        lat: parseFloat(event.latLng.lat().toFixed(6)),
        lng: parseFloat(event.latLng.lng().toFixed(6)),
      };
      if (!startPoint) {
        setStartPoint(latLng);
        getLocationName(latLng, 'start');
      } else if (!endPoint) {
        setEndPoint(latLng);
        getLocationName(latLng, 'end');
      }
    }
  };

  const resetPoints = () => {
    setStartPoint(null);
    setEndPoint(null);
    setDirections(null);
    setStartLocationName('');
    setEndLocationName('');
    setMapKey((prevKey) => prevKey + 1);
  };

  const getLocationName = (
    latLng: google.maps.LatLngLiteral,
    type: 'start' | 'end',
  ) => {
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const locationName = results[0].formatted_address;
        if (type === 'start') {
          setStartLocationName(locationName);
        } else {
          setEndLocationName(locationName);
        }
      }
    });
  };

  const handleStartDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setStartPoint({
        lat: parseFloat(event.latLng.lat().toFixed(6)),
        lng: parseFloat(event.latLng.lng().toFixed(6)),
      });
      getLocationName(
        { lat: event.latLng.lat(), lng: event.latLng.lng() },
        'start',
      );
      setDirections(null);
    }
  };

  const handleEndDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setEndPoint({
        lat: parseFloat(event.latLng.lat().toFixed(6)),
        lng: parseFloat(event.latLng.lng().toFixed(6)),
      });
      getLocationName(
        { lat: event.latLng.lat(), lng: event.latLng.lng() },
        'end',
      );
      setDirections(null);
    }
  };

  const calculateRoute = useCallback(() => {
    if (startPoint && endPoint) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        },
      );
    }
  }, [startPoint, endPoint]);

  useEffect(() => {
    calculateRoute();
  }, [startPoint, endPoint, calculateRoute]);

  const handleStartLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: value }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const latLng = results[0].geometry.location;
          setStartPoint({
            lat: latLng.lat(),
            lng: latLng.lng(),
          });
        } else {
          console.error(
            'Geocode was not successful for the following reason: ' + status,
          );
        }
      });
    }
  };

  const handleEndLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: value }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const latLng = results[0].geometry.location;
          setEndPoint({
            lat: latLng.lat(),
            lng: latLng.lng(),
          });
        } else {
          console.error(
            'Geocode was not successful for the following reason: ' + status,
          );
        }
      });
    }
  };

  const handleStartPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startPoint) {
      const lat = parseFloat(e.target.value.split(',')[0]);
      const lng = parseFloat(e.target.value.split(',')[1]);

      if (!isNaN(lat) && !isNaN(lng)) {
        setStartPoint({
          lat: parseFloat(lat.toFixed(6)),
          lng: parseFloat(lng.toFixed(6)),
        });
      }
    }
  };

  const handleEndPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (endPoint) {
      const lat = parseFloat(e.target.value.split(',')[0]);
      const lng = parseFloat(e.target.value.split(',')[1]);

      if (!isNaN(lat) && !isNaN(lng)) {
        setEndPoint({
          lat: parseFloat(lat.toFixed(6)),
          lng: parseFloat(lng.toFixed(6)),
        });
      }
    }
  };
  useEffect(() => {
    return () => {
      const script = document.querySelector(
        `script[src="https://maps.googleapis.com/maps/api/js?key=${API_KEY}"]`,
      );
      if (script) script.remove();
    };
  }, [API_KEY]);

  if (loadError) return <div>Ошибка загрузки карт</div>;
  if (!isLoaded) return <div>Загрузка карт...</div>;

  return (
    <>
      <GoogleMap
        key={mapKey}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleMapClick}
      >
        {startPoint && (
          <Marker
            position={startPoint}
            label="Start"
            draggable
            onDragEnd={handleStartDragEnd}
          />
        )}
        {endPoint && (
          <Marker
            position={endPoint}
            label="End"
            draggable
            onDragEnd={handleEndDragEnd}
          />
        )}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 4,
              },
            }}
          />
        )}
      </GoogleMap>

      <div className=" mt-20">
        <Button onClick={resetPoints}>Сброс линии</Button>
        <div className="mt-10">
          <div className="location-inputs">
            <div>
              <label htmlFor="start-location">Start Location:</label>
              <Input
                id="start-location"
                type="text"
                name="start-location"
                value={startPoint ? `${startPoint.lat}, ${startPoint.lng}` : ''}
                onChange={handleStartPointChange}
                placeholder="Enter start location"
              />
            </div>
            <div>
              <label htmlFor="end-location">End Location:</label>
              <Input
                id="end-location"
                type="text"
                name="end-location"
                value={endPoint ? `${endPoint.lat}, ${endPoint.lng}` : ''}
                onChange={handleEndPointChange}
                placeholder="Enter end location"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
