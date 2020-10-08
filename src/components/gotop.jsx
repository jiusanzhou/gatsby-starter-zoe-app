
import React, { createRef, useEffect } from "react";
import { IconButton } from "@chakra-ui/core";
import scrollToAnchor from "../utils/scroll-to-anchor";

import { ArrowUpIcon } from "@chakra-ui/icons"

export default () => {
    let _ref = createRef();
    useEffect(() => {
        _ref.current = document
    }, [])
    return (
        <IconButton
            rounded="full"
            colorScheme="red"
            icon={<ArrowUpIcon />}
            position="absolute"
            top="0"
            right="0"
            transform="translateY(-50%)"
            onClick={scrollToAnchor(_ref.current, () => {})}
        />
    );
};
