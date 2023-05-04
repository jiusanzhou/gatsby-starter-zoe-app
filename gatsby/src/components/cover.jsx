import { Box, Center, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { colors, genColor } from "../styles/colors"
import MImage from "./image"


const Cover = ({ title="", src, color="white", p=2, h=["10rem", "15rem"], ...props }) => {
    const baseColor = genColor(title.slice(0).charCodeAt() || 0)
    return src ? <MImage h={h} src={src} {...props} /> : <Center
        bgColor={useColorModeValue(`${baseColor}.200`, `${baseColor}.700`)}
        h={h} color={color} p={p} {...props}>
        <Heading isTruncated
            fontWeight={props.fontWeight||"bold"}
            fontSize={props.fontSize||"1rem"}
            textAlign={props.textAlign||"center"}>{title}</Heading>
    </Center>
    return <MImage h={h} src={src} {...props} fallback={
        <Center bgColor={useColorModeValue(`${baseColor}.200`, `${baseColor}.700`)} h={h} color={color} p={p} {...props}>
            <Heading isTruncated
                fontWeight={props.fontWeight||"bold"}
                fontSize={props.fontSize||"1rem"}
                textAlign={props.textAlign||"center"}>{title}</Heading>
        </Center>} />
}

export default Cover