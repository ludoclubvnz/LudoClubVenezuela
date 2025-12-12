"use client";

import { useEffect, useState } from 'react';
import socket from '../../socket'; // Adjust the import path if needed

export default function LobbyPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log('Connected to Socket.IO server!');
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('Disconnected from Socket.IO server.');
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="absolute top-4 right-4 text-sm">
            <p>Estado de la conexión: <span className={isConnected ? 'text-green-500' : 'text-red-500'}>{isConnected ? 'Conectado' : 'Desconectado'}</span></p>
        </div>
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Lobby</h1>
            <p className="text-gray-400 mb-8">Bienvenido al lobby. Aquí podrás ver las mesas de juego disponibles.</p>
        </div>

        {/* Placeholder for game rooms list */}
        <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Mesas de Juego</h2>
            <div className="space-y-4">
                {/* Example Room Item */}
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-md">
                    <div>
                        <p className="font-bold">Mesa #A4T2G</p>
                        <p className="text-sm text-gray-400">4 Jugadores | Entrada: 5 USD</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-500">3/4 Jugadores</span>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                            Unirse
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Observar
                        </button>
                    </div>
                </div>
                 <div className="flex items-center justify-between p-4 bg-gray-700 rounded-md opacity-50">
                    <div>
                        <p className="font-bold">Mesa #B9K8P</p>
                        <p className="text-sm text-gray-400">4 Jugadores | Entrada: 10 EUR</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-500">4/4 Jugadores</span>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md cursor-not-allowed">
                            Llena
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Observar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
