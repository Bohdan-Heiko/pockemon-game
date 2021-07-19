import { Route, Switch, useRouteMatch } from "react-router-dom";
import { PokemonContext } from '../../../context/pokemonContext'

import StartPage from './routes/StartPage';
import BoardPage from './routes/BoardPage';
import FinishPage from './routes/FinishPage';
import { useState } from "react";


const GamePage = () => {
  const match = useRouteMatch();
  const [selectedPokemon, setSelectedPokemons] = useState({})
  const [finishBoard, setFinishBoard] = useState([])
  const handleSelecdetPokemons = (key, pokemon) => {

    setSelectedPokemons(prevState => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      const newState = {...prevState, [key]: pokemon}
      return newState;
        
        
      
    })
  }

  const clearPokemonContext = () => {
    setSelectedPokemons({})
    finishBoard([])
  }



  return (
    <PokemonContext.Provider value={{
      pokemons: selectedPokemon,
      onSelectedPokemons: handleSelecdetPokemons,
      finishBoard:finishBoard,
      clearPokemonContext
    }}>
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>

  );
};

export default GamePage;