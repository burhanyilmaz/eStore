import colors from '@theme/colors';
import { AlertTriangle } from 'lucide-react-native';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => (
  <View style={styles.errorContainer}>
    <AlertTriangle color={colors.error} size={48} />
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    margin: 16,
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
  },
});

export default ErrorMessage;
