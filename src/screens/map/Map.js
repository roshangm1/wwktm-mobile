import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../configs/colors';
const markerData = [
  {
    latlng: { latitude: 27.6946587, longitude: 85.3087533 },
    title: 'Bougainvilla Events, Kathmandu',
    description: 'Main Venue',
    type: 'venue',
  },
  {
    latlng: { latitude: 27.712059, longitude: 85.3247643 },
    title: 'Hotel Kaze Darbar',
    description: 'Hotel for the speakers',
    type: 'hotel',
  },
];
const Map = ({ params }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(markerData);
  }, []);
  return (
    <MainLayout title="Map">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 27.6946587,
          longitude: 85.3087533,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.title}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
            <Icon
              name={
                marker.type === 'hotel'
                  ? 'home-map-marker'
                  : marker.type === 'venue'
                  ? 'map-marker-circle'
                  : 'map-marker-radius'
              }
              size={36}
              color={Colors.secondary}
            />
          </Marker>
        ))}
      </MapView>
    </MainLayout>
  );
};

export default Map;
