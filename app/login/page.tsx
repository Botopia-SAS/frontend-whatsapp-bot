'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

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
                localStorage.setItem('userId', data.userId);
                router.push('/dashboard');
            } else {
                const errorData = await res.text();
                setMessage(errorData || 'Error al iniciar sesión.');
                setIsError(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al conectar con el servidor.');
            setIsError(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-transparent">
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6">
                {/* Columna izquierda: Formulario e Instrucciones */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-black shadow-lg rounded-2xl p-10">
                        <h1 className="text-4xl font-bold text-black dark:text-white mb-6 text-center">
                            Iniciar Sesión
                        </h1>
                        {message && (
                            <p
                                className={`text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'
                                    }`}
                            >
                                {message}
                            </p>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-400 hover:to-purple-600 transition-transform transform hover:scale-105"
                            >
                                Iniciar Sesión
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-300">¿No tienes una cuenta?</p>
                            <button
                                onClick={() => router.push('/register')}
                                className="text-purple-500 underline hover:text-purple-300"
                            >
                                Regístrate aquí
                            </button>
                        </div>
                    </div>

                    {/* Instrucciones debajo del formulario */}
                    <div className="bg-white dark:bg-black shadow-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4 text-center">
                            Instrucciones de Uso
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                            <li>👨‍💻 Inicia sesión o crea una cuenta.</li>
                            <li>📲 Después de iniciar sesión, verás un QR para escanear como si abrieras WhatsApp Web.</li>
                            <li>🤖 Escanea el QR y tu WhatsApp lo responderá un agente de IA.</li>

                        </ul>
                        <div className='text-gray-500 dark:text-gray-300 text-xs p-4'>
                            Para desvincular tu WhatsApp, simplemente cierra la sesión en tu celular.
                        </div>
                    </div>
                </div>

                {/* Columna derecha: GIF */}
                <div className="flex items-center justify-center">
                    <img
                        src="/demo.gif"
                        alt="Animación de demostración"
                        className="w-full max-w-lg rounded-2xl shadow-lg"
                    />
                </div>
            </div>

            {/* Mensaje de advertencia */}
            <div className="w-full text-yellow-500 text-center py-3">
                ⚠️ Advertencia: El bot responderá automáticamente a todas las conversaciones de WhatsApp y grupos vinculados. Asegura que no te genere problemas.
            </div>
        </div>
    );
}
