import {
  Flex,
  Container,
  Text,
  HStack,
  Button,
  Box,
  useColorMode,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import {
  AiOutlineSun,
  AiOutlineMoon,
  AiOutlinePlusSquare,
} from "react-icons/ai";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{
            base: "22",
            sm: "28",
          }}
          color={"tomato"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          <Link to="/">Shoppeetu</Link>
        </Text>

        <HStack spacing={4} alignItems={"center"}>
          <Link to="/create">
            <Box as="span">
              <AiOutlinePlusSquare />
            </Box>
          </Link>

          <Box as="span" cursor={"pointer"} onClick={toggleColorMode}>
            {colorMode === "light" ? <AiOutlineSun /> : <AiOutlineMoon />}
          </Box>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
