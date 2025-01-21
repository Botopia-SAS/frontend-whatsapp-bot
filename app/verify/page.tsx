'use client';
import { useEffect, useState } from 'react';

export default function Verify() {
    const [message, setMessage] = useState('Verificando...');

    useEffect(() => {
        const verifyEmail = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (!token) {
                setMessage('Token de verificación no proporcionado.');
                return;
            }

            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

            try {
                const res = await fetch(`${API_BASE_URL}/auth/verify?token=${token}`);

                if (res.ok) {
                    setMessage('Tu cuenta ha sido verificada exitosamente.');
                } else {
                    const errorData = await res.json();
                    setMessage(errorData.message || 'Error al verificar tu cuenta.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('Error al conectar con el servidor.');
            }
        };

        verifyEmail();
    }, []);

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">{message}</h1>
        </div>
    );
}
