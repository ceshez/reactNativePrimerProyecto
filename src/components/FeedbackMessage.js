import { StyleSheet, Text } from 'react-native';

export function FeedbackMessage({ type = 'info', message }) {
  if (!message) return null;

  return <Text style={[styles.base, styles[type]]}>{message}</Text>;
}

const styles = StyleSheet.create({
  base: {
    marginVertical: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  info: {
    color: '#0d47a1',
  },
  success: {
    color: '#2e7d32',
  },
  error: {
    color: '#c62828',
  },
});
