import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { FeedbackMessage } from '../components/FeedbackMessage';
import { useAuthForm } from '../hooks/useAuthForm';
import { signInWithEmail } from '../services/authService';

export function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useAuthForm({
    email: '',
    password: '',
  });
  const [feedback, setFeedback] = useState({ type: 'info', message: '' });

  async function submitForm() {
    try {
      setFeedback({ type: 'info', message: '' });
      const { email, password } = values;
      const { user } = await signInWithEmail(email, password);
      setFeedback({ type: 'success', message: 'Inicio de sesión correcto' });
      onLoginSuccess(user);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <FormInput
        label="Correo electrónico"
        value={values.email}
        onChangeText={(text) => handleChange('email', text)}
        placeholder="tu-correo@dominio.com"
        keyboardType="email-address"
        error={errors.email}
      />

      <FormInput
        label="Contraseña"
        value={values.password}
        onChangeText={(text) => handleChange('password', text)}
        placeholder="********"
        secureTextEntry
        error={errors.password}
      />

      <PrimaryButton
        title="Ingresar"
        onPress={() => handleSubmit(submitForm)}
        loading={isSubmitting}
      />

      <FeedbackMessage type={feedback.type} message={feedback.message} />

      <Text style={styles.link} onPress={onNavigateToRegister}>
        ¿No tienes cuenta? Regístrate aquí
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f3f6ff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#475569',
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    color: '#0077ff',
    textAlign: 'center',
  },
});
