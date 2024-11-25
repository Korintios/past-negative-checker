import { useState } from "react"
import { Alert } from "./components/Alert"

function App() {

  const [streak, setStreak] = useState(0)
  const widthStreak = Math.min((streak / 10) * 100, 100);
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = () => {
    setIsSubmit(true)
    setStreak((prevData: number) => setStreak(prevData + 1))
  }

  return (
    <div className="flex flex-col justify-between w-full h-screen p-3">
      <header className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row">
          <span className="text-orange-400 font-extrabold">RACHA</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
          <div className="bg-orange-400 h-2.5 rounded-full transition-all" style={{width: widthStreak + "%"}}></div>
        </div>
        <div>
          <span className="text-xl text-orange-400 font-bold font-sans">{streak}</span>
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-3 mt-2">
        <input type="text" placeholder="Write in Past Negative" className="rounded-md outline-none text-center text-gray-300 border border-gray-300 flex-1 w-full h-auto"/>
        <div>
          {!isSubmit ? (
            <>
              <Alert type="info" title="¿Que es el Pasado Negativo?" description="El pasado negativo se usa para negar acciones o eventos que no ocurrieron en el pasado."/>
              <Alert type="info" title="Estructura del Pasado Negativo" description="Sujeto + did not (didn't) + verbo en infinitivo + complemento."/>
              <Alert type="info" title="Ejemplos" description={(
                <ul>
                  <li>- I did not eat breakfast yesterday.</li>
                  <li>- She didn't go to the party last night.</li>
                  <li>- They did not finish their homework on time.</li>
                </ul>
              )}/>
            </>
          ) : (
            <></>
          )}

        </div>
      </div>
      <button onClick={handleSubmit} className="bg-gray-200 focus:bg-gray-300 hover:bg-gray-300 text-gray-600 font-bold uppercase h-10 text-sm rounded-md shadow-sm">verificar</button>
    </div>
  )
}

export default App
