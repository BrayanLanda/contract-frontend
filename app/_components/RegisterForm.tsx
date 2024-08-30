"use client"; 

import React, { useState } from 'react';
import { registerSchema } from '@/app/_lib/zod';
import { z } from 'zod';
import { FormErrors } from '../types/formErrors';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nit: '',
    email: '',
    password: '',
    name: '',
    walletHash: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      registerSchema.parse({...formData, nit: parseInt(formData.nit)});
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData, nit: parseInt(formData.nit)}),
      });
      if (response.ok) {
        console.log('Registro exitoso');
        // Redirigir al usuario o mostrar un mensaje de éxito
      } else {
        const errorData = await response.json();
        console.error('Error en el registro', errorData);
        // Mostrar mensaje de error
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Error de validación:', error.errors);
        setErrors(error.flatten().fieldErrors);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nit" className="block text-sm font-medium text-gray-700">NIT</label>
        <input
          type="number"
          name="nit"
          id="nit"
          value={formData.nit}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.nit && <p className="text-red-500 text-xs mt-1">{errors.nit[0]}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
      </div>
      <div>
        <label htmlFor="walletHash" className="block text-sm font-medium text-gray-700">Wallet Hash</label>
        <input
          type="text"
          name="walletHash"
          id="walletHash"
          value={formData.walletHash}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.walletHash && <p className="text-red-500 text-xs mt-1">{errors.walletHash[0]}</p>}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register
      </button>
    </form>
  );
}