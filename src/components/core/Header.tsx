import { useNavigation } from '@react-navigation/native';
import { getHitSlop } from '@utils/helpers';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title?: string;
  showBackIcon?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
};

const Header = ({
  title,
  onPressLeft,
  onPressRight,
  showBackIcon,
  leftComponent,
  rightComponent,
  centerComponent,
}: Props) => {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: top + 8 }]}>
      <View style={styles.leftComponentContainer}>
        {showBackIcon && !leftComponent && (
          <TouchableOpacity onPress={goBack} hitSlop={getHitSlop({ value: 20 })}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
        )}
        {leftComponent && (
          <Pressable
            onPress={onPressLeft}
            style={styles.leftComponent}
            hitSlop={getHitSlop({ value: 25 })}>
            {leftComponent}
          </Pressable>
        )}
      </View>
      <View style={styles.centerComponentContainer}>
        {title && !centerComponent && <Text style={styles.title}>{title}</Text>}
      </View>
      {!!centerComponent && centerComponent}
      <View style={styles.rightComponentContainer}>
        {!!rightComponent && (
          <Pressable onPress={onPressRight} hitSlop={getHitSlop({ value: 20 })}>
            {rightComponent}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  leftComponentContainer: { flexDirection: 'row', zIndex: 20 },
  centerComponentContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  rightComponentContainer: { flexDirection: 'row', zIndex: 20 },
  title: { color: 'black', fontSize: 20, fontWeight: '500' },
  leftComponent: { zIndex: 20 },
});

export default Header;
