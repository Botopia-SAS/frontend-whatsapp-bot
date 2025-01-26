'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push('/login');
        } else {
            fetchQrCode(userId);
        }
    }, []);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchQrCode = async (userId: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/whatsapp/${userId}/qr`);
            if (!res.ok) {
                const errorData = await res.json();
                setMessage(errorData.message || 'Error al obtener el código QR.');
                return;
            }

            const data = await res.json();
            if (data.qr) {
                setQrCode(data.qr);
            } else {
                setMessage(data.message || 'QR no disponible.');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setMessage('Error al conectar con el servidor.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 via-purple-500 to-white dark:from-black dark:via-purple-900 dark:to-purple-800 text-black dark:text-white transition-colors duration-300">
            {/* Header */}
            <header className="w-full flex justify-between items-center px-6 py-4 bg-transparent text-white shadow-lg">
                <h1 className="text-3xl font-extrabold">Botopia Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition-transform transform hover:scale-105"
                >
                    Cerrar Sesión
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-purple-900 to-purple-600 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Escanea tu Código QR
                        </h2>
                        {qrCode ? (
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                                    qrCode
                                )}&size=200x200`}
                                alt="QR Code"
                                className="w-48 h-48"
                            />
                        ) : (
                            <p className="text-red-300">{message || 'Cargando QR...'}</p>
                        )}

                        {/* Call to Action */}
                        <div className="w-full p-8">
                            <div className="bg-black p-4 rounded-lg shadow-md text-center">
                                <h3 className="text-lg font-bold text-white">
                                    ¿Necesitas un Chat-Bot personalizado?
                                </h3>
                                <button
                                    className="animate-bounce m-8 px-6 py-2 text-base font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-lg transition-transform transform hover:scale-125"
                                    onClick={() => window.open('https://botopia.tech', '_blank')}
                                >
                                    Contáctanos Ahora
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Instructions Section */}
                    <div className="flex flex-col gap-6 bg-gradient-to-br from-purple-900 to-purple-600 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                            Instrucciones de Uso
                        </h2>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4">
                                <img
                                    src="/demo-chatbot-steps/step1.svg"
                                    alt="Paso 1"
                                    className="w-auto h-20 object-contain"
                                />
                                <p className="text-gray-300">
                                    Escanea el código QR generado para conectar tu WhatsApp.
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <img
                                    src="/demo-chatbot-steps/step2.svg"
                                    alt="Paso 2"
                                    className="w-auto h-20 object-contain"
                                />
                                <p className="text-gray-300">
                                    Pídele a un amigo que te escriba por WhatsApp para probar el bot.
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <img
                                    src="/demo-chatbot-steps/step3.svg"
                                    alt="Paso 3"
                                    className="w-auto h-20 object-contain"
                                />
                                <p className="text-gray-300">
                                    El bot responderá automáticamente a tus conversaciones y grupos.
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <img
                                    src="/demo-chatbot-steps/step4.svg"
                                    alt="Paso 4"
                                    className="w-auto h-20 object-contain"
                                />
                                <p className="text-gray-300">
                                    Contacta a Botopía Technology para que haga tu Chat-Bot personalizado.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-gradient-to-br from-purple-900 to-black py-4 text-center text-sm text-gray-400">
                ⚠️ Advertencia: Este bot responderá automáticamente a todas las conversaciones de WhatsApp, incluidos grupos. Configúralo con precaución.
                <p className="mt-2">© 2025 Botopia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
