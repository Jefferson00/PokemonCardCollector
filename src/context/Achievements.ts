import { createContext } from "react";
import { AchievementProps } from "../containers/AchievementsProvider";

interface AchievementsContextData {
  achievements: AchievementProps[];
  loadingAchievements: boolean;
}

export const AchievementsContext = createContext({} as AchievementsContextData);
