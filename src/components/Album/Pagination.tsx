import { Flex } from "@chakra-ui/react";
import { useAlbum } from "../../hooks/useAlbum";
import { ArrowButton } from "../ArrowButton";

export function Pagination() {
  const { handleChangePage, page, albumState, max } = useAlbum();

  return (
    <Flex justify="center" w="100%" mt="2" gap="8">
      <ArrowButton
        onClick={() => handleChangePage("prev")}
        disabled={page <= 1}
        direction="left"
      />
      <ArrowButton
        onClick={() => handleChangePage("next")}
        disabled={max >= albumState.length}
        direction="right"
      />
    </Flex>
  );
}
