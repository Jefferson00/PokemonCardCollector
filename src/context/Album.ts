import { createContext, MutableRefObject } from "react";
import { DraggableData } from "react-draggable";
import { IAlbum } from "../utils/interfaces";

interface AlbumContextData {
  albumState: IAlbum[];
  page: number;
  min: number;
  max: number;
  albumCompleteStatus: number;
  refs: MutableRefObject<any[]>;
  handleChangePage: (direction: "prev" | "next") => void;
  handleSelectRegion: (region: string) => void;
  handleStopDrag: (
    ui: DraggableData,
    pokemonId: number,
    uniqueId: string
  ) => void;
}

export const AlbumContext = createContext({} as AlbumContextData);
