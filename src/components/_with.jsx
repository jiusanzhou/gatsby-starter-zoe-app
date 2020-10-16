import React from "react"
import { Tooltip } from "@chakra-ui/core";

export const _withTooltip = (props) => {
    return props.label ? <Tooltip {...props} /> : props.children;
};