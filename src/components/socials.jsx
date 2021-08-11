import React from "react";

// import {
//     IoLogoFacebook,
//     IoLogoTwitter,
//     IoLogoGithub,
//     IoLogoLinkedin,
//     IoMdMail,
// } from "react-icons/io";
import {
    FiTwitter,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiFacebook,
    FiLink,
} from "react-icons/fi";
import { RiTelegramLine } from "react-icons/ri";

import PropTypes from "prop-types";
import { List, ListItem, IconButton } from "@chakra-ui/react";
import MLink from "./link";

const _data_base = {
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://www.linkedin.com/in/",
    github: "https://github.com/",
    telegram: "https://t.me/",
    email: "mailto:",
    homepage: '',
};

const _data_icon = {
    facebook: <FiFacebook />,
    linkedin: <FiLinkedin />,
    twitter: <FiTwitter />,
    telegram: <RiTelegramLine />,
    github: <FiGithub />,
    email: <FiMail />,
    homepage: <FiLink />
};

export const SocialLink = ({ type, username, base, ...props }) => {
    // build url with type and username
    if (!base) base = _data_base[type];
    if (!username || typeof base !== 'string') return null;
    const icon = _data_icon[type];
    return (
        <MLink pure href={`${base}${username}`} title={username}>
            <IconButton
                border=""
                size="sm"
                rounded="full"
                variant="outline"
                icon={icon}
                {...props}
            />
        </MLink>
    );
};

export const Socials = ({ socials = [], colorScheme, ...props }) => {
    return (
        <List d="flex" flexWrap="wrap" transform="translateX(-0.5rem)" {...props}>
            {Object.keys(socials).map((key) => (
                <ListItem key={`_${key}`}>
                    <SocialLink
                        type={key}
                        username={socials[key]}
                        colorScheme={colorScheme}
                    />
                </ListItem>
            ))}
        </List>
    );
};

SocialLink.propTypes = {
    type: PropTypes.oneOf(Object.keys(_data_base)).isRequired,
    username: PropTypes.string.isRequired,
    base: PropTypes.string,
};

Socials.propTypes = {
    socials: PropTypes.object.isRequired,
};
