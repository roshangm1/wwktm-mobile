import React from 'react';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import Colors from '../../configs/colors';

const About = ({ params }) => (
  <MainLayout title="About" icon="menu">
    <ScrollView style={{ paddingHorizontal: 16 }}>
      <Image
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
        style={{ height: 200, width: '100%' }}
      />
      <Text style={styles.textStyle}>
        In the lap of Himalayas, the Nepalese IT industry has been growing
        steadily since last decade without much limelight.
        <Text style={{ fontWeight: 'bold', color: Colors.secondary }}>
          The Nepali tech industry is mature with experienced developers,
          thriving tech-community and promising startups, and this organically
          developed industry has many inspiring stories to share with the world.
        </Text>
      </Text>

      <Text style={styles.textStyle}>
        Web Weekend aims to connect web technologists throughout the world. The
        glocal Nepali tech industry has supported a spectrum of business,
        ranging from local Nepali agri industry to global Hollywood movies
        industry.
      </Text>
      <Text style={styles.textStyle}>
        This conference provides the unique mix of story telling by global
        speakers for local and global audience for one day and another day of
        getting to know each-other while hiking and creating collective art. We
        want to create an ecosystem which encourages participation and then let
        the dynamics of the group to take over the direction.
      </Text>
    </ScrollView>
  </MainLayout>
);
const styles = StyleSheet.create({
  textStyle: { textAlign: 'justify', marginBottom: 8 },
});
export default About;
