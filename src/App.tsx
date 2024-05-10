import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';

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
                const key = uuid();
                const cryAudio = await getRawData(pokemonData.cries.latest);
                const sprite = await getRawData(pokemonData.sprites.front_default);
    
                const pokemonRawData = new Object({name, id, key, cryAudio, sprite}) as RawData;
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

    function getRandomNum() {
        const randomNum =  Math.floor(Math.random() * 600);
        if (randomIds.includes(randomNum)) getRandomNum();
        return randomNum;
    }

    for (let i=0; i < num; i++) {
        const id = getRandomNum();
        randomIds.push(id);
    }

    return randomIds;
}

const initialIds = generateRandomIds(12);

function App() {
    const [pokemonDataSet, setPokemonData] = useState<RawData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [idSet, setIdSet] = useState(initialIds);

    function changePokemonSet() {
        const newIdSet = generateRandomIds(12);
        setIdSet(newIdSet);
    }

    useEffect(() => {
        let ignore = false;

        async function getPokemonData() {
            if (!ignore) {
                try {
                    setIsLoading(true);

                    const dataSet = await getPokemonDataSet(idSet);
                    const rawDataSet = await getRawDataSet(dataSet);
                    setPokemonData(rawDataSet);
                    setIsLoading(false);
                } catch(error) {
                    console.log(error);
                    setIsLoading(false);
                }
            }
        }

        getPokemonData();

        return () => {
            ignore = true;
        }
    }, [idSet]);

    if (isLoading) return <>loading...</>

    return (
        <>
            <button onClick={changePokemonSet}>Change Pokemons</button>
            <div className='pokemon-board'>
                {pokemonDataSet.map(data => (
                    <PokemonCell pokemonData={data} key={data.key}/>
                ))}
            </div>
        </>
    )
}

export default App

//  refactor useEffect, separate component
//  grid pokemon cells, place bush
//  remove logs
