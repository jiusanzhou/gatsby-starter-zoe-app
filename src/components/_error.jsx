import React from "react";
import { Code } from "@chakra-ui/core";
import Section from "./section";

export default ({ type }) => {
    return (
        <Section title={[
            `Not found component: `,
            <Code fontSize="lg">{type}</Code>
        ]}>
        </Section>
    );
};
