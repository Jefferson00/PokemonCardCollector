import { Button, Flex, Text, ButtonProps } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAlbum } from "../../hooks/useAlbum";

interface RegionButtonProps extends ButtonProps {
  title: string;
  afterContent: string;
}

const RegionButton = ({ afterContent, title, ...rest }: RegionButtonProps) => {
  return (
    <Button
      position="relative"
      w="20"
      bg="gray.700"
      _after={{
        content: afterContent,
        position: "absolute",
        top: "-80%",
        left: "0",
        fontSize: "0.75rem",
        bg: "gray.300",
        p: "2",
        opacity: 0,
        w: "20",
        textAlign: "center",
      }}
      _hover={{
        bg: "gray.600",
        _after: {
          opacity: 1,
        },
      }}
      _active={{
        bg: "orange.400",
      }}
      {...rest}
    >
      <Text textTransform="capitalize">{title}</Text>
    </Button>
  );
};

export function RegionSelector() {
  const { handleSelectRegion, min } = useAlbum();

  const verifyRegionActive = useCallback(
    (interval: { start: number; end: number }) => {
      if (min + 1 >= interval.start && min + 1 <= interval.end) {
        return true;
      }
      return false;
    },
    [min]
  );

  return (
    <Flex gap="6" mt="6" flexWrap="wrap" justify="center">
      <RegionButton
        afterContent="'1 ao 151'"
        title="kanto"
        onClick={() => handleSelectRegion("kanto")}
        isActive={verifyRegionActive({ start: 1, end: 151 })}
      />
      <RegionButton
        afterContent="'152 ao 251'"
        title="johto"
        onClick={() => handleSelectRegion("johto")}
        isActive={verifyRegionActive({ start: 152, end: 251 })}
      />
      <RegionButton
        afterContent="'252 ao 386'"
        title="hoenn"
        onClick={() => handleSelectRegion("hoenn")}
        isActive={verifyRegionActive({ start: 252, end: 386 })}
      />
      <RegionButton
        afterContent="'387 ao 493'"
        title="sinnoh"
        onClick={() => handleSelectRegion("sinnoh")}
        isActive={verifyRegionActive({ start: 387, end: 493 })}
      />
      <RegionButton
        afterContent="'494 ao 649'"
        title="unova"
        onClick={() => handleSelectRegion("unova")}
        isActive={verifyRegionActive({ start: 494, end: 649 })}
      />
      <RegionButton
        afterContent="'650 ao 721'"
        title="kalos"
        onClick={() => handleSelectRegion("kalos")}
        isActive={verifyRegionActive({ start: 650, end: 721 })}
      />
      <RegionButton
        afterContent="'722 ao 809'"
        title="alola"
        onClick={() => handleSelectRegion("alola")}
        isActive={verifyRegionActive({ start: 722, end: 809 })}
      />
      <RegionButton
        afterContent="'809 ao 898'"
        title="galar"
        onClick={() => handleSelectRegion("galar")}
        isActive={verifyRegionActive({ start: 809, end: 898 })}
      />
    </Flex>
  );
}
