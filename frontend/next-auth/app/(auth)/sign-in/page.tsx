'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SignInResponse, signInAction } from './actions'; //  signInAction is a function imported from another file



const Signin = () => {
  const [email, setEmail] = useState<string>(''); // Explicitly typed as string
  const [password, setPassword] = useState<string>(''); // Explicitly typed as string
  const [error, setError] = useState<string | null>(null); // Error can be string or null
  const router = useRouter(); // useRouter inferred by Next.js

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // This is a form event

    setError(null); // Reset any previous errors

    try {
      // Call the signInAction and type the response
      const { accessToken, refreshToken }: SignInResponse = await signInAction(email, password);

      // Store the tokens (you could also use cookies instead of localStorage if needed)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Navigate to a protected page (e.g., coffees)
      router.push('/coffees');
    } catch (error: unknown) {
      // Type assertion to any for error, but can handle more specific types if needed
      if (error instanceof Error) {
        setError(error.message); // If the error is an instance of Error, use its message
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signin;