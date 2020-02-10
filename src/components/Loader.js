import React from "react";
import styled, { keyframes } from "styled-components";
import { Box, Icon } from "@blasterjs/core";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(Icon)`
  animation: ${rotate} 2s linear infinite;
`

const Loader = () => {
  return (
    <Box
      position="absolute"
      zIndex="99"
      bg="rgba(255, 255, 255, .5)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      top="0"
      left="0"
      right="0"
      bottom="0"
    >
      <Spinner name="load" size="50px" />
    </Box>
  )
};

export default Loader;