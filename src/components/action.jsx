import React from "react";
import PropTypes from "prop-types";

import { Box, Button, Text } from "@chakra-ui/react";

const Action = ({
    children,
    title,
    className,
    description,
    position = "bottom",
    to,
    onClick,
    ...props
}) => {
    return (
        <Box>
            <Button to={to} onClick={onClick} {...props}>
                {[title, children].filter((i) => i)}
            </Button>
            {description ? <Text>{description}</Text> : null}
        </Box>
    );
};

Action.propTypes = {
    description: PropTypes.node,
    children: PropTypes.node,
    position: PropTypes.oneOf(["top", "bottom"]),
    to: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Action;
