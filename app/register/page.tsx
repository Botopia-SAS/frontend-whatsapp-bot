'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        linkedin: '',
        country: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage('Registro exitoso. Por favor, verifica tu correo.');
                setTimeout(() => router.push('/login'), 9000);
            } else {
                const errorData = await res.json();
                setMessage(errorData.errors ? errorData.errors[0].msg : 'Error en el registro.');
                setIsError(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al conectar con el servidor.');
            setIsError(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center bg-gradient-to-br from-purple-900 via-purple-700 to-white dark:from-black dark:via-purple-800 dark:to-purple-900">
            {/* Contenedor principal */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6">
                {/* Columna izquierda: Formulario */}
                <div className="bg-white dark:bg-black shadow-lg rounded-2xl p-10">
                    <h1 className="text-4xl font-bold text-black dark:text-white mb-6">Crear Cuenta</h1>
                    {message && (
                        <p
                            className={`text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'
                                }`}
                        >
                            {message}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Nombre"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Teléfono"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <input
                            type="text"
                            name="company"
                            placeholder="Empresa"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <input
                            type="url"
                            name="linkedin"
                            placeholder="Perfil de LinkedIn"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="País"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-400 hover:to-purple-600 transition-transform transform hover:scale-105"
                        >
                            Registrarse
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-300">¿Ya tienes una cuenta?</p>
                        <button
                            onClick={() => router.push('/login')}
                            className="text-purple-500 underline hover:text-purple-300"
                        >
                            Inicia sesión aquí
                        </button>
                    </div>
                </div>

                {/* Columna derecha: Video */}
                
                    {/* Columna derecha: GIF */}
                    <div className="flex items-center justify-center">
                        <img
                            src="/demo.gif"
                            alt="Animación de demostración"
                            className="w-96 max-w-lg rounded-2xl shadow-lg"
                        />
                    </div>
                
            </div>
        </div>
    );
}
