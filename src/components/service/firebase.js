import firebase from 'firebase/app';
import 'firebase/database';




const firebaseConfig = {
  apiKey: "AIzaSyBum6TRpeeFcqA4yf8Y6P3QwDhdJm31Lxc",
  authDomain: "pokemon-game-414a3.firebaseapp.com",
  databaseURL: "https://pokemon-game-414a3-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-414a3",
  storageBucket: "pokemon-game-414a3.appspot.com",
  messagingSenderId: "1076189888795",
  appId: "1:1076189888795:web:ab4b7f7970f40eedcb93be"
};

firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {

    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val())
    })
  }

  offPokemonSoket = () => {
    this.database.ref('pokemons').off()
  }

  getPokemonOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val())
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (data) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(data)
  }

}



export default Firebase;
