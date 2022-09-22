import { addMinutes, format, isAfter, isBefore } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import api from "../../services/api";
import { IPokemon } from "../../utils/interfaces";
import Card from "../Card";
import * as S from "./styles";
import { ptBR } from "date-fns/locale";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getRefsArray } from "../../utils/getRefsArray";
import { getAlbumList } from "../../utils/getAlbumList";
import { getRegionPokedex } from "../../utils/getRegionPokedex";

interface IAlbum {
  id: number;
  pokemon: IPokemon | null;
}

export default function Main() {
  const pokemonQtd = 898; //max 898;
  let refs = useRef<any[]>(getRefsArray(pokemonQtd));

  const [albumState, setAlbumState] = useState<IAlbum[]>(
    getAlbumList(pokemonQtd)
  );
  const [pokemonListState, setPokemonListState] = useState<IPokemon[]>([]);
  const [active, setActive] = useState(true);
  const [nextTimeToClick, setNextTimeToClick] = useState<Date>();
  const [time, setTime] = useState(0);
  const [page, setPage] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);

  const [minCards, setMinCards] = useState(0);
  const [maxCards, setMaxCards] = useState(5);

  const [albumCompleteStatus, setAlbumCompleteStatus] = useState(0);

  const handleGetRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * (pokemonQtd - 1 + 1)) + 1;
    const shinyRate = Math.floor(Math.random() * (40 - 1 + 1)) + 1;

    let is_shiny = false;
    if (shinyRate === 1) is_shiny = true;
    const { data } = await api.get(`pokemon/${randomId}`);

    return {
      ...data,
      unique_id: Math.random(),
      is_shiny,
    };
  };

  const handleGetPokemons = async () => {
    const lastTimeClicked = new Date();
    setNextTimeToClick(addMinutes(new Date(lastTimeClicked), 5));

    localStorage.setItem("@pokemon-last-time-clicked", String(lastTimeClicked));
    setActive(false);

    let count = 1;
    let pokeArray = [];

    while (count < 6) {
      const pokemon = await handleGetRandomPokemon();
      pokeArray.push(pokemon);
      count++;
    }

    setPokemonListState([...pokemonListState, ...pokeArray]);
    setMaxCards([...pokemonListState, ...pokeArray].length);
    setMinCards([...pokemonListState, ...pokeArray].length - 5);
  };

  const handleSortCards = () => {
    let list = pokemonListState;
    list.sort((a, b) => a.id - b.id);
    setPokemonListState(list);

    setMaxCards(5);
    setMinCards(0);
  };

  const handleStopDrag = (
    ui: DraggableData,
    pokemonId: number,
    uniqueId: number
  ) => {
    const cardXPosition = ui.node.offsetLeft + ui.lastX;
    const cardYPosition = ui.node.offsetTop + ui.lastY;
    const albumXPosition = refs.current[pokemonId - 1]?.current?.offsetLeft;
    const albumYPosition = refs.current[pokemonId - 1]?.current?.offsetTop;

    console.log(cardXPosition);
    console.log(albumXPosition);

    if (
      positionAccuracy(cardXPosition, albumXPosition) < 2 &&
      positionAccuracy(cardXPosition, albumXPosition) > -2 &&
      positionAccuracy(cardYPosition, albumYPosition) < 2 &&
      positionAccuracy(cardYPosition, albumYPosition) > -2
    ) {
      const poke =
        pokemonListState.find((p) => p.unique_id === uniqueId) || null;

      setPokemonListState((prevState) =>
        prevState.filter((pokemon) => pokemon.unique_id !== uniqueId)
      );
      setAlbumState((prevState) =>
        prevState.map((state) => {
          if (state.id === pokemonId) {
            return { ...state, pokemon: poke };
          }
          return state;
        })
      );
    }
  };

  const positionAccuracy = (value1: number, value2: number) => {
    return ((value1 - value2) / ((value1 + value2) / 2)) * 100;
  };

  const handleChangeCards = (direction: "prev" | "next") => {
    if (direction === "prev" && minCards > 0) {
      setMaxCards(maxCards - 5);
      setMinCards(minCards - 5);
    } else if (direction === "next" && maxCards < pokemonListState.length) {
      setMaxCards(maxCards + 5);
      setMinCards(minCards + 5);
    }
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
    setMin(getRegionPokedex(region));
    setMax(getRegionPokedex(region) + 10);
  };

  useEffect(() => {
    const pokesFind = albumState.filter((a) => a.pokemon !== null);

    const perc = (pokesFind.length * 100) / albumState.length;
    setAlbumCompleteStatus(Number(perc.toFixed(1)));
  }, [albumState]);

  useEffect(() => {
    const lastTimeClicked = localStorage.getItem("@pokemon-last-time-clicked");
    if (lastTimeClicked) {
      setNextTimeToClick(addMinutes(new Date(lastTimeClicked), 1));
      if (isBefore(new Date(), addMinutes(new Date(lastTimeClicked), 1))) {
        setActive(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!active) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      if (nextTimeToClick && isAfter(new Date(), nextTimeToClick)) {
        setActive(true);
      }
    }
  }, [time, nextTimeToClick, active]);

  return (
    <S.Container>
      <S.ButtonContainer>
        <S.ButtonBox onClick={handleGetPokemons} disabled={!active}>
          {active && "Abrir"}
          {!active &&
            nextTimeToClick &&
            `Próximo pacote disponível às ${format(nextTimeToClick, "p", {
              locale: ptBR,
            })}`}
        </S.ButtonBox>
      </S.ButtonContainer>

      <S.Title>Meus Cards</S.Title>
      <S.CardList>
        {minCards > 0 && (
          <button onClick={() => handleChangeCards("prev")}>
            <FiChevronLeft />
          </button>
        )}
        {pokemonListState.slice(minCards, maxCards).map((pokemon, index) => (
          <Draggable
            key={pokemon.unique_id}
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            scale={1}
            onStop={(_, ui) =>
              handleStopDrag(ui, pokemon.id, pokemon.unique_id)
            }
          >
            <div className="handle">
              <Card pokemon={pokemon} />
            </div>
          </Draggable>
        ))}
        {maxCards < pokemonListState.length && (
          <button onClick={() => handleChangeCards("next")}>
            <FiChevronRight />
          </button>
        )}
      </S.CardList>
      <S.Row>
        <S.SortButton onClick={handleSortCards}>Organizar Cards</S.SortButton>
      </S.Row>

      <S.Title>Meu Album - {albumCompleteStatus}%</S.Title>
      <S.RegionList>
        <S.RegionSelector
          onClick={() => handleSelectRegion("kanto")}
          spanText="1 ao 151"
        >
          Kanto
        </S.RegionSelector>
        <S.RegionSelector
          onClick={() => handleSelectRegion("johto")}
          spanText="152 ao 251"
        >
          Johto{" "}
        </S.RegionSelector>
        <S.RegionSelector
          onClick={() => handleSelectRegion("hoenn")}
          spanText="252 ao 386"
        >
          Hoenn{" "}
        </S.RegionSelector>
        <S.RegionSelector
          onClick={() => handleSelectRegion("sinnoh")}
          spanText="387 ao 493"
        >
          Sinnoh{" "}
        </S.RegionSelector>
        <S.RegionSelector
          onClick={() => handleSelectRegion("unova")}
          spanText="494 ao 649"
        >
          Unova{" "}
        </S.RegionSelector>
        <S.RegionSelector
          onClick={() => handleSelectRegion("kalos")}
          spanText="650 ao 721"
        >
          Kalos{" "}
        </S.RegionSelector>
        <S.RegionSelector
          onClick={() => handleSelectRegion("alola")}
          spanText="722 ao 809"
        >
          Alola{" "}
        </S.RegionSelector>
        <S.RegionSelector
          onClick={() => handleSelectRegion("galar")}
          spanText="809 ao 898"
        >
          Galar{" "}
        </S.RegionSelector>
      </S.RegionList>
      <S.AlbumList>
        {albumState.slice(min, max).map((state, index) => (
          <S.AlbumItem key={state.id} ref={refs.current[state.id - 1]}>
            {state.pokemon ? <Card pokemon={state.pokemon} /> : state.id}
          </S.AlbumItem>
        ))}
      </S.AlbumList>

      <S.Pagination>
        <button onClick={() => handleChangePage("prev")} disabled={page <= 1}>
          <FiChevronLeft />
        </button>
        <button
          onClick={() => handleChangePage("next")}
          disabled={max >= albumState.length}
        >
          <FiChevronRight />
        </button>
      </S.Pagination>
    </S.Container>
  );
}
