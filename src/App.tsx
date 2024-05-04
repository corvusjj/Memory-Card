// import { useState } from 'react'
import { useEffect } from 'react';
import './App.scss'

async function fetchPokemonData(link:string) {
    try {
        const response = await fetch(link, {mode: 'cors'});
        if (!response.ok) throw new ReferenceError('Data Undefined');

        const pokemonData = await response.json();
        return pokemonData;

    } catch (error) {
        if (error instanceof Error) {
            throw error.message;
        }
    } 
}

async function getData() {
    const link = 'https://pokeapi.co/api/v2/pokemon/600/';

    await fetchPokemonData(link)
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
}

function App() {
    const pokemonIds:number[] = [];

    for (let i=0; i < 12; i++) {
        const randomNum = Math.floor(Math.random() * 600);
        pokemonIds.push(randomNum);
    }

    console.log(pokemonIds);

    useEffect(() => {
        getData();
    }, []);

    return (
      <>
        <div>Hello</div>
      </>
    )
}

export default App
