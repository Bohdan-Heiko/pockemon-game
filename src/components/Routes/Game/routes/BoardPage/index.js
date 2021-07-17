import { useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';

import PokemonCard from '../../../../PokemonCard';
import { PokemonContext } from '../../../../../context/pokemonContext';

import s from './style.module.css';
import PlayerBoard from './Component/PlayerBoard';



const BoardPage = () => {
    const { pokemons } = useContext(PokemonContext);
    const [board, setBoard] = useState([])
    const [player1, setPlyer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue'
        }))
    })
    const [player2, setPlyer2] = useState([])
    const [choiseCard, setChoiseCard] = useState(null)
    const history = useHistory()

    console.log('#### board', player2);

    useEffect(async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board')
        const boardRequest = await boardResponse.json()

        setBoard(boardRequest.data)

        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
        const player2Request = await player2Response.json()

        setPlyer2(() => {
            return player2Request.data.map(item => ({
                ...item,
                possession: 'red'
            }))
        })
    }, [])

    if (Object.entries(pokemons).length === 0) {
        history.replace('/game')
    }

    const handleClickBoard = async (position) => {
        console.log("### position", position);
        console.log("### setChoiseCard", choiseCard);
        if (choiseCard) {
            const params = {
                position,
                card: choiseCard,
                board,
            }
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();
            setBoard(request.data)
        }

    }
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClick={(card) => setChoiseCard(card)}
                />
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
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiseCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;
