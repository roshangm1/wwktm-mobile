import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../configs/colors';
import { getMapData } from '../../firebase/map';

const Map = ({ params }) => {
  const [markers, setMarkers] = useState([]);
  const [paddingTop, setPaddingTop] = useState(1);

  const onMapReady = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    setPaddingTop(0);
  };
  useEffect(() => {
    getMapData(mapData => {
      setMarkers(mapData);
    });
  }, []);

  return (
    <MainLayout title="Map">
      <View style={{ flex: 1, paddingTop: paddingTop }}>
        <MapView
          style={{ flex: 1 }}
          showsUserLocation
          showsMyLocationButton
          onMapReady={onMapReady}
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
      </View>
    </MainLayout>
  );
};

export default Map;
