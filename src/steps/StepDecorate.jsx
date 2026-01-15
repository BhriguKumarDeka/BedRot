import { useStepStore } from "../store/stepStore"
import OptionCard from "../components/OptionCard"

const options = [
  {name: 'Squishmallow', image: '/ingredients/decorations/squishmallow.png'},
  {name: 'Tissues', image: '/ingredients/decorations/tissues.png'},
  {name: 'Headphones', image: '/ingredients/decorations/headphones.png'},
  {name: 'Eye Mask', image: '/ingredients/decorations/eye_mask.png'}
]

export default function StepDecorate() {
  const {selectedDecoration, setDecoration} = useStepStore()
  const handleClick = (n) => selectedDecoration === n ? setDecoration(null) : setDecoration(n)

  return (
    <div className="flex flex-col h-full">
       <h3 className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Comfort Item</h3>
      <div className="grid grid-cols-2 gap-3 pb-4">
        {options.map((item)=>(
          <OptionCard key={item.name} image={item.image} label={item.name} isSelected={selectedDecoration === item.name} onClick={()=> handleClick(item.name)}/>
        ))}
      </div>
    </div>
  )
}