import { useContext } from "react";
import { PokemonsContext } from "../context/Pokemons";

export function usePokemons() {
  const context = useContext(PokemonsContext);

  return context;
}
