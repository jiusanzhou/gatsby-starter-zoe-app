import React from "react";

import {
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoGithub,
    IoLogoLinkedin,
    IoMdMail,
} from "react-icons/io";

import { FaTelegramPlane } from "react-icons/fa";

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
    facebook: <IoLogoFacebook />,
    linkedin: <IoLogoLinkedin />,
    twitter: <IoLogoTwitter />,
    telegram: <FaTelegramPlane />,
    github: <IoLogoGithub />,
    email: <IoMdMail />,
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
                <ListItem
                    // mr=".2rem"
                    // mt=".2em"
                    key={`_${key}`}
                    _last={{
                        mr: "0rem",
                    }}
                >
                    <SocialLink type={key} username={socials[key]} colorScheme={colorScheme} />
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
