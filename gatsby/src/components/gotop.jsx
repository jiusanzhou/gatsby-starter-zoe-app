
import React, { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";

import { ArrowUpIcon } from "@chakra-ui/icons";

import smoothscroll from 'smoothscroll-polyfill';

export default ({...props}) => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, [])
    return (
        <IconButton
            rounded="full"
            icon={<ArrowUpIcon />}
            position="absolute"
            top="0"
            right={["1rem", "0"]}
            transform="translateY(-50%)"
            onClick={(e) => {
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            }}
            {...props}
        />
    );
};
