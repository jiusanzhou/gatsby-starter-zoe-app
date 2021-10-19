import React from "react";

import {
    FiTwitter,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiFacebook,
    FiLink,
} from "react-icons/fi";
import { RiTelegramLine, RiWechat2Line } from "react-icons/ri";
import { AiOutlineWechat } from "react-icons/ai";

import PropTypes from "prop-types";
import { List, ListItem, IconButton, Popover, PopoverTrigger, PopoverBody, PopoverContent, PopoverArrow, Box, Tooltip } from "@chakra-ui/react";
import MLink from "./link";
import MImage from "./image";

const _data_base = {
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://www.linkedin.com/in/",
    github: "https://github.com/",
    telegram: "https://t.me/",
    email: "mailto:",
    homepage: '',
    wechat: '',
};

const _data_icon = {
    facebook: <FiFacebook />,
    linkedin: <FiLinkedin />,
    twitter: <FiTwitter />,
    telegram: <RiTelegramLine />,
    github: <FiGithub />,
    email: <FiMail />,
    homepage: <FiLink />,
    wechat: <RiWechat2Line />,
};

export const SocialLink = ({ type, username, base, ...props }) => {
    // build url with type and username
    if (!base) base = _data_base[type];
    if (!username || typeof base !== 'string') return null;
    const icon = _data_icon[type];

    const iconButton = (
        <MLink pure href={`${base}${username}`} title={username}>
            <IconButton
                border="" size="sm" rounded="full"
                variant="outline" icon={icon} {...props} />
        </MLink>)

    if (type === "wechat") {
        return <Tooltip placement="top" hasArrow bg="white"
            label={<MImage w="10rem" h="10rem" src={username} />}>
            <IconButton
                border="" size="sm" rounded="full"
                variant="outline" icon={icon} {...props} />
        </Tooltip>
    }
    
    return iconButton;
};

export const Socials = ({ socials = {}, colorScheme, ...props }) => {
    return (
        <List d="flex" flexWrap="wrap" transform="translateX(-0.5rem)" {...props}>
            {Object.keys(socials||{}).map((key) => (
                (_data_icon[key] && socials[key]) ?
                <ListItem key={`_${key}`}>
                    <SocialLink
                        type={key}
                        username={socials[key]}
                        colorScheme={colorScheme}
                    />
                </ListItem> : null
            ))}
        </List>
    );
};

SocialLink.propTypes = {
    type: PropTypes.string.isRequired, // PropTypes.oneOf(Object.keys(_data_base)).isRequired,
    username: PropTypes.string.isRequired,
    base: PropTypes.string,
};

Socials.propTypes = {
    socials: PropTypes.object.isRequired,
};
