import api from "../services/api";
import { ReactNode, useEffect, useState } from "react";
import { PokemonsContext } from "../context/Pokemons";
import { IAlbum, ICard, IPokemon } from "../utils/interfaces";
import { addMinutes, isAfter, isBefore } from "date-fns";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import {
  CARD_QTD_PER_PACKAGE,
  MIN_QTD_TO_TRADE,
  PACKAGE_TIMOUT,
  POKEMON_QTD,
  SHINY_PROBABILITY,
} from "../utils/constants";
import { getAlbumList } from "../utils/getAlbumList";
import { useBreakpointValue } from "@chakra-ui/react";

interface PokemonsProviderProps {
  children: ReactNode;
}

export function PokemonsProvider({ children }: PokemonsProviderProps) {
  const { data } = useSession();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const MAX_CARDS = isWideVersion ? 5 : 1;

  const currentDate = new Date().getTime();
  const [loading, setLoading] = useState(true);
  const [pokemonListState, setPokemonListState] = useState<IPokemon[]>([]);
  const [repeatedCards, setRepeatedCards] = useState<IPokemon[]>([]);
  const [packageAvailable, setPackageAvailable] = useState(true);
  const [nextTimeToOpenPackage, setNextTimeToOpenPackage] = useState<Date>(
    new Date()
  );
  const [minCards, setMinCards] = useState(0);
  const [maxCards, setMaxCards] = useState(MAX_CARDS);
  const [timeleft, setTimeleft] = useState(
    nextTimeToOpenPackage.getTime() - currentDate
  );
  const [album, setAlbum] = useState<IAlbum[]>(getAlbumList(POKEMON_QTD));

  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  const handleGetRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * (POKEMON_QTD - 1 + 1)) + 1;
    const shinyRate =
      Math.floor(Math.random() * (SHINY_PROBABILITY - 1 + 1)) + 1;

    let is_shiny = false;
    if (shinyRate === 1) is_shiny = true;
    const { data } = await api.get(`pokemon/${randomId}`);

    return {
      ...data,
      unique_id: uuidv4(),
      is_shiny,
    };
  };

  const getPokemonOnDB = async () => {
    const { data } = await axios.get("/api/cards");
    let pokemons: IPokemon[] = [];
    let pokemonsOnAlbum: IPokemon[] = [];
    data.map((card: ICard) => {
      if (!card.on_album) {
        pokemons.push({
          ...card.pokemon,
          _id: card?._id,
        });
      } else {
        pokemonsOnAlbum.push({
          ...card.pokemon,
          _id: card?._id,
        });
      }
    });

    setAlbum(getAlbumList(POKEMON_QTD, pokemonsOnAlbum));
    setPokemonListState(pokemons);
    setLoading(false);
  };

  const handleGetPokemons = async () => {
    setLoading(true);
    const lastTimeClicked = new Date();
    setNextTimeToOpenPackage(
      addMinutes(new Date(lastTimeClicked), PACKAGE_TIMOUT)
    );

    const response = await axios.get("/api/control/");

    if (response.data.length > 0) {
      await axios.put(`/api/control/${response.data[0]._id}`, {
        date: lastTimeClicked,
      });
    } else {
      await axios.post(`/api/control`, {
        date: lastTimeClicked,
        user_email: data?.user?.email,
      });
    }

    setPackageAvailable(false);

    await handleSaveManyCards(CARD_QTD_PER_PACKAGE, pokemonListState);
    setLoading(false);
  };

  const handleSortCards = () => {
    let list = [...pokemonListState];
    list.sort((a, b) => a.id - b.id);
    setPokemonListState(list);
    if (maxCards !== MAX_CARDS) setMaxCards(MAX_CARDS);
    if (maxCards !== 0) setMinCards(0);
  };

  const handleChangeCards = (direction: "prev" | "next") => {
    if (direction === "prev" && minCards > 0) {
      setMaxCards(maxCards - MAX_CARDS);
      setMinCards(minCards - MAX_CARDS);
    } else if (direction === "next" && maxCards < pokemonListState.length) {
      setMaxCards(maxCards + MAX_CARDS);
      setMinCards(minCards + MAX_CARDS);
    }
  };

  const updatePokemonList = (
    operation: "add" | "delete",
    pokemon: IPokemon
  ) => {
    if (operation === "add") {
      setPokemonListState([...pokemonListState, pokemon]);
    } else {
      setPokemonListState((prevState) =>
        prevState.filter((poke) => poke.unique_id !== pokemon.unique_id)
      );
    }
  };

  const toggleRepeatedPokemon = (pokemon: IPokemon) => {
    if (repeatedCards.find((poke) => poke._id === pokemon._id)) {
      setRepeatedCards((prevState) =>
        prevState.filter((p) => p._id !== pokemon._id)
      );
    } else {
      setRepeatedCards((prevState) => [...prevState, pokemon]);
    }
  };

  const handleTradeCard = async () => {
    if (repeatedCards.length >= MIN_QTD_TO_TRADE) {
      setLoading(true);
      const cardQtdToReceive = Math.floor(
        repeatedCards.length / MIN_QTD_TO_TRADE
      );
      const repeatedCardsQtdToTrade = cardQtdToReceive * MIN_QTD_TO_TRADE;
      let newPokemonListState = [...pokemonListState];
      await Promise.all(
        repeatedCards.slice(0, repeatedCardsQtdToTrade).map(async (poke) => {
          const index = newPokemonListState.indexOf(poke);
          newPokemonListState.splice(index, 1);
          await axios.delete(`/api/cards/${poke._id}`);
        })
      );
      setPokemonListState(newPokemonListState);
      const remainingRepeatedPokemons = repeatedCards.slice(
        repeatedCardsQtdToTrade,
        repeatedCards.length
      );
      setRepeatedCards(remainingRepeatedPokemons);

      await handleSaveManyCards(cardQtdToReceive, newPokemonListState);
      setLoading(false);
    }
  };

  const handleSaveManyCards = async (qtd: number, pokemonList: IPokemon[]) => {
    let count = 1;
    let pokeArray = [];

    while (count <= qtd) {
      console.log("count", count);

      const pokemon = await handleGetRandomPokemon();
      const response: AxiosResponse = await axios.post("/api/cards", {
        pokemon: {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          sprites: pokemon.sprites,
          stats: pokemon.stats,
          is_shiny: pokemon.is_shiny,
          unique_id: pokemon.unique_id,
        },
        on_album: false,
        user_email: data?.user?.email,
      });
      console.log("response", response);
      pokeArray.push({
        ...pokemon,
        _id: response.data.insertedId,
        is_new: true,
      });
      count++;
    }

    setPokemonListState([...pokemonList, ...pokeArray]);
    setMaxCards([...pokemonList, ...pokeArray].length);
    setMinCards([...pokemonList, ...pokeArray].length - MAX_CARDS);
  };

  const getLastTimeOpen = async () => {
    const response = await axios.get("/api/control");
    if (response.data.length > 0) {
      const lastTimeOpen = response.data[0];

      setNextTimeToOpenPackage(
        addMinutes(new Date(lastTimeOpen?.date), PACKAGE_TIMOUT)
      );

      if (
        isBefore(
          new Date(),
          addMinutes(new Date(lastTimeOpen?.date), PACKAGE_TIMOUT)
        )
      ) {
        setPackageAvailable(false);
      }
    }
  };

  useEffect(() => {
    getLastTimeOpen();
  }, []);

  useEffect(() => {
    if (!packageAvailable) {
      const timer = setTimeout(() => {
        setTimeleft(nextTimeToOpenPackage.getTime() - currentDate);
      }, 1000);

      if (nextTimeToOpenPackage && isAfter(new Date(), nextTimeToOpenPackage)) {
        setPackageAvailable(true);
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [timeleft, nextTimeToOpenPackage, packageAvailable, currentDate]);

  useEffect(() => {
    getPokemonOnDB();
  }, []);

  useEffect(() => {
    setMaxCards(MAX_CARDS);
  }, [MAX_CARDS]);

  return (
    <PokemonsContext.Provider
      value={{
        pokemonListState,
        packageAvailable,
        maxCards,
        minCards,
        nextTimeToOpenPackage,
        album,
        minutes,
        seconds,
        loading,
        repeatedCards,
        handleTradeCard,
        handleGetPokemons,
        handleChangeCards,
        updatePokemonList,
        handleSortCards,
        toggleRepeatedPokemon,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
}
