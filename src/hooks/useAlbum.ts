import { useContext } from "react";
import { AlbumContext } from "../context/Album";

export function useAlbum() {
  const context = useContext(AlbumContext);

  return context;
}
