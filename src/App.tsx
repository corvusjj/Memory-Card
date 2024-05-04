// import { useState } from 'react'
import { useEffect } from 'react';
import './App.scss'

function handleError(error:Error) {
    console.log(error.message);
}

async function fetchPokemonData(link:string) {
    try {
        const response = await fetch(link, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const pokemonData = await response.json();
        return pokemonData;

    } catch(error) {
        if (error instanceof Error) {
            handleError(error);
        }
    }
}

function generateRandomIds() {
    const randomIds:number[] = [];

    for (let i=0; i < 12; i++) {
        const randomNum = Math.floor(Math.random() * 600);
        randomIds.push(randomNum);
    }

    return randomIds;
}

function App() {
    console.log(generateRandomIds());

    const link = 'https://pokeapi.co/api/v2/pokemon/599/';

    useEffect(() => {
        fetchPokemonData(link);
    }, []);

    return (
      <>
        <div>Hello</div>
      </>
    )
}

export default App
