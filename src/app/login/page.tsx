'use client'
import { MdCatchingPokemon } from "react-icons/md";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login () {

  const { data: session, status } = useSession(); 
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  const GithubSignIn = () => {
    signIn('github', { redirectTo: '/' });
  }

  const GoogleSignIn = () => {
    signIn('google', { redirectTo: '/' })
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main className="bg-white min-h-screen h-screen w-full flex items-center justify-center bg-[url('https://images6.alphacoders.com/744/744921.png')] bg-bottom md:bg-center bg-contain bg-no-repeat">
      <section className="bg-slate-100/70 backdrop-blur-md drop-shadow-2xl rounded-md p-6">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <MdCatchingPokemon className="h-20 w-auto m-auto"/>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {/* Campos de Email e Senha */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-gray-500 focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-gray-500 focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
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

        {/* Botões de Sign in com OAuth */}
        <div className="inline-flex items-center justify-center w-full my-8">
            <h3 className="text-center text-base font-semibold text-slate-600 px-2 absolute -translate-x-1/2 left-1/2">
              Or continue with
            </h3>
        </div>

        <div className="flex w-full gap-2">
          <button 
            className="flex-1 p-2 flex justify-center rounded-md h-8 bg-slate-700 hover:bg-slate-800"
            onClick={GithubSignIn}
          >
            <FaGithub color="white"/>
          </button>

          <button 
            className="flex-1 p-2 flex justify-center rounded-md h-8 bg-emerald-500 hover:bg-emerald-600"
            onClick={GoogleSignIn}
            >
            <FaGoogle color="white"/>
          </button>
        </div>

      </div>
      </section>
    </main>
  )
}