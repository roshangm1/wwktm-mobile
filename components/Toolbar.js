import React from 'react';
import { Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

const Toolbar = ({ title, icon, navigation, actions = null }) => {
  return (
    <Appbar.Header dark>
      <Appbar.Action
        icon={icon}
        onPress={icon === 'menu' ? navigation.openDrawer : navigation.goBack()}
      />
      <Appbar.Content title={title} />
      {actions}
    </Appbar.Header>
  );
};

export default withNavigation(Toolbar);
