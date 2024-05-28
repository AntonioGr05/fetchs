import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

// Crear un cliente
const queryClient = new QueryClient();

// Definir el tipo de usuario
interface User {
  id: number;
  name: string;
}

// Función para obtener datos de una API
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

// Componente que utiliza useQuery para obtener datos
const Users = () => {
  const { data, status } = useQuery<User[], Error>("users", fetchUsers);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :</p>;

  return (
    <div>
      {data?.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

// Componente principal de la aplicación
const App = () => (
  <QueryClientProvider client={queryClient}>
    <Users />
  </QueryClientProvider>
);

export default App;