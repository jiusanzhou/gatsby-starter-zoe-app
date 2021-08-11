import { Box, Center, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { colors } from "../styles/colors"


const Cover = ({ title="", src, color="white", p=2, h=["10rem", "15rem"], ...props }) => {
    const baseColor = colors[(title.slice(0).charCodeAt() || 0) % colors.length]
    return <Image h={h} {...props} fallback={
            <Center bgColor={useColorModeValue(`${baseColor}.200`, `${baseColor}.700`)} h={h} color={color} p={p} {...props}>
                <Heading isTruncated
                    fontWeight={props.fontWeight||"bold"}
                    fontSize={props.fontSize||"1rem"}
                    textAlign={props.textAlign||"center"}>{title}</Heading>
            </Center>}>
    </Image>
}

export default Cover