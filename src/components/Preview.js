import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import BlasterCallout from "./BlasterCallout";
import Loader from "./Loader";
import ThemeOutput from "./ThemeOutput";
import { themeGet } from "styled-system";
import { Image, Box, Card, Icon, Text } from "@blasterjs/core";
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

const IconContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  height: 100%;
  overflow: auto;
`;

const ThemeContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  height: 100%;
  overflow: auto;
`;

const Uploader = styled(Card)`
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
  flex: 1;
  min-height: 300px;
`;

const Thumbnails = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const Thumbnail = styled(Box)`
  border: 1px solid ${themeGet("colors.gray300")};
  padding: 10px;
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Preview = props => {
  const [processing, setProcessing] = useState(false);
  const [files, setFiles] = useState([]);
  const [icons, setIcons] = useState([]);

  const prepSVGForTheme = async (files) => {
    for (let [i, file] of files.entries()) {
      let fileObj = {};
          fileObj.key = `_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          fileObj.originalName = file.name;
          fileObj.name = fileObj.originalName.replace(/(?:\.svg)/, "");
          fileObj.svgString = await readFileAsync(file);
          fileObj.svgOptimized = await optimizeSvgFile(fileObj.svgString);

      setIcons(icons => [...icons, fileObj]);

      if((i + 1) !== (files.length)){
        setProcessing(true);
      } else {
        setProcessing(false);
      }
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
      <Image src={file.preview} width="100%" maxHeight="100%" alt="file.name" />
    </Thumbnail>
  ));

  useEffect(() => {
    prepSVGForTheme(files);
  }, [files]);

  return (
    <Box display="flex" height="100vh">
      <IconContainer>
        <Uploader {
          ...getRootProps({ 
            isDragActive, 
            isDragAccept, 
            isDragReject })
        }>
          <input {...getInputProps()} />
          <Icon name="upload" size="60px" color="gray300" />
          <Text>Drop your icons here</Text>
        </Uploader>
        <Thumbnails>
          {IconThumbnails}
        </Thumbnails>
      </IconContainer>
      <ThemeContainer bg="offWhite">
        {processing ? <Loader /> : "" }
        <ThemeOutput icons={icons} />
        <BlasterCallout />
      </ThemeContainer>
    </Box>
  );
};

export default Preview;
