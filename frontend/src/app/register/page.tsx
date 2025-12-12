"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    venezuelanId: '',
    phoneNumber: '',
    stateOfResidence: '',
    dateOfBirth: '',
    nickname: '',
    password: '',
    pin: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/auth/register`, formData);
      router.push('/login');
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = Array.isArray(err.response.data.errors)
          ? err.response.data.errors.map((e: any) => e.msg).join(', ')
          : err.response.data.message || 'An unexpected error occurred.';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Crear Cuenta</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">Nombre Completo</label>
            <input id="fullName" name="fullName" type="text" required onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Correo Electrónico</label>
            <input id="email" name="email" type="email" required onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="venezuelanId" className="block text-sm font-medium">Cédula Venezolana</label>
            <input id="venezuelanId" name="venezuelanId" type="text" required onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">Número de Teléfono</label>
            <input id="phoneNumber" name="phoneNumber" type="tel" required onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="stateOfResidence" className="block text-sm font-medium">Estado de Residencia</label>
            <input id="stateOfResidence" name="stateOfResidence" type="text" required onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium">Fecha de Nacimiento</label>
            <input id="dateOfBirth" name="dateOfBirth" type="date" required onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium">Apodo (Nickname)</label>
            <input id="nickname" name="nickname" type="text" required onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Contraseña (6 dígitos numéricos)</label>
            <input id="password" name="password" type="password" required pattern="\d{6}" title="La contraseña debe ser de 6 dígitos numéricos." onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="pin" className="block text-sm font-medium">PIN (4 dígitos numéricos)</label>
            <input id="pin" name="pin" type="password" required pattern="\d{4}" title="El PIN debe ser de 4 dígitos numéricos." onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
         <p className="text-sm text-center text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="font-medium text-indigo-500 hover:text-indigo-400">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
