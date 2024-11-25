import { useState } from "react"
import { Alert } from "./components/Alert"
import { checkNegativePast } from "./service/englishChecker"
import { FeedbackError } from "./type"
import { Info } from "lucide-react"

function App() {

  const [streak, setStreak] = useState<number>(0)
  const widthStreak = Math.min((streak / 10) * 100, 100)
  const [sentence, setSentence] = useState("")
  const [alerts, setAlerts] = useState<Array<FeedbackError>>([])
  const [sentencesSends, setSentences] = useState<Array<string>>([])

  const handleSubmit = () => {
    const feedback = checkNegativePast(sentence)

    if (feedback.length > 0) {
      // @ts-expect-error ignore.
      setAlerts(feedback)
      setStreak(0)
      return false
    }

    if (sentencesSends.includes(sentence)) {
      setAlerts([{
        type: "info",
        message: "Esta oracion ya la habias ingresado con anterioridad, intenta con una nueva.",
        correction: ""
      }])
      return false
    }

    setStreak((prevStreak) => prevStreak + 1);
    setAlerts([{
      type: "success",
      message: "La oracion es correcta. ¡Felicidades!",
      correction: ""
    }])
    setSentences((prevSentences) => [...prevSentences, sentence])

    return true
  }

  const handleOpenInfo = () => {
    setAlerts([])
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
        <input value={sentence} onChange={(e) => setSentence(e.target.value)} type="text" placeholder="Write in Past Negative" className="rounded-md outline-none text-center text-gray-300 border border-gray-300 flex-1 w-full h-auto"/>
        <div>
          {alerts.length === 0 ? (
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
            alerts.map((a,i) => {

              const TITLE_ALERT = {
                error: "Error",
                success: "Bien Hecho",
                info: "Correccion"
              }

              if (a.correction) {
                return (
                  <>
                    <Alert key={i} type={a.type} title={TITLE_ALERT[a.type]} description={a.message}/>
                    <Alert key={i * 10} type="info" title={TITLE_ALERT["info"]} description={a.correction}/>
                  </>
                )
              }

              return (
                <Alert key={i} type={a.type} title={TITLE_ALERT[a.type]} description={a.message}/>
              )
            })
          )}

        </div>
      </div>
      <div className="flex flex-row gap-2">
          <button onClick={handleSubmit} className="transition-colors flex-1 bg-gray-200 focus:bg-gray-300 hover:bg-gray-300 text-gray-600 font-bold uppercase h-10 text-sm rounded-md shadow-sm">verificar</button>
          <button onClick={handleOpenInfo} className="transition-colors flex items-center justify-center w-[10%] bg-gray-200 focus:bg-gray-300 hover:bg-gray-300 text-gray-600 font-bold uppercase h-10 text-sm rounded-md shadow-sm"><Info/></button>
      </div>
    </div>
  )
}

export default App
