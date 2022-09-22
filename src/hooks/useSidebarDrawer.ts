import { useContext } from "react";

import { SidebarDrawerContext } from "../context/SidebarDrawer";

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);

  return context;
}
