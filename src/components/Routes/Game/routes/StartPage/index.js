import PokemonCard from '../../../../PokemonCard';
// import database from '../../service/firebase'

// import { useHistory } from 'react-router-dom';
import s from './style.module.css'
import { useEffect, useState, useContext } from 'react';
import { FireBaseContext } from '../../../../../context/firebaseContext';
import { PokemonContext } from '../../../../../context/pokemonContext';


const StartPage = () => {
  // const history = useHistory()
  // const handleClickButton = () => {
  //   history.push('/')
  // }
  const firebase = useContext(FireBaseContext)
  const pokemonContext = useContext(PokemonContext)
  const [pokemons, setPokemons] = useState({})

  useEffect(() => {
    firebase.getPokemonSoket((pokemon) => {
      setPokemons(pokemon)
    }, [])

    // return firebase.offPokemonSoket();
  }, [])

  const handleSelecdetPokemons = (key) => {
    const pokemon = { ...pokemons[key] }
    pokemonContext.onSelectedPokemons(key, pokemon);

    setPokemons(prevState => ({
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
            Object.entries(pokemons).map(([key, { id, name, img, type, values, selected }]) => <PokemonCard
              className={s.card}
              key={key}
              id={id}
              name={name}
              img={img}
              type={type}
              values={values}
              isActive={true}
              isSelected={selected}
              onClickCard={() => {
                if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                  handleSelecdetPokemons(key)
                }
              }}
            />)
          }
        </div>
      </div>
      {/* <button onClick={handleClickButton}>Back to Home</button> */}
    </>
  )

}

export default StartPage;

