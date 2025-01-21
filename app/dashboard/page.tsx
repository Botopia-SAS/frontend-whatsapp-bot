'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    // Simulación de autenticación (reemplaza con lógica real si usas JWT o similar)
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push('/login'); // Redirige al login si no hay usuario autenticado
        } else {
            fetchQrCode(userId);
        }
    }, []);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

    // Función para obtener el QR del usuario
    const fetchQrCode = async (userId: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/whatsapp/${userId}/qr`);
            if (!res.ok) {
                const errorData = await res.json();
                setMessage(errorData.message || 'Error al obtener el código QR.');
                return;
            }
    
            const data = await res.json();
            console.log(data)
            if (data.qr) {
                setQrCode(data.qr); // Usa el string del QR directamente
            } else {
                setMessage(data.message || 'QR no disponible.');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setMessage('Error al conectar con el servidor.');
        }
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('userId'); // Elimina el userId almacenado
        router.push('/login'); // Redirige al login
    };

    const fetchStatus = async (userId: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/whatsapp/${userId}/status`);
            const data = await res.json();
            if (data.ready) {
                setMessage('Cliente listo. QR ya registrado.');
            } else {
                setMessage('QR aún no registrado.');
            }
        } catch (error) {
            console.error('Error al obtener el estado:', error);
            setMessage('Error al obtener el estado del cliente.');
        }
    };

    const logout = async (userId: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/whatsapp/${userId}/logout`, {
                method: 'POST',
            });
            if (res.ok) {
                setMessage('Sesión cerrada exitosamente.');
            } else {
                const errorData = await res.json();
                setMessage(errorData.message || 'Error al cerrar sesión.');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            setMessage('Error al conectar con el servidor.');
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white p-8">
            {/* Header */}
            <header className="w-full flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Tu Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 shadow-lg transition duration-300"
                >
                    Cerrar Sesión
                </button>
            </header>

            {/* QR Code Section */}
            <main className="flex flex-col items-center gap-8">
                <h2 className="text-2xl font-semibold">Escanea tu Código QR</h2>
                {qrCode ? (
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                                qrCode
                            )}&size=200x200`}
                            alt="QR Code"
                            className="w-48 h-48"
                        />
                    </div>
                ) : (
                    <p className="text-red-500">{message || 'Cargando QR...'}</p>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-12 text-center">
                <p className="text-sm">© 2025 Botopia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
