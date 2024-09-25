import React, { useState } from "react";
import { useProductStore } from "../../store/product";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  HStack,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct, updateProduct } = useProductStore();

  const [currentProduct, setcurrentProduct] = useState(product);

  const handleDeleteProduct = async (productId) => {
    const { message, success } = await deleteProduct(productId);

    toast({
      title: success ? "Product Deleted" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleUpdateProduct = async () => {
    const { message, success } = await updateProduct(
      product._id,
      currentProduct
    );

    toast({
      title: success ? "Product Updated" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
    onClose();
  };

  return (
    <Box
      key={product._id}
      p={5}
      shadow="0 0 20px rgba(0,0,0,.08)"
      rounded={6}
      _hover={{
        shadow: "0 0 30px rgba(0,0,0,.12)",
        transform: "translateY(-5px)",
        transition: "all .3s ease-in",
      }}
      bg={useColorModeValue("#f7f7f7", "gray.800")}
    >
      <Grid templateRows="auto auto auto" gap={4}>
        <GridItem>
          <Box rounded={8} w="100%" h="200px">
            <Image
              src={product.image}
              alt={product.name}
              width="100%"
              height="100%"
              objectFit="cover"
              rounded={4}
            />
          </Box>
        </GridItem>

        <GridItem>
          <Text mt={4} fontWeight={"semibold"}>
            {product.name}
          </Text>
          <Text color={"gray.400"} fontSize={12}>
            $ {product.price}
          </Text>
        </GridItem>

        <GridItem>
          <HStack mt={4}>
            <Button
              bg="tomato"
              color="white"
              _hover={{ bg: "red.500" }}
              onClick={onOpen}
            >
              <AiOutlineEdit />
            </Button>
            <Button
              bg={"gray.500 "}
              _hover={{ bg: "gray.600", color: "white" }}
              onClick={() => handleDeleteProduct(product._id)}
            >
              <AiOutlineDelete />
            </Button>
          </HStack>
        </GridItem>
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="text"
                placeholder="Product name"
                name="name"
                value={currentProduct.name}
                onChange={(e) => {
                  setcurrentProduct({
                    ...currentProduct,
                    name: e.target.value,
                  });
                }}
              />
              <Input
                type="number"
                placeholder="Product Price"
                name="price"
                value={currentProduct.price}
                onChange={(e) => {
                  setcurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  });
                }}
              />
              <Input
                type="text"
                placeholder="Product Image"
                name="imageURL"
                value={currentProduct.image}
                onChange={(e) => {
                  setcurrentProduct({
                    ...currentProduct,
                    image: e.target.value,
                  });
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button bg="gray.600" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg="tomato" onClick={handleUpdateProduct}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
