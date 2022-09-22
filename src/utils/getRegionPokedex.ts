export const getRegionPokedex = (region: string) => {
  switch (region) {
    case "kanto":
      return 0;
    case "johto":
      return 151;
    case "hoenn":
      return 251;
    case "sinnoh":
      return 386;
    case "unova":
      return 493;
    case "kalos":
      return 649;
    case "alola":
      return 721;
    case "galar":
      return 809;

    default:
      return 0;
  }
};
