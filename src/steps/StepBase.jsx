import { useStepStore } from "../store/stepStore"
import OptionCard from '../components/OptionCard'

const baseOptions = [
  {name: 'White Messy', image: '/ingredients/base/white_messy.png'},
  {name: 'Green Plaid', image: '/ingredients/base/plaid_green.png'},
  {name: 'Pink Ruffles', image: '/ingredients/base/pink_ruffles.png'},
  {name: 'Dark Grey', image: '/ingredients/base/dark_grey.png'}
]

export default function StepBase() {
  const {selectedBase, setBase} = useStepStore()
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Choose Sheets</h3>
      <div className="grid grid-cols-2 gap-3 pb-4">
        {baseOptions.map((item)=>(
          <OptionCard key={item.name} image={item.image} label={item.name} isSelected={selectedBase === item.name} onClick={()=>setBase(item.name)}/>
        ))}
      </div>
    </div>
  )
}