import { createContext } from "react";
import { AchievementProps } from "../containers/AchievementsProvider";

interface AchievementsContextData {
  achievements: AchievementProps[];
}

export const AchievementsContext = createContext({} as AchievementsContextData);
