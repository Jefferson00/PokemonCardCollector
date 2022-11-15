import { useContext } from "react";
import { AchievementsContext } from "../context/Achievements";

export function useAchievements() {
  const context = useContext(AchievementsContext);

  return context;
}
