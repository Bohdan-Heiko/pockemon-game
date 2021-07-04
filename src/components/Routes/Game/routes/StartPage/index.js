import PokemonCard from '../../../../PokemonCard';
// import database from '../../service/firebase'

import { useHistory } from 'react-router-dom';
import s from './style.module.css'
import { useEffect, useState, useContext } from 'react';
import { FireBaseContext } from '../../../../../context/firebaseContext';


const StartPage = () => {
  const history = useHistory()
  const handleClickButton = () => {
    history.push('/')
  }
  const firebase = useContext(FireBaseContext)
  const [currentPokemons, setActivePokemons] = useState({})

  useEffect(() => {
    firebase.getPokemonSoket((pokemon) => {
      setActivePokemons(pokemon)
    })

    // return firebase.offPokemonSoket();
  }, [])

  const revertPokemons = (key) => {
    setActivePokemons(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      }
    }))
  }

  return (
    <>
      <div className={s.buttonWrap}>
        <button>
          Start Game
        </button>

        <div className={s.flex}>
          {
            Object.entries(currentPokemons).map(([key, { id, name, img, type, values, selected }]) => <PokemonCard
              className={s.card}
              key={key}
              id={id}
              name={name}
              img={img}
              type={type}
              values={values}
              isActive={true}
              isSelected={selected}
              revertPokemon={() => revertPokemons(key)}
            />)
          }
        </div>
      </div>
      {/* <button onClick={handleClickButton}>Back to Home</button> */}
    </>
  )

}

export default StartPage;

