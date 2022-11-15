import { ReactNode, useCallback, useEffect, useState } from "react";
import { AchievementsContext } from "../context/Achievements";
import { useAlbum } from "../hooks/useAlbum";
import { usePokemons } from "../hooks/usePokemons";
import {
  achievementParams,
  achievementsParams,
  pokemonTypes,
  regions,
} from "../utils/constants";

interface AchievementsProviderProps {
  children: ReactNode;
}

export interface AchievementProps {
  title: string;
  achievement: string;
  level: "default" | "bronze" | "silver" | "gold" | string;
  levelValue: number;
  min: number;
  max: number;
  tooltip?: string;
}

/* const achievementsInitial: AchievementProps[] = [
  {
    min: 0,
    max: 40,
    title: "Inseto",
    achievement: "bug",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Sombrio",
    achievement: "dark",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Dragão",
    achievement: "dragon",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Eletrico",
    achievement: "electric",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Fada",
    achievement: "fairy",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Lutador",
    achievement: "fighting",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Fogo",
    achievement: "fire",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Voador",
    achievement: "flying",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Fantasma",
    achievement: "ghost",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Grama",
    achievement: "grass",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Terra",
    achievement: "ground",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Gelo",
    achievement: "ice",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Normal",
    achievement: "normal",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Venenoso",
    achievement: "poison",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Psíquico",
    achievement: "psychic",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Pedra",
    achievement: "rock",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Aço",
    achievement: "steel",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Água",
    achievement: "water",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Brilhante",
    achievement: "shine",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Lendário",
    achievement: "legendary",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Mitico",
    achievement: "mitic",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Atacante",
    achievement: "atack",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Defensivo",
    achievement: "defense",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "HP",
    achievement: "hp",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Velocista",
    achievement: "speed",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Ultra",
    achievement: "ultra",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Kanto",
    achievement: "kanto",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Johto",
    achievement: "johto",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Hoenn",
    achievement: "hoenn",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Sinnoh",
    achievement: "sinnoh",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Unova",
    achievement: "unova",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Kalos",
    achievement: "kalos",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Alola",
    achievement: "alola",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Galar",
    achievement: "galar",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
  {
    title: "Colecionador",
    achievement: "collector",
    level: "default",
    levelValue: 0,
    tooltip: "0 de 30",
  },
]; */

export function AchievementsProvider({ children }: AchievementsProviderProps) {
  const { albumState } = useAlbum();
  const { album, loading } = usePokemons();

  const [achievements, setAchievements] = useState<AchievementProps[]>([]);

  const getAchievementsByType = useCallback(() => {
    let achievementsType: AchievementProps[] = [];
    pokemonTypes.map((type) => {
      const pokemonsByType = album.filter((alb) =>
        alb.pokemon?.types.find((ty) => ty.name === type)
      );

      const param = achievementParams.find((ach) => ach.achievement === type);

      let level = "default";
      let max = 0;
      const pokemonQtd = pokemonsByType.length;

      if (param) {
        const perc = (pokemonQtd * 100) / param.maxValue;
        max = (param.maxValue * 40) / 100;

        if (param.maxValue === pokemonQtd) {
          level = "gold";
          max = param.maxValue;
        } else if (perc > 80 && perc <= 100) {
          level = "silver";
          max = param.maxValue;
        } else if (perc >= 40 && perc <= 80) {
          level = "bronze";
          max = (param.maxValue * 80) / 100;
        }
        // console.log(type, max, pokemonQtd, "perc", perc);
      }

      achievementsType.push({
        achievement: type,
        level,
        title: type,
        levelValue: pokemonQtd,
        tooltip: `${pokemonQtd} de ${param?.maxValue}`,
        min: 0,
        max,
      });
    });
    return achievementsType;
  }, [album]);

  useEffect(() => {
    if (!loading) {
      const achievementsByType = getAchievementsByType();
      setAchievements(achievementsByType);
    }
  }, [getAchievementsByType, loading]);

  useEffect(() => {
    console.log(achievements);
  }, [achievements]);

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}
