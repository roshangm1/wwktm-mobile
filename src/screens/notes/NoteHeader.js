import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getTalkDetail } from '../../firebase/schedule';
import { Subheading } from 'react-native-paper';

const NoteHeader = ({ talkId }) => {
  const [talkTitle, setTalkTitle] = useState('Loading...');
  useEffect(() => {
    getTalkDetail(talkId).then(response => {
      setTalkTitle(response.title);
    });
  }, [talkId]);
  return (
    <View>
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 16 }}>
        <Subheading>{talkTitle}</Subheading>
      </View>
    </View>
  );
};

export default NoteHeader;
