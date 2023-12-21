import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native';

type Props = {} & TextInputProps;

const Input: React.FC<Props> = props => <TextInput {...props} />;

const Screen: React.FC = ({ navigation }) => {
  const [name, setName] = useState('');
  const submitName = () => {
    navigation.navigate('AnotherScreen', { name });
  };

  return (
    <View style={styles.container}>
      <Input value={name} onChangeText={text => setName(text)} />
      <TouchableOpacity onPress={() => submitName()}>
        <Text style={styles.title}>DONE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'red',
  },
});
