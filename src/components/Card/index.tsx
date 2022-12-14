/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import { useAlbum } from "../../hooks/useAlbum";
import { IPokemon } from "../../utils/interfaces";
import { BackPart } from "./BackPart";
import { Container } from "./Container";
import { FrontPart } from "./FrontPart";
import { Header } from "./Header";
import { PokemonName } from "./PokemonName";
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
      return pokemon.sprites.front_shiny;
    } else {
      return pokemon.sprites.front_default;
    }
  };

  return (
    <Container
      onDoubleClick={() =>
        setCardState((prevState) => (prevState === "front" ? "back" : "front"))
      }
      typeName={pokemon.types[0].name}
      isShine={pokemon.is_shiny}
      isNew={pokemon.is_new}
    >
      {isRepeated && !onAlbum && <Header pokemon={pokemon} />}
      <TypeBackground
        position="top"
        typeName={pokemon.types[0].name}
        isDoubleType={isDoubleType}
      />
      {pokemon.types[1] && (
        <TypeBackground
          position="bottom"
          typeName={pokemon.types[1].name}
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
    </Container>
  );
}
