
import React from "react";
import { IconButton } from "@chakra-ui/core";

import { ArrowUpIcon } from "@chakra-ui/icons";

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

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
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            }}
            {...props}
        />
    );
};
