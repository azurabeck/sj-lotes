// src/app/login/page.tsx

export default function Login() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Digite seu email"
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Digite sua senha"
              />
            </div>
  
            <div className="flex items-center justify-between mb-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Entrar
              </button>
            </div>
          </form>
  
          <div className="text-center">
            <a href="/register" className="text-blue-500 hover:underline">
              Cadastrar
            </a>
            <span className="mx-2 text-gray-400">|</span>
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
        </div>
      </div>
    );
  }
  