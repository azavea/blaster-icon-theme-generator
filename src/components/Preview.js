import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { readFileAsync } from "./readFileAsync";
import PreviewOutput from "./PreviewOutput";
import { parse, stringify } from "svgson";
import { SVGO } from "svgo";
import { themeGet } from "styled-system";
import { Image, Box, Button, Card, Icon } from "@blasterjs/core";

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
  return "#eeeeee";
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
`;

const Preview = props => {
  const [files, setFiles] = useState([]);
  const [icons, setIcons] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  const processFile = async () => {
    const processedFiles = [];
    for await (let file of files) {
      let originalName = file.name;
      let key = `_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      let string = await readFileAsync(file);
      let name = originalName.replace(/(?:\.svg)/, "");
      processedFiles.push({ key, name, string });
    }
    if (processedFiles.length > 0) {
      setIcons([...processedFiles]);
      //parseSvg();
    } else if (processedFiles.length === 0) {
      setIcons([processedFiles]);
      //parseSvg();
    }
  };

  const parseSvg = icons => {
    for (let icon of icons) {
      parse(icon.string).then(json => {
        console.log(JSON.stringify(json, null, 2));
      });
    }
    console.log("hello");
    setShowOutput(true);
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
    }
  });

  const thumbs = files.map(file => (
    <Box
      key={file.lastModified}
      border="1px solid"
      borderColor="gray300"
      p="10px"
      m="10px"
      width="100px"
      height="100px"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={file.preview} width="100%" alt="file.name" />
    </Box>
  ));

  useEffect(() => {
    //parseSvg(icons);
  }, [icons]);

  return (
    <Box display="flex" height="100vh">
      <UploadContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <Icon name="upload" size="60px" color="gray300" />
        <p>Drop your icons here</p>
      </UploadContainer>
      <OutputContainer>
        <Button
          onClick={() => {
            processFile();
          }}
        >
          Do the thing
        </Button>
        {showOutput && <PreviewOutput value={icons} />}
        <Box display="flex" flexWrap="wrap">
          {thumbs}
        </Box>
      </OutputContainer>
    </Box>
  );
};

export default Preview;
