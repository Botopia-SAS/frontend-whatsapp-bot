'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar el hook useRouter

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); // Estado para indicar si el mensaje es de error
    const router = useRouter(); // Instancia del hook para manejar navegación

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setIsError(false); // Reinicia el estado de error

        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessage('Inicio de sesión exitoso.');
                console.log('User ID:', data.userId);

                // Almacenar el userId (puedes usar localStorage, cookies, etc.)
                localStorage.setItem('userId', data.userId);

                // Redirigir al dashboard
                router.push('/dashboard');
            } else {
                const errorData = await res.text();
                setMessage(errorData || 'Error al iniciar sesión.');
                setIsError(true); // Marca el mensaje como error
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al conectar con el servidor.');
            setIsError(true); // Marca el mensaje como error
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
            {message && (
                <p className={`mb-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}
