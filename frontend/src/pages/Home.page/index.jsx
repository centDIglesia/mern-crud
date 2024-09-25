import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";
import ProductCard from "../../components/product-card";

const HomePage = () => {
  
  const { fetchProducts, products = [] } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" px={4}>
      <VStack spacing={8}>
        <Text fontSize="30" fontWeight="bold" color="tomato" textAlign="center">
          Products
        </Text>

        {products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
            spacing={8}
          >
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize="20"
            fontWeight="semibold"
            color="#ff846e"
            textAlign="center"
          >
            No products yet,
            <Link to="/create">
              <Text as="span" ml="1" textDecor="underline">
                Add now
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
