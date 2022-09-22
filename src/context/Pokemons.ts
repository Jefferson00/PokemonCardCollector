import { createContext } from "react";
import { IAlbum, IPokemon } from "../utils/interfaces";

interface PokemonsContextData {
  pokemonListState: IPokemon[];
  repeatedCards: IPokemon[];
  packageAvailable: boolean;
  nextTimeToOpenPackage: Date;
  minCards: number;
  maxCards: number;
  album: IAlbum[];
  minutes: number;
  seconds: number;
  loading: boolean;
  handleTradeCard: () => Promise<void>;
  toggleRepeatedPokemon: (pokemon: IPokemon) => void;
  handleSortCards: () => void;
  handleGetPokemons: () => Promise<void>;
  handleChangeCards: (direction: "prev" | "next") => void;
  updatePokemonList: (uniqueId: string) => void;
}

export const PokemonsContext = createContext({} as PokemonsContextData);
