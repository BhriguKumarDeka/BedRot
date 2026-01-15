import { useStepStore } from "../store/stepStore"
import OptionCard from "../components/OptionCard"

const scenes = [
  {name: "Daylight", image: '/backgrounds/day.png'},
  {name: "Rainy Mood", image: '/backgrounds/rain.png'},
  {name: "3 AM Night", image: '/backgrounds/night.png'},
  {name: "Golden Hour", image: '/backgrounds/golden.png'},
  {name: "Dusk Vibes", image: '/backgrounds/dusk.png'},
  {name: "Gryffindor", image: '/backgrounds/gryffindor.png'},
  {name: "Void", image: '/backgrounds/void.png'},
]

export default function StepScene() {
  const {selectedScene, setScene} = useStepStore()
  const handleClick = (s) => selectedScene === s ? setScene(null) : setScene(s)

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Set the Vibe</h3>
      <div className="grid grid-cols-2 gap-3 pb-4">
        {scenes.map((scene)=> (
          <OptionCard key={scene.name} image={scene.image} label={scene.name} isSelected={selectedScene === scene.name} onClick={()=>handleClick(scene.name)}/>
        ))}
      </div>
    </div>
  )
}