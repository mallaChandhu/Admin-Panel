import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Credentials {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
  const [error, setError] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8010/proxy/login', credentials);
      console.log("Login response", response.data);
    } catch (error) {
      console.error("Sign-in error", error);
      setError(true);
    }

    setCredentials({ email: '', password: '' });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen items-center bg-[#f9fafb]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="./public/assets/galvix-logo.png" alt="Galvix-Logo" />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[25rem] p-10 border border-gray-150 rounded-xl bg-white shadow-md">
        <div>
          <h2 className="mb-7 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in with your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                  error ? 'ring-red-500' : 'ring-gray-300 pl-2'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:${error ? 'ring-red-500' : 'ring-[#4f46e5]'} sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                  error ? 'ring-red-500' : 'ring-gray-300 pl-2'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:${error ? 'ring-red-500' : 'ring-[#4f46e5]'} sm:text-sm sm:leading-6`}
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                Invalid credentials
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
