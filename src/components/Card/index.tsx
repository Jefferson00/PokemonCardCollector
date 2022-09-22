/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import { useAlbum } from "../../hooks/useAlbum";
import { getBackgroundColorFromType } from "../../utils/getBackgroundColorFromType";
import { IPokemon } from "../../utils/interfaces";
import { BackPart } from "./BackPart";
import { FrontPart } from "./FrontPart";
import { Header } from "./Header";
import { PokemonName } from "./PokemonName";
import * as S from "./styles";
import { TypeBackground } from "./TypeBackground";

interface CardProps {
  pokemon: IPokemon;
  onAlbum?: boolean;
}

export default function Card({ pokemon, onAlbum = false }: CardProps) {
  const { albumState } = useAlbum();
  const isDoubleType = pokemon.types.length > 1;
  const [cardState, setCardState] = useState("front");

  const isRepeated = useMemo((): boolean => {
    const cardFound = albumState.find(
      (state) => state.pokemon?.id === pokemon.id
    );
    if (cardFound) return true;
    return false;
  }, [albumState, pokemon.id]);

  const getSprite = () => {
    if (pokemon.is_shiny) {
      return pokemon.sprites.other.home.front_shiny;
    } else {
      return pokemon.sprites.other.home.front_default;
    }
  };

  return (
    <S.Container
      isShine={pokemon.is_shiny}
      backgroundColor={getBackgroundColorFromType(pokemon.types[0].type.name)}
      onDoubleClick={() =>
        setCardState((prevState) => (prevState === "front" ? "back" : "front"))
      }
    >
      {isRepeated && !onAlbum && <Header pokemon={pokemon} />}
      <TypeBackground
        position="top"
        typeName={pokemon.types[0].type.name}
        isDoubleType={isDoubleType}
      />
      {pokemon.types[1] && (
        <TypeBackground
          position="bottom"
          typeName={pokemon.types[1].type.name}
          isDoubleType={isDoubleType}
        />
      )}
      {cardState === "front" ? (
        <FrontPart sprite={getSprite()} isShiny={pokemon.is_shiny} />
      ) : (
        <BackPart
          sprite={getSprite()}
          stats={pokemon.stats}
          types={pokemon.types}
        />
      )}

      <PokemonName id={pokemon.id} name={pokemon.name} />
    </S.Container>
  );
}
