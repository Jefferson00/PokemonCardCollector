import { IPokemon } from "./interfaces";

export const getAlbumList = (qtd: number, pokemons?: IPokemon[]) => {
  let albumArray = [];
  for (let i = 1; i <= qtd; i++) {
    albumArray.push({
      id: i,
      pokemon: pokemons ? pokemons.find((poke) => poke.id === i) || null : null,
    });
  }
  return albumArray;
};
