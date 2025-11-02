import { useState } from 'react';

export function useAuthForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors = {};

    if ('email' in values) {
      if (!values.email) {
        newErrors.email = 'El correo es obligatorio';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        newErrors.email = 'Correo inválido';
      }
    }

    if ('password' in values) {
      if (!values.password) {
        newErrors.password = 'La contraseña es obligatoria';
      } else if (values.password.length < 6) {
        newErrors.password = 'Debe tener al menos 6 caracteres';
      }
    }

    if ('fullName' in values && !values.fullName) {
      newErrors.fullName = 'Ingresa tu nombre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(onSubmit) {
    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
