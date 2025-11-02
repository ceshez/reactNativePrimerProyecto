import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { FeedbackMessage } from '../components/FeedbackMessage';
import { useAuthForm } from '../hooks/useAuthForm';
import { signUpWithEmail } from '../services/authService';

export function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useAuthForm({
    fullName: '',
    email: '',
    password: '',
  });
  const [feedback, setFeedback] = useState({ type: 'info', message: '' });

  async function submitForm() {
    try {
      setFeedback({ type: 'info', message: '' });
      const { email, password, fullName } = values;
      await signUpWithEmail(email, password, fullName);
      setFeedback({ type: 'success', message: 'Registro exitoso. Revisa tu correo para confirmar la cuenta.' });
      onRegisterSuccess();
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

      <FormInput
        label="Nombre completo"
        value={values.fullName}
        onChangeText={(text) => handleChange('fullName', text)}
        placeholder="Tu nombre"
        autoCapitalize="words"
        error={errors.fullName}
      />

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
        title="Registrarme"
        onPress={() => handleSubmit(submitForm)}
        loading={isSubmitting}
      />

      <FeedbackMessage type={feedback.type} message={feedback.message} />

      <Text style={styles.link} onPress={onNavigateToLogin}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
