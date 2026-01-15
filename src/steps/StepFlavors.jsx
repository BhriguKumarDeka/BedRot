import { useStepStore } from "../store/stepStore"
import OptionCard from "../components/OptionCard"

const options = [
  { name: 'MacBook', image: '/ingredients/flavors/macbook.png'},
  { name: 'Switch', image: '/ingredients/flavors/switch.png'},
  { name: 'Kindle', image: '/ingredients/flavors/kindle.png'},
  { name: 'Sleeping Cat', image: '/ingredients/flavors/cat_sleeping.png'},
]

export default function StepFlavors() {
  const { selectedFlavors, addFlavor, removeFlavor} = useStepStore()
  const toggle = (f) => selectedFlavors.includes(f) ? removeFlavor(f) : addFlavor(f)

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Essentials (Max 3)</h3>
      <div className="grid grid-cols-2 gap-3 pb-4">
        {options.map((item)=> (
          <OptionCard key={item.name} image={item.image} label={item.name} isSelected={selectedFlavors.includes(item.name)} onClick={()=> toggle(item.name)}/>
        ))}
      </div>
    </div>
  )
}