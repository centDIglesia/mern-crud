import React, { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Box,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../../store/product";

const CreatePage = () => {
  const toast = useToast();
  const [newProducts, setNewProducts] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const handleAddNewProducts = async () => {
    const { success, message } = await createProduct(newProducts);
    console.log(success + message);
    setNewProducts({
      name: "",
      price: "",
      image: "",
    });

    if (!success) {
      toast({
        position: "top-right",
        title: "Product was not created.",
        description: "There was an error creating the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top-right",
        title: "Product created successfully.",
        description: "Your product has been created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h3"} textAlign={"center"} mb={8}>
          Create a new Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Product name"
              name="name"
              value={newProducts.name}
              onChange={(e) =>
                setNewProducts({ ...newProducts, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Product Price"
              name="price"
              value={newProducts.price}
              onChange={(e) =>
                setNewProducts({ ...newProducts, price: e.target.value })
              }
            />

            <Input
              type="text"
              placeholder="Product Image"
              name="imageURL"
              value={newProducts.image}
              onChange={(e) =>
                setNewProducts({ ...newProducts, image: e.target.value })
              }
            />
            <Button mt={5} w={"full"} onClick={handleAddNewProducts}>
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
