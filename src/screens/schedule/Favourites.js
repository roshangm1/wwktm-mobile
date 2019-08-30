import React, { useState, useEffect } from 'react';

import MainLayout from '../../layouts/MainLayout';
import { getFavouriteSessions } from '../../firebase/schedule';
import { DayZeroRoute as FavouriteSchedule } from './Schedule';

const Favourites = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);

  const updateFavouriteSessions = response => {
    setFavourites(response);
  };
  useEffect(() => {
    getFavouriteSessions(updateFavouriteSessions);
  }, []);

  return (
    <MainLayout title="Favourite Talks">
      <FavouriteSchedule data={favourites} navigation={navigation} />
    </MainLayout>
  );
};

export default Favourites;
