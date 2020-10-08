
import React, { createRef, useEffect } from "react";
import { IconButton } from "@chakra-ui/core";
import scrollToAnchor from "../utils/scroll-to-anchor";

import { ArrowUpIcon } from "@chakra-ui/icons"

export default ({...props}) => {
    return (
        <IconButton
            rounded="full"
            icon={<ArrowUpIcon />}
            position="absolute"
            top="0"
            right="0"
            transform="translateY(-50%)"
            onClick={(e) => {
                let fn = scrollToAnchor(document, () => {})
                fn(e)
            }}
            {...props}
        />
    );
};