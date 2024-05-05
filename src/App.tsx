// import { useState } from 'react'
import { useEffect } from 'react';
import './App.scss'

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
            console.log(error.message, link);
            throw error;
        }
    }
}

async function getPokemonDataSet(idSet:number[]) {
    let errorOccurred = false;
    const pokemonDataSet = [];

    for(let i=0; i < idSet.length; i++) {
        try {
            if (errorOccurred) break;
            const link = `https://pokeapi.co/api/v2/pokemon/${idSet[i]}/`;
            const pokemonData = await fetchPokemonData(link);
            
            console.log(pokemonData.name);
            pokemonDataSet.push(pokemonData);
        } catch(error) {
            if (error instanceof Error) {
                console.log(error.message, `index:${i} id:${idSet[i]}`);
                errorOccurred = true;
                throw error;
            }
        }
    }

    return pokemonDataSet;
}

function generateRandomIds(num: number) {
    const randomIds:number[] = [];

    for (let i=0; i < num; i++) {
        const randomNum = Math.floor(Math.random() * 600);
        randomIds.push(randomNum);
    }

    return randomIds;
}

function App() {
    useEffect(() => {
        let ignore = false;

        async function getData() {
            if (!ignore) {
                const idSet = generateRandomIds(12);

                await getPokemonDataSet(idSet)
                .then((data) => console.log(data))
                .catch((error) => console.log(error))
            }
        }

        getData();

        return () => {
            ignore = true;
        }
    }, []);

    return (
      <>
        <div>Hello</div>
      </>
    )
}

export default App
