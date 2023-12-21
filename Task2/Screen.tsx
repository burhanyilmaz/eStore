import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native';

//components/core/Input.tsx
type InputProps = Pick<TextInputProps, 'onChangeText'> & Pick<TextInputProps, 'value'>;
const Input = (props: InputProps) => <TextInput {...props} />;

//components/core/Button.tsx
type ButtonProps = { onPress: () => void; title: string; disabled?: boolean };
const Button = ({ onPress, title, disabled }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={disabled ? styles.disabledButton : {}}>
    <Text style={styles.buttonTitle}>{title}</Text>
  </TouchableOpacity>
);

// from MainNavigator file
type NavigatorParams = {
  AnotherScreen: {
    name: string;
  };
};

// screens/Screen.tsx
const Screen = () => {
  const [name, setName] = useState('');
  const { navigate } = useNavigation<NavigationProp<NavigatorParams>>();

  const submitName = () => navigate('AnotherScreen', { name });

  const onChangeNameText = (value: string) => setName(value);

  return (
    <View style={styles.container}>
      <Input value={name} onChangeText={onChangeNameText} />
      <Button onPress={submitName} title="DONE" disabled={!!name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonTitle: {
    fontSize: 20,
    color: 'red',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default Screen;
