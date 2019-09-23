import React from "react";
import styled from "styled-components";
import { Card } from "@blasterjs/core";

const StyledContainer = styled(Card)`
  textarea {
    -webkit-appearance: none;
    border: none;
    color: inherit;
    font: inherit;
    resize: none;
  }
`;

const PreviewOutput = (...props) => {
  return <StyledContainer>{props.value}</StyledContainer>;
};

export default PreviewOutput;
