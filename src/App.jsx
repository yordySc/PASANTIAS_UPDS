import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center p-4">
      
      {/* Tarjeta de Prueba Tailwind */}
      <div className="bg-blue-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-t-8 border-yellow-500">
        
        <h1 className="text-3xl font-extrabold text-white mb-4">
          ¡Tailwind Configurado! 🚀
        </h1>
        
        <p className="text-blue-200 text-base mb-6">
          Si puedes ver esta tarjeta azul con bordes redondeados y una línea amarilla arriba, significa que Tailwind CSS está funcionando perfectamente en tu proyecto para la UPDS.
        </p>

        <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-full transition-colors duration-300">
          Comenzar a Programar
        </button>

      </div>

    </div>
  )
}

export default App