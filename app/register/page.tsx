'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook para redirigir al usuario

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
    const [isError, setIsError] = useState(false); // Indica si el mensaje es de error
    const router = useRouter(); // Hook para redirigir al usuario

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
        setIsError(false); // Reinicia el estado de error

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
                setTimeout(() => {
                    router.push('/login'); // Redirige a la página de inicio de sesión
                }, 3000); // Muestra el mensaje durante 3 segundos
            } else {
                const errorData = await res.json();
                setMessage(errorData.errors ? errorData.errors[0].msg : 'Error en el registro.');
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
            <h1 className="text-2xl font-bold mb-4">Registro</h1>
            {message && (
                <p
                    className={`mb-4 ${
                        isError ? 'text-red-500' : 'text-green-500'
                    }`}
                >
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Empresa"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="url"
                    name="linkedin"
                    placeholder="Perfil de LinkedIn"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="País"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Registrarse
                </button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-sm">¿Ya tienes una cuenta?</p>
                <button
                    onClick={() => router.push('/login')} // Redirige a la página de inicio de sesión
                    className="mt-2 text-blue-500 underline hover:text-blue-600"
                >
                    Inicia sesión aquí
                </button>
            </div>
        </div>
    );
}
