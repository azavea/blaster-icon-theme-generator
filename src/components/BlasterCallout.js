import React from "react";
import { A, Box, Text, Icon } from "@blasterjs/core";

const BlasterCallout = () => {
  return (
    <Box
      bg="primaryTint"
      border="1px solid"
      borderColor="primaryShade"
      borderRadius="4px"
      p="5px 20px"
      mt="10px"
      zIndex="10"
    >
      <Text>
        <Icon name="info" mr="10px" />
        This is a tool built for <A href="https://raster-foundry-blaster.netlify.com/">BlasterJS</A> for quickly generating a theme for custom icons
      </Text>
    </Box>
  )
};

export default BlasterCallout;