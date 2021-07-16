import s from './style.module.css'
import PokemonCard from '../../../../../../PokemonCard'
import { useState } from 'react'
import cn from 'classnames'



const PlayerBoard = ({ cards, onClickCard }) => {
  const [isSelected, setSelected] = useState(null)


  return (
    <>
      {
        cards.map((item) => (
          <div className={cn(s.cardBoard, {
            [s.selected]: isSelected === item.id
          })}
            onClick={
              () => {
                setSelected(item.id);
                onClickCard && onClickCard(item)
              }
            }>
              
            <PokemonCard
              key={item.key}
              id={item.id}
              name={item.name}
              img={item.img}
              type={item.type}
              values={item.values}
              isActive
              minimize
            />
          </div>
        ))}
    </>
  )
}

export default PlayerBoard