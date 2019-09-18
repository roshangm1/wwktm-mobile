import React from 'react';
import { View, StatusBar } from 'react-native';
import { AppContainer } from './src/routes';
// import ComponentTest from './src/ComponentTest';
import Colors from './src/configs/colors';

const App = () => {
  // console.disableYellowBox = true;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.primaryDark}
        barStyle="light-content"
      />
      <AppContainer />
    </View>
  );
  // return <ComponentTest />;
};

export default App;
