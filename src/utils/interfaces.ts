export interface IPokemon {
  id: number;
  name: string;
  types: ITypes[];
  sprites: {
    other: {
      home: {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: IStats[];
  is_shiny?: boolean;
  unique_id: string;
  ref_id?: string;
  _id?: string;
  is_new?: boolean;
}

export interface ITypes {
  type: {
    name: string;
  };
}

export interface IStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface IAlbum {
  id: number;
  pokemon: IPokemon | null;
}

export interface ICard {
  _id?: string;
  pokemon: IPokemon;
  on_album: boolean;
  user_email: string;
}
