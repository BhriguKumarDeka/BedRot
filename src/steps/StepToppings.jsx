import { useStepStore } from '../store/stepStore'
import OptionCard from '../components/OptionCard'

const options = [
  {name: 'Iced Coffee', image: '/ingredients/toppings/iced_coffee.png'},
  {name: 'Cup Noodles', image: '/ingredients/toppings/cup_noodles.png'},
  {name: 'Chips', image: '/ingredients/toppings/chips_bag.png'},
  {name: 'Diet Coke', image: '/ingredients/toppings/diet_coke.png'},
  {name: 'Pizza', image: '/ingredients/toppings/pizza_box.png'},
  {name: 'Energy Drink', image: '/ingredients/toppings/energy_drink.png'}
]

export default function StepToppings() {
  const { selectedToppings, toggleTopping } = useStepStore()
  return (
    <div className='flex flex-col h-full'>
      <h3 className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Fuel Source</h3>
      <div className='grid grid-cols-2 gap-3 pb-4'>
        {options.map((item)=>(
          <OptionCard key={item.name} image={item.image} label={item.name} isSelected={selectedToppings.includes(item.name)} onClick={()=> toggleTopping(item.name)}/>
        ))}
      </div>
    </div>
  )
}