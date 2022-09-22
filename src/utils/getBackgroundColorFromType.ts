export const getBackgroundColorFromType = (type: string) => {
  switch (type) {
    case "normal":
      return "#919AA1";
    case "water":
      return "#4E90D6";
    case "steel":
      return "#53879C";
    case "rock":
      return "#C7B78B";
    case "psychic":
      return "#F86E73";
    case "poison":
      return "#A566C7";
    case "ice":
      return "#73CEC0";
    case "ground":
      return "#D97745";
    case "grass":
      return "#60B953";
    case "ghost":
      return "#5369AC";
    case "flying":
      return "#90A9DE";
    case "fire":
      return "#FF9C54";
    case "fighting":
      return "#CE406A";
    case "fairy":
      return "#ED8CE5";
    case "electric":
      return "#F4D23C";
    case "dragon":
      return "#0969C1";
    case "dark":
      return "#5A5366";
    case "bug":
      return "#90C12D";

    default:
      return "#ff842b";
  }
};
