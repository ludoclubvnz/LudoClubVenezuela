import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-6">Bienvenido a Ludo Multiplayer</h1>
      <p className="text-lg text-gray-400 mb-8">Tu plataforma de Ludo (Parchisi) en línea.</p>
      <div className="space-x-4">
        <Link href="/login" className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Iniciar Sesión
        </Link>
        <Link href="/register" className="px-6 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
            Registrarse
        </Link>
      </div>
    </main>
  );
}
