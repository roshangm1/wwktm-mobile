import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import Row from '../../components/Row';
import Colors from '../../configs/colors';
import { getPostTime } from '../../utils/date';
import { getNameInitials } from './../../utils/string';

const CommentItem = ({ comment }) => {
  const { profileImageUrl, content, name, date } = comment;
  return (
    <View style={styles.rootContainer}>
      <Row>
        {profileImageUrl ? (
          <Avatar.Image
            size={36}
            source={{
              uri: profileImageUrl,
            }}
          />
        ) : (
          <Avatar.Text
            size={36}
            color={Colors.white}
            label={getNameInitials(name)}
          />
        )}
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Text>{name}</Text>
            <Text style={styles.dateText}>{getPostTime(date)}</Text>
          </Row>
          <Text style={styles.descriptionText}>{content}</Text>
        </View>
      </Row>

      <Divider style={{ marginTop: 8 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    borderColor: '#808080',
    marginTop: 8,
  },
  dateText: {
    color: '#808080',
  },
  descriptionText: {},
});

export default CommentItem;
