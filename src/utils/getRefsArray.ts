import React from "react";

export const getRefsArray = (qtd: number) => {
  let refsArray = [];
  for (let i = 0; i <= qtd; i++) {
    refsArray.push(React.createRef());
  }
  return refsArray;
};
