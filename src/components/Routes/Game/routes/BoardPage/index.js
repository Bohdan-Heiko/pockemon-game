import { useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';

import PokemonCard from '../../../../PokemonCard';
import { PokemonContext } from '../../../../../context/pokemonContext';

import s from './style.module.css';
import PlayerBoard from './Component/PlayerBoard';



const counterWin = (board, player1, player2) => {
    let player1Counter = player1.length;
    let player2Counter = player2.length;

    board.forEach(item => {
        if(item.card.possession === 'red') {
            player1Counter++;
        }
        if(item.card.possession === 'blue') {
            player2Counter++;
        }
    });

    return [player1Counter, player2Counter];
}



const BoardPage = () => {
    const { pokemons } = useContext(PokemonContext);
    const [board, setBoard] = useState([])
    const [player1, setPlyer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))
    })
    const [player2, setPlyer2] = useState([])
    const [choiseCard, setChoiseCard] = useState(null)
    const [step, setStep] = useState(0)
    const history = useHistory() 

    console.log('#### choiseCard', choiseCard);
    // console.log("board", board);
    useEffect(async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board')
        const boardRequest = await boardResponse.json()


        setBoard(boardRequest.data)
        console.log("### boardRequest", boardRequest.data);

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
            console.log('#### reauest', request);


            if (choiseCard.player === 1) {
                setPlyer1(prevState => prevState.filter(item => item.id !== choiseCard.id))
            }
            if (choiseCard.player === 2) {
                setPlyer2(prevState => prevState.filter(item => item.id !== choiseCard.id))
            }
            setBoard(request.data)
            
            setStep(prevState => {
                const count = prevState + 1;
                return count
            })
        }
    }

    useEffect(()=> {
        if(step === 9) {
            const[count1, count2] = counterWin(board, player1, player2)

            if(count1 > count2) {
                alert ("WIN ")
            } else if (count1 < count2) {
                alert ("LOSE")
            } else {
                alert ("DRAW")
            }
        }
    },[step])



    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiseCard(card)}
                />
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handleClickBoard(item.position)}>
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize />
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
