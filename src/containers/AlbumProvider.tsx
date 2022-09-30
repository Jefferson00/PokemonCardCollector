import axios from "axios";
import { ReactNode, useEffect, useRef, useState } from "react";
import { DraggableData } from "react-draggable";
import { AlbumContext } from "../context/Album";
import { usePokemons } from "../hooks/usePokemons";
import { POKEMON_QTD } from "../utils/constants";
import { getAlbumList } from "../utils/getAlbumList";
import { getRefsArray } from "../utils/getRefsArray";
import { getRegionPokedex } from "../utils/getRegionPokedex";
import { IAlbum, IPokemon } from "../utils/interfaces";

interface AlbumProviderProps {
  children: ReactNode;
}

export function AlbumProvider({ children }: AlbumProviderProps) {
  const { pokemonListState, updatePokemonList, album } = usePokemons();

  let refs = useRef<any[]>(getRefsArray(POKEMON_QTD));

  const [page, setPage] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [albumCompleteStatus, setAlbumCompleteStatus] = useState(0);
  const [albumState, setAlbumState] = useState<IAlbum[]>(
    getAlbumList(POKEMON_QTD)
  );

  const positionAccuracy = (value1: number, value2: number) => {
    return ((value1 - value2) / ((value1 + value2) / 2)) * 100;
  };

  const handleChangePage = (direction: "prev" | "next") => {
    if (direction === "prev" && page > 1) {
      setPage(page - 1);
      setMax(max - 10);
      setMin(min - 10);
    } else if (direction === "next" && max < albumState.length) {
      setPage(page + 1);
      setMax(max + 10);
      setMin(min + 10);
    }
  };

  const handleSelectRegion = (region: string) => {
    const regionMin = getRegionPokedex(region);
    const rest = regionMin % 10;
    const actualMin = regionMin - rest;
    setMin(actualMin);
    setMax(actualMin + 10);
    setPage(Math.floor(actualMin / 10) + 1);
  };

  const handleSelectPage = (min: number, max: number) => {
    setMin(min);
    setMax(max);
    setPage(Math.floor(min / 10) + 1);
  };

  const updatePokemonOnDB = async (pokemon: IPokemon, on_album: boolean) => {
    await axios.put(`/api/cards/${pokemon._id}`, {
      on_album,
    });
  };

  const handleStopDrag = async (
    ui: DraggableData,
    pokemonId: number,
    uniqueId: string
  ) => {
    const cardXPosition = ui.node.offsetLeft + ui.lastX;
    const cardYPosition = ui.node.offsetTop + ui.lastY;
    const albumXPosition = refs.current[pokemonId - 1]?.current?.offsetLeft;
    const albumYPosition = refs.current[pokemonId - 1]?.current?.offsetTop;

    if (
      positionAccuracy(cardXPosition, albumXPosition) < 2 &&
      positionAccuracy(cardXPosition, albumXPosition) > -2 &&
      positionAccuracy(cardYPosition, albumYPosition) < 2 &&
      positionAccuracy(cardYPosition, albumYPosition) > -2
    ) {
      const poke =
        pokemonListState.find((p) => p.unique_id === uniqueId) || null;

      let pokemonToRemoveFromAlbum = null;

      setAlbumState((prevState) =>
        prevState.map((state) => {
          if (state.id === pokemonId) {
            if (state.pokemon) {
              pokemonToRemoveFromAlbum = state.pokemon;
            }
            return { ...state, pokemon: poke };
          }
          return state;
        })
      );

      if (pokemonToRemoveFromAlbum) {
        updatePokemonList("add", pokemonToRemoveFromAlbum);
        await updatePokemonOnDB(pokemonToRemoveFromAlbum, false);
      }
      if (poke) {
        updatePokemonList("delete", poke);
        await updatePokemonOnDB(poke, true);
      }
    }
  };

  useEffect(() => {
    const pokesFind = albumState.filter((a) => a.pokemon !== null);

    const perc = (pokesFind.length * 100) / albumState.length;
    setAlbumCompleteStatus(Number(perc.toFixed(1)));
  }, [albumState]);

  useEffect(() => {
    setAlbumState(album);
  }, [album]);

  return (
    <AlbumContext.Provider
      value={{
        albumState,
        max,
        min,
        page,
        refs,
        albumCompleteStatus,
        handleChangePage,
        handleStopDrag,
        handleSelectRegion,
        handleSelectPage,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}
