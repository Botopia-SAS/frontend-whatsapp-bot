'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-green-200 text-white font-sans p-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Automatiza tus chats con Inteligencia Artificial
        </h1>
        <p className="text-lg sm:text-xl font-light">
          Conecta tu WhatsApp con nuestro bot inteligente y ahorra tiempo.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center gap-8 mt-8">
        <Image
          src="/astronauta.svg" // Reemplázalo con una ilustración atractiva
          alt="Chat illustration"
          width={400}
          height={400}
          priority
        />
        <div className="flex sm:flex-row gap-6 p-8">
          {/* Botón de Iniciar Sesión */}
          <button
            className="m-2 relative px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:translate-y-1"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Iniciar Sesión
          </button>

          {/* Botón de Registrarse */}
          <button
            className="m-2 relative px-8 py-4 bg-green-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 active:translate-y-1"
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Registrarse
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-sm">
          © 2025 Botopia. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
