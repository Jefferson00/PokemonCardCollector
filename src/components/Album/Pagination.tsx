import { Button, Flex, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { useCallback } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useAlbum } from "../../hooks/useAlbum";
import { ArrowButton } from "../ArrowButton";

export function Pagination() {
  const { handleChangePage, page, albumState, max, min, handleSelectPage } =
    useAlbum();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const getNavigationButtons = useCallback(
    (type: "min" | "max") => {
      const nextMin = type === "min" ? min - 10 : min + 10;
      let buttonsQtd = nextMin / 10 < 86 ? 3 : 89 - nextMin / 10;
      let displayMin = 10 + nextMin + 1;
      let buttonsList = [];

      if (type === "min") {
        buttonsQtd = nextMin / 10 > 3 ? 3 : nextMin / 10;
        displayMin = nextMin - buttonsQtd * 10 + 1;
      }

      for (let i = 0; i < buttonsQtd; i++) {
        buttonsList.push(
          <Button
            key={i}
            minW="0"
            w={["8", "4rem"]}
            h={["8", "2rem"]}
            p={["2", "0"]}
            borderRadius={["50%", "8px"]}
            bg="gray.600"
            onClick={() => {
              if (type === "min") {
                let amount = nextMin - (buttonsQtd - i) * 10;
                handleSelectPage(amount, amount + 10);
              } else {
                let amount = nextMin + (i + 1) * 10;
                handleSelectPage(amount, amount + 10);
              }
            }}
          >
            {isMobile ? (
              <Icon as={type === "min" ? FiChevronsLeft : FiChevronsRight} />
            ) : (
              <Text as="strong" fontSize={["0.6rem", "0.75rem"]}>
                {displayMin}-{displayMin + 9}
              </Text>
            )}
          </Button>
        );
        displayMin = displayMin + 10;
      }
      return buttonsList;
    },
    [handleSelectPage, isMobile, min]
  );

  return (
    <Flex
      justify="center"
      w="100%"
      mt={["6", "2"]}
      gap={["4", "8"]}
      align="center"
    >
      {min > 0 && <Flex gap={["2", "4"]}>{getNavigationButtons("min")}</Flex>}
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
      {max < 898 && <Flex gap={["2", "4"]}>{getNavigationButtons("max")}</Flex>}
    </Flex>
  );
}
