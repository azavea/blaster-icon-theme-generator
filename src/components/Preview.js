import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ThemeOutput from "./ThemeOutput";
import { themeGet } from "styled-system";
import { Image, Box, Button, Card, Icon, Text } from "@blasterjs/core";
import { readFileAsync } from "../utils/readFileAsync";
import { optimizeSvgFile } from "../utils/optimizeSvgFile";

//https://github.com/svg/svgo/issues/1050

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#c0c5d8";
};

const UploadContainer = styled(Card)`
  width: 50%;
  margin: 20px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: ${themeGet("colors.white")};
  color: ${themeGet("colors.textBase")};
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-style: italic;
`;

const OutputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  height: 100%;
  overflow: auto;
`;

const Thumbnail = styled(Box)`
  border: 1px solid ${themeGet("colors.gray300")};
  padding: 10px;
  margin: 10px;
  width: 100px;
  height: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Preview = props => {
  const [files, setFiles] = useState([]);
  const [icons, setIcons] = useState([]);

  const prepSVGForTheme = async () => {
    files.map(async i => {

    })
    for (let file of files) {
      let fileObj = {};
          fileObj.key = `_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          fileObj.originalName = file.name;
          fileObj.name = fileObj.originalName.replace(/(?:\.svg)/, "");
          fileObj.svgString = await readFileAsync(file);
          fileObj.svgOptimized = await optimizeSvgFile(fileObj.svgString);

      setIcons(icons => [...icons, fileObj]);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/svg+xml",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      setIcons([]);
    }
  });

  const IconThumbnails = files.map(file => (
    <Thumbnail key={file.path}>
      <Image src={file.preview} width="100%" alt="file.name" />
    </Thumbnail>
  ));

  return (
    <Box display="flex" height="100vh">
      <UploadContainer {
        ...getRootProps({ 
          isDragActive, 
          isDragAccept, 
          isDragReject })
      }>
        <input {...getInputProps()} />
        <Icon name="upload" size="60px" color="gray300" />
        <Text>Drop your icons here</Text>
      </UploadContainer>
      <OutputContainer>
        <Button
          mb="1"
          intent="primary"
          appearance="prominent" 
          onClick={() => { prepSVGForTheme(); }}
        >
          Create your theme
        </Button>
        <ThemeOutput icons={icons} />
        <Box display="flex" flexWrap="wrap">
          {IconThumbnails}
        </Box>
      </OutputContainer>
    </Box>
  );
};

export default Preview;
