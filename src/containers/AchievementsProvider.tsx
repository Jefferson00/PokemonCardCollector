import { ReactNode, useCallback, useEffect, useState } from "react";
import { AchievementsContext } from "../context/Achievements";
import { useAlbum } from "../hooks/useAlbum";
import { usePokemons } from "../hooks/usePokemons";
import {
  achievementParams,
  achievementsLocale,
  IAchievements,
  IRegionsParam,
  legendaries,
  mitics,
  pokemonTypes,
  regionsParam,
  statsParam,
  ultraBeasts,
} from "../utils/constants";
import { IAlbum } from "../utils/interfaces";

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

interface IGetAchievementsOptions<T> {
  arrayParams: T[];
  filterFn: (a: T) => IAlbum[];
  filterOption: (a: T) => string;
}

export function AchievementsProvider({ children }: AchievementsProviderProps) {
  const { albumState } = useAlbum();
  const { loading } = usePokemons();
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  const [achievements, setAchievements] = useState<AchievementProps[]>([]);

  const getAchievements = useCallback(
    <T extends unknown>(options: IGetAchievementsOptions<T>) => {
      const { arrayParams, filterFn, filterOption } = options;
      let achievementsType: AchievementProps[] = [];

      arrayParams.map((a) => {
        const pokemonFilter = filterFn(a);

        const param = achievementParams.find(
          (ach) => ach.achievement === filterOption(a)
        );

        if (param) {
          let level = "default";
          let max = 0;
          const pokemonQtd = pokemonFilter.length;

          const perc = (pokemonQtd * 100) / param.maxValue;
          max = (param.maxValue * 40) / 100;

          if (pokemonQtd >= param.maxValue) {
            level = "gold";
            max = param.maxValue;
          } else if (perc > 80 && perc <= 100) {
            level = "silver";
            max = param.maxValue;
          } else if (perc >= 40 && perc <= 80) {
            level = "bronze";
            max = (param.maxValue * 80) / 100;
          }

          achievementsType.push({
            achievement: filterOption(a),
            level,
            title: achievementsLocale[filterOption(a) as IAchievements],
            levelValue: pokemonQtd,
            tooltip: `${pokemonQtd} de ${param?.maxValue}`,
            min: 0,
            max,
          });
        }
      });

      return achievementsType;
    },
    []
  );

  const getAllAchievements = useCallback(async () => {
    await new Promise((resolve) => {
      const achievementRegionOptions: IGetAchievementsOptions<IRegionsParam> = {
        arrayParams: regionsParam,
        filterFn: (a) => albumState.slice(a.start, a.ends),
        filterOption: (a) => a.name,
      };
      const achievementStatsOptions: IGetAchievementsOptions<string> = {
        arrayParams: statsParam,
        filterFn: (a) =>
          albumState.filter((alb) =>
            alb.pokemon?.stats.find((s) => s.name === a && s.base_stat >= 90)
          ),
        filterOption: (a) => a,
      };
      const achievementsByTypeOptions: IGetAchievementsOptions<string> = {
        arrayParams: pokemonTypes,
        filterFn: (a) =>
          albumState.filter((alb) =>
            alb.pokemon?.types.find((ty) => ty.name === a)
          ),
        filterOption: (a) => a,
      };
      const achievementShinesOptions: IGetAchievementsOptions<string> = {
        arrayParams: ["shine"],
        filterFn: () => albumState.filter((alb) => alb.pokemon?.is_shiny),
        filterOption: (a) => a,
      };
      const achievementLegendaryOptions: IGetAchievementsOptions<string> = {
        arrayParams: ["legendary"],
        filterFn: () =>
          albumState.filter((alb) =>
            legendaries.some((l) => l === alb.pokemon?.id)
          ),
        filterOption: (a) => a,
      };
      const achievementMiticOptions: IGetAchievementsOptions<string> = {
        arrayParams: ["mitic"],
        filterFn: () =>
          albumState.filter((alb) => mitics.some((l) => l === alb.pokemon?.id)),
        filterOption: (a) => a,
      };
      const achievementUltraBeastsOptions: IGetAchievementsOptions<string> = {
        arrayParams: ["ultra"],
        filterFn: () =>
          albumState.filter((alb) =>
            ultraBeasts.some((l) => l === alb.pokemon?.id)
          ),
        filterOption: (a) => a,
      };
      const achievementCollectorOptions: IGetAchievementsOptions<string> = {
        arrayParams: ["collector"],
        filterFn: () => albumState,
        filterOption: (a) => a,
      };

      const achievementRegion = getAchievements<IRegionsParam>(
        achievementRegionOptions
      );
      const achievementStats = getAchievements<string>(achievementStatsOptions);
      const achievementShines = getAchievements<string>(
        achievementShinesOptions
      );
      const achievementLegendary = getAchievements<string>(
        achievementLegendaryOptions
      );
      const achievementMitic = getAchievements<string>(achievementMiticOptions);
      const achievementUltraBeasts = getAchievements<string>(
        achievementUltraBeastsOptions
      );
      const achievementsByType = getAchievements<string>(
        achievementsByTypeOptions
      );
      const achievementsCollector = getAchievements<string>(
        achievementCollectorOptions
      );

      setAchievements([
        ...achievementsByType,
        ...achievementStats,
        ...achievementRegion,
        ...achievementShines,
        ...achievementLegendary,
        ...achievementMitic,
        ...achievementUltraBeasts,
        ...achievementsCollector,
      ]);
      resolve(true);
    });
    setLoadingAchievements(false);
  }, [albumState, getAchievements]);

  useEffect(() => {
    if (!loading) {
      getAllAchievements();
    }
  }, [getAllAchievements, loading]);

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        loadingAchievements,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}
