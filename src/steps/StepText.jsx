import { useStepStore } from "../store/stepStore"

export default function StepText(){
  const {userMessage, setUserMessage} = useStepStore()

  return ( 
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center">
        <h3 className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Current Status</h3>
        <input
         type="text"
         maxLength={25}
         value={userMessage}
         onChange={(m)=> setUserMessage(m.target.value)}
         placeholder="e.g. Do Not Disturb"
         className="w-full px-4 py-4 text-xl border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-slate-800 transition-all text-center font-bold text-slate-700 placeholder-slate-300 bg-slate-50"
         autoFocus
        />
        <div className="text-xs text-slate-400">Max 25 chars</div>
    </div>
  )
}