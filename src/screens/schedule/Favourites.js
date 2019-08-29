import React, { useState } from 'react';
import { Text, FlatList } from 'react-native';
import MainLayout from '../../layouts/MainLayout';

const Favourites = ({ params }) => {
  const [favourites, setFavourites] = useState([]);

  const renderItem = ({ item }) => {
    <Text>Favourite item</Text>;
  };

  return (
    <MainLayout title="Favourite Talks">
      <FlatList
        data={favourites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </MainLayout>
  );
};

export default Favourites;
