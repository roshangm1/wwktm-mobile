import React, { useState, useEffect } from 'react';

import MainLayout from '../../layouts/MainLayout';
import { getFavouriteSessions } from '../../firebase/schedule';
import Spinner from '../../components/Spinner';
import SchdeuleList from './ScheduleList';
import EmptyComponent from './../../components/EmptyComponent';

const Favourites = ({ navigation }) => {
  const [favourites, setFavourites] = useState(null);

  const updateFavouriteSessions = response => {
    setFavourites(response);
  };

  useEffect(() => {
    getFavouriteSessions(updateFavouriteSessions);
  }, []);

  if (!favourites) {
    return (
      <MainLayout title="Favourite Talks">
        <Spinner />
      </MainLayout>
    );
  }
  if (favourites.length === 0) {
    return <EmptyComponent />;
  }
  return (
    <MainLayout title="Favourite Talks">
      <SchdeuleList data={favourites} navigation={navigation} />
    </MainLayout>
  );
};

export default Favourites;
