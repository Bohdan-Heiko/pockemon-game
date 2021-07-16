import { useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';

import PokemonCard from '../../../../PokemonCard';
import { PokemonContext } from '../../../../../context/pokemonContext';

import s from './style.module.css';
import PlayerBoard from './Component/PlayerBoard';



const BoardPage = () => {
    const [board, setBoard] = useState([])
    const [player2, setPlyer2] = useState([])
    const [choiseCard, setChoiseCard] = useState(null)


    const { pokemons } = useContext(PokemonContext);
    // const history = useHistory()

    useEffect(async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board')
        const boardRequest = await boardResponse.json()

        setBoard(boardRequest.data)

        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
        const player2Request = await player2Response.json()

        setPlyer2(player2Request.data)
    }, [])



    // if(Object.entries(pokemons).length === 0) {
    //     history.replace('/game')
    // }

    const handleClickBoard = (position) => {
        console.log("### position", position);
        console.log("### setChoiseCard", choiseCard);

    }
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard 
                cards={Object.values(pokemons)} 
                onClick={(card)=> setChoiseCard(card)}/> 
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClickCard={() => !item.card && handleClickBoard(item.position)}>
                            {
                                item.card && <PokemonCard {...item} minimize />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard 
                cards={player2}
                onClickCard={(card) => setChoiseCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;
