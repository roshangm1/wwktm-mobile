import React from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple, Card, IconButton } from 'react-native-paper';

import { auth } from '../../firebase';
import { getTalkDateRange } from '../../utils/date';
import Colors from '../../configs/colors';

const ScheduleItem = ({
  session,
  navigation,
  onAddNotePress,
  onLikeSessionPress,
}) => {
  const user = auth().currentUser;

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('ScheduleDetail', { schedule: session })
      }
      style={{ padding: 4 }}
    >
      <Card>
        <Card.Content
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View style={{ flex: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>{session.title}</Text>
            <Text>{getTalkDateRange(session.startTime, session.endTime)}</Text>
          </View>
          {session.type === 'session' ? (
            <>
              <Text style={{ flex: 1 }} onPress={onAddNotePress}>
                Add note
              </Text>
              <IconButton
                color={Colors.primary}
                icon={
                  session.likedBy && session.likedBy.includes(user.uid)
                    ? 'star'
                    : 'star-outline'
                }
                onPress={onLikeSessionPress}
              />
            </>
          ) : null}
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

export default ScheduleItem;
