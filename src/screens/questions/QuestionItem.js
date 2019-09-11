import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { auth } from '../../firebase';
import Row from '../../components/Row';
import { Avatar, Chip, Divider } from 'react-native-paper';
import Colors from '../../configs/colors';
import { getNameInitials } from '../../utils/string';
import { getNotesTime } from '../../utils/date';
import { upvoteAQuestion } from '../../firebase/question';

const QuestionItem = ({ item }) => {
  const user = auth().currentUser;
  const isUpvoted = item.voters.includes(user.uid);

  return (
    <View style={styles.rootContainer}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          {item.imageUrl && !item.anonymous ? (
            <Avatar.Image
              size={36}
              source={{
                uri: item.imageUrl,
              }}
            />
          ) : (
            <Avatar.Text
              size={36}
              color={Colors.white}
              label={getNameInitials(item.name)}
            />
          )}

          <View style={{ paddingHorizontal: 8 }}>
            <Text>{item.name}</Text>
            <Text style={styles.dateText}>{getNotesTime(item.date)}</Text>
          </View>
        </Row>
        <Chip
          icon="thumb-up"
          mode="outlined"
          selectedColor={Colors.secondary}
          selected={isUpvoted}
          onPress={() => upvoteAQuestion(item)}
        >
          {item.voters.length || 0}
        </Chip>
      </Row>
      <Text style={styles.descriptionText}>{item.question}</Text>
      <Divider style={{ marginTop: 8, height: 0.5 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderColor: '#808080',
  },
  dateText: {
    color: '#808080',
    fontSize: 11,
    marginTop: 4,
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default QuestionItem;
