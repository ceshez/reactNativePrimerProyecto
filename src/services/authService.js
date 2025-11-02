import { supabase } from './supabaseClient';

export async function signInWithEmail(email, password) {
  if (!email || !password) {
    throw new Error('Debes ingresar un correo y una contraseña.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUpWithEmail(email, password, fullName) {
  if (!email || !password || !fullName) {
    throw new Error('Completa todos los campos.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchSampleTasks() {
  const { data, error } = await supabase.from('tasks').select('*').limit(10);

  if (error) {
    console.warn('No se pudieron obtener tareas desde Supabase, se mostrará contenido local.');
    return [
      { id: '1', title: 'Explorar la app', completed: false },
      { id: '2', title: 'Revisar la lista de pendientes', completed: true },
      { id: '3', title: 'Crear un nuevo registro', completed: false },
    ];
  }

  return data?.map((task) => ({
    id: task.id?.toString() ?? Math.random().toString(),
    title: task.title ?? 'Sin título',
    completed: Boolean(task.completed),
  })) ?? [];
}
