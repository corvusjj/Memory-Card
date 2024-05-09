import { useState, useEffect } from 'react'

import { PokemonData, RawData } from './types/pokemon';
import './App.scss'

import PokemonCell from './components/PokemonCell';

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
            
            console.log(pokemonData);
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

async function getRawDataSet(dataSet: PokemonData[]) {
    const rawDataSet= [];
    let errorOccurred = false;

    async function getRawData(link:string) {
        try {
            const response = await fetch(link);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    try {
        for(let i=0; i < dataSet.length; i++) {
            const pokemonData = dataSet[i];
    
            try {
                if (errorOccurred) break;
    
                const name = pokemonData.name;
                const id = pokemonData.id;
                const cryAudio = await getRawData(pokemonData.cries.legacy);
                const sprite = await getRawData(pokemonData.sprites.front_default);
    
                const pokemonRawData = new Object({name, id, cryAudio, sprite}) as RawData;
                console.log(pokemonRawData);
                rawDataSet.push(pokemonRawData);
            } catch(error) {
                if (error instanceof Error) {
                    errorOccurred = true;
                    throw error;
                }
            }
        }

        return rawDataSet;

    } catch(error) {
        console.log(error);
        throw error;
    } 
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
    const [pokemonDataSet, setPokemonData] = useState<RawData[]>([]);

    useEffect(() => {
        let ignore = false;

        async function getData() {
            if (!ignore) {
                const idSet = generateRandomIds(12);

                await getPokemonDataSet(idSet)
                .then((dataSet) => getRawDataSet(dataSet))
                .then((rawDataSet) => setPokemonData(rawDataSet))
                .catch((error) => console.log(error))
            }
        }

        getData();

        return () => {
            ignore = true;
        }
    }, []);

    if (pokemonDataSet.length > 0) {
        return (
            <>
                <div>Hello</div>
                {pokemonDataSet.map(data => (
                    <PokemonCell pokemonData={data}/>
                ))}
            </>
        )
    }
}

export default App

//  remove logs
