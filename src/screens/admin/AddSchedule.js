import { View, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, { useState, useEffect } from 'react';
import SpeakerPicker from 'react-native-picker-select';
import { TextInput, Button, Headline } from 'react-native-paper';

import Container from '../../components/Container';
import { addNewSchedule } from '../../firebase/schedule';
import { getAllSpeakers } from '../../firebase/speakers';

const AddSchedule = ({}) => {
  const [schedule, setSchedule] = useState({
    startTime: new Date('2019/09/21'),
    endTime: new Date('2019/09/21'),
    title: '',
    shortDescription: '',
    longDescription: '',
    speaker: '',
    speakerId: '',
    type: 'none',
  });
  const [speakers, setSpeakers] = useState([]);

  const handleInputChange = (name, text) => {
    setSchedule({ ...schedule, [name]: text });
  };

  const addSchedule = () => {
    console.log(schedule);

    addNewSchedule(schedule);
  };

  useEffect(() => {
    getAllSpeakers().then(response => {
      const speakersData = response.map(item => {
        return {
          value: { id: item.id, name: item.name },
          label: item.name,
        };
      });
      setSpeakers(speakersData);
    });
  }, []);
  return (
    <Container>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <TextInput
            label="Session topic"
            mode="outlined"
            autoCapitalize={false}
            style={{ marginVertical: 8 }}
            onChangeText={text => handleInputChange('title', text)}
          />

          <Headline>Start Time</Headline>
          <DatePicker
            date={schedule.startTime}
            onDateChange={dateData => {
              handleInputChange('startTime', dateData);
            }}
          />
          <Headline>End Time</Headline>
          <DatePicker
            date={schedule.endTime}
            onDateChange={dateData => {
              handleInputChange('endTime', dateData);
            }}
          />

          <TextInput
            label="Short Description"
            mode="outlined"
            autoCapitalize={false}
            style={{ marginVertical: 8 }}
            onChangeText={text => handleInputChange('shortDescription', text)}
          />
          <TextInput
            label="Long Description"
            mode="outlined"
            autoCapitalize={false}
            style={{ marginVertical: 8 }}
            onChangeText={text => handleInputChange('longDescription', text)}
          />
          <Headline>Select Speaker</Headline>
          <SpeakerPicker
            onValueChange={value => {
              if (value) {
                console.log(value);
                handleInputChange('speaker', value.name);
                handleInputChange('speakerId', value.id.trim());
              }
            }}
            items={speakers}
          />
          <TextInput
            label="Type"
            mode="outlined"
            autoCapitalize={false}
            style={{ marginVertical: 8 }}
            onChangeText={text => handleInputChange('type', text)}
          />
          <Button onPress={addSchedule} mode="contained">
            Add Schedule
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddSchedule;
