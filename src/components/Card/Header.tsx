import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FiTrash } from "react-icons/fi";
import { usePokemons } from "../../hooks/usePokemons";
import { IPokemon } from "../../utils/interfaces";

interface HeaderProps {
  pokemon: IPokemon;
}

export function Header({ pokemon }: HeaderProps) {
  const { onOpen, onClose, isOpen, onToggle } = useDisclosure();
  const { toggleRepeatedPokemon, repeatedCards, updatePokemonList } =
    usePokemons();

  const handleDeleteCard = async () => {
    updatePokemonList("delete", pokemon);
    await axios.delete(`/api/cards/${pokemon._id}`);
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        returnFocusOnClose={false}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={false}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <Flex
            position="absolute"
            top="2.5%"
            zIndex={2}
            align="center"
            justify="space-between"
            bg="rgba(0, 0, 0, 0.4)"
            backdropBlur="xl"
            px="2"
            borderRadius="4px"
            gap="2"
            opacity={0.5}
            _hover={{
              opacity: 1,
            }}
          >
            <Checkbox
              onChange={() => toggleRepeatedPokemon(pokemon)}
              isChecked={!!repeatedCards.find((p) => p._id === pokemon._id)}
            />
            <Text>Repetida</Text>

            <Button
              w="1rem"
              h="2rem"
              p={0}
              bg="transparent"
              _hover={{
                bg: "transparent",
              }}
              onClick={onToggle}
            >
              <Icon as={FiTrash} color="red.400" />
            </Button>
          </Flex>
        </PopoverTrigger>
        <PopoverContent bg="gray.600" w="11.5rem">
          <PopoverBody>Tem certeza que deseja excluir esse card?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={onToggle}>
                Não
              </Button>
              <Button colorScheme="red" onClick={handleDeleteCard}>
                Excluir
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
