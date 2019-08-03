import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';

const DrawerContent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={{ height: 200, backgroundColor: 'grey' }} />
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerContent;
