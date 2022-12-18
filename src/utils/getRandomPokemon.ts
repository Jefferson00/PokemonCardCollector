import { POKEMON_QTD, SHINY_PROBABILITY } from "./constants";
import { IAlbum, IPokemon, IStats, ITypes } from "./interfaces";

import { v4 as uuidv4 } from "uuid";
import api from "../services/api";

export const getRandomPokemon = async (
  getUnique?: boolean,
  emptySpots?: IAlbum[]
) => {
  let randomId = Math.floor(Math.random() * (POKEMON_QTD - 1 + 1)) + 1;

  if (getUnique && emptySpots) {
    if (emptySpots.length > 0) {
      const randomEmptySpot =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];
      randomId = randomEmptySpot.id;
    }
  }

  const shinyRate = Math.floor(Math.random() * (SHINY_PROBABILITY - 1 + 1)) + 1;

  let is_shiny = false;
  if (shinyRate === 1) is_shiny = true;
  const { data } = await api.get(`pokemon/${randomId}`);

  const stats: IStats[] = [];

  data.stats.map((stat: any) => {
    if (
      stat.stat.name !== "special-attack" &&
      stat.stat.name !== "special-defense"
    ) {
      stats.push({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      });
    }
  });

  const types: ITypes[] = [];

  data.types.map((type: any) => {
    types.push({
      name: type.type.name,
    });
  });

  const pokemon: IPokemon = {
    id: data.id,
    name: data.name,
    types,
    sprites: {
      front_default: data.sprites.other.home.front_default,
      front_shiny: data.sprites.other.home.front_shiny,
    },
    stats,
    unique_id: uuidv4(),
    is_shiny,
  };

  return pokemon;
};
