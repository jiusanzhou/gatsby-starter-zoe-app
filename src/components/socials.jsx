import React from "react";

import {
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoGithub,
    IoLogoLinkedin,
    IoMdMail,
} from "react-icons/io";
import {
    FiTwitter,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiFacebook,
} from "react-icons/fi";

import { RiTelegramLine } from "react-icons/ri";

import PropTypes from "prop-types";
import { Link, List, ListItem, IconButton } from "@chakra-ui/core";

const _data_base = {
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    telegram: "https://t.me/",
    email: "mailto:",
};

const _data_icon = {
    facebook: <FiFacebook />,
    linkedin: <FiLinkedin />,
    twitter: <FiTwitter />,
    telegram: <RiTelegramLine />,
    github: <FiGithub />,
    email: <FiMail />,
};

export const SocialLink = ({ type, username, base, ...props }) => {
    // build url with type and username
    if (!base) base = _data_base[type];
    if (!username || !base) return null;
    const icon = _data_icon[type];
    return (
        <Link isExternal href={`${base}${username}`} title={username}>
            <IconButton
                border=""
                rounded="full"
                variant="outline"
                icon={icon}
                {...props}
            />
        </Link>
    );
};

export const Socials = ({ socials = [], colorScheme, ...props }) => {
    return (
        <List d="flex" flexWrap="wrap" {...props}>
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
