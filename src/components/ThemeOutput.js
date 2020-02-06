import React, { useEffect, useState } from "react";
import { parse } from "svgson";
import { camelCase } from "camel-case";
import styled from "styled-components";
import { Card, Text } from "@blasterjs/core";

const ThemeOutput = ({icons, ...props}) => {
  const [theme, setTheme] = useState([]);

  function findPaths(obj) {
    return obj
  }

  const generateIconTheme = async () => {
    try {
      const iconMappedArrays = await Promise.all(
        icons.map(async i => {
          const svgJson = await parse(i.svgOptimized);
          const title = i.name;
          const viewBox = svgJson.attributes.viewBox;
          const path = svgJson.children.find(c => c.name === "path").attributes.d;
          return [
            camelCase(title),
            title,
            viewBox,
            path,
          ];
        })
      );
      
      const svgConfig = await iconMappedArrays.reduce((acc, arrs) => ({
        ...acc,
        [arrs[0]]: {
          title: arrs[1],
          viewBox: arrs[2],
          path: arrs[3]
        }
      }), {});

      setTheme(`export default ${JSON.stringify(svgConfig, null, 2)};`);
    } catch(e) {
      throw e;
    }
  }

  useEffect(() => {
    generateIconTheme(icons);
  }, [icons]);

  return (
    <Card height="400px" flex="none" overflow="auto">
      <Text as="pre">
        {theme}
      </Text>
    </Card>
  )
};

export default ThemeOutput;
