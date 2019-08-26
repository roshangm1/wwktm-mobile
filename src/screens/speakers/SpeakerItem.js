import React from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple, Card, Avatar } from 'react-native-paper';
import Row from '../../components/Row';

const SpeakerItem = ({ item, onPress }) => (
  <TouchableRipple onPress={onPress}>
    <Card elevation={2}>
      <Card.Content>
        <Row>
          <Avatar.Image size={40} source={{ uri: item.profilePicture }} />
          <View style={{ marginLeft: 16 }}>
            <Text>{item.name}</Text>
            <Text>{item.country}</Text>
          </View>
        </Row>
      </Card.Content>
    </Card>
  </TouchableRipple>
);

export default SpeakerItem;
