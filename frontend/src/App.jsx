import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.page";
import CreatePage from "./pages/Create.page";
import Navbar from "./components/navBar/index";

function App() {
  return (
    <Box
      minH={"100vh"}
      bg={useColorModeValue("gray.100", "gray.900")}
      fontFamily={"Poppins"}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
