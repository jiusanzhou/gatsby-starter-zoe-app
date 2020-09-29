import React from "react";
import Section from "../components/section";
import { DownloadButtons } from "./app-release";

export default ({
    title, subTitle, description,
    action = {}, // register actions
...props }) => {
    return (
        <Section
            title={title}
            subTitle={subTitle}
            description={description}
            action={<Action {...action} />}
            h="calc(100vh - 5em)"
        ></Section>
    );
};

const _actions = {
    'downloader-app': DownloadButtons,
}

const Action = ({ type, ...props }) => {
    return _actions[type] && React.createElement(_actions[type], props)
}