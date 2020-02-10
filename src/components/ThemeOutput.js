import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { parse } from "svgson";
import { camelCase } from "camel-case";
import { Card, Text } from "@blasterjs/core";
import { Button, Icon } from "@blasterjs/core";
import useClipboard from "react-use-clipboard";

const CopyButton = styled(Button)`
  position: fixed;
  top: 30px;
  right: 30px;
`

const ThemeOutput = ({icons, ...props}) => {
  const [theme, setTheme] = useState([]);
  const [isCopied, setCopied] = useClipboard(theme, {
    successDuration: 1000
  });

  const generateIconTheme = async (icons) => {
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
    <Card overflow="auto" flex="1">
      <CopyButton 
        onClick={setCopied} 
        scale="small"
        appearance={isCopied ? "prominent" : "default" } 
        intent={isCopied ? "success" : "secondary" }
      >
        {isCopied ? "Copied" : <Icon name="copy"/> }
      </CopyButton>
      <Text as="pre">
        {theme}
      </Text>
    </Card>
  )
};

export default ThemeOutput;
