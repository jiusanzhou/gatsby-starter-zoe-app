import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import loadable from "@loadable/component";

import themeLight from "prism-react-renderer/themes/github";
import themeDark from "prism-react-renderer/themes/nightOwl";

import {
    useClipboard, VisuallyHidden, useColorMode,
    IconButton, Box, Text,
} from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";


const getParams = (className = ``) => {
    const [lang = ``, params = ``] = className.split(`:`)

    return [
      lang.split(`language-`).pop().split(`{`).shift(),
    ].concat(
      params.split(`&`).reduce((merged, param) => {
        const [key, value] = param.split(`=`)
        merged[key] = value
        return merged
      }, {})
    )
}

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) return () => false;
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));
  return (index) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

const LazyLiveProvider = loadable(async () => {
    const Module = await import(`react-live`);
    const { LiveProvider, LiveEditor, LiveError, LivePreview } = Module;
    return (props) => (
      <LiveProvider {...props}>
        {props.showCopyButton && <Copy content={props.code} />}
        <LiveEditor data-name="live-editor" />
        <LiveError />
        <LivePreview data-name="live-preview" />
      </LiveProvider>
    );
})


const Copy = ({ content, duration = 5000, fileName = ``, trim = false }) => {
    const { copied, onCopy } = useClipboard(content)

    const label = copied
      ? `${fileName ? `${fileName} ` : ``}copied to clipboard`
      : `${fileName ? `${fileName}: ` : ``}copy code to clipboard`
  
    return (
      <IconButton
        name={label}
        disabled={copied}
        pos="absolute"
        d="none"
        right="0"
        onClick={onCopy}
        isRound
        _groupHover={{d: "block"}}
        bg="none"
        // _hover={{bg: "none"}}
        // variant="unstyled"
        icon={<CopyIcon />}
      >
        <VisuallyHidden>
            {label}
        </VisuallyHidden>
      </IconButton>
    )
}

const MCode = ({
    codeString,
    noLineNumbers = false,
    className,
    metastring = ``,
    ...props
}) => {
    const [language, { title = ``, showCopyButton = true }] = getParams(className);
    const shouldHighlightLine = calculateLinesToHighlight(metastring);
  
    const hasLineNumbers = !noLineNumbers && language !== `noLineNumbers`; // && showLineNumbers
  
    const { colorMode } = useColorMode()
    const theme = colorMode === "light" ? themeLight : themeDark;

    if (props[`react-live`]) {
      return (
        <Box fontSize="1rem" my="1em" className="react-live-wrapper">
          <LazyLiveProvider code={codeString} noInline theme={theme} showCopyButton={showCopyButton} />
        </Box>
      )
    }

    return (
        <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <React.Fragment>
              <Box role="group" my="1em"
                boxShadow="base" rounded="lg" pos="relative"
                className="gatsby-highlight" data-language={language}>
                  
                {showCopyButton && <Copy content={codeString} fileName={title} />}
                {title && (
                    <Box style={style} p=".2rem" paddingBottom=".5em" _before={{
                        background: "#fc625d",
                        borderRadius: "50%",
                        boxShadow: "20px 0 #fdbc40, 40px 0 #35cd4b",
                        content: "' '",
                        height: "12px",
                        left: "12px",
                        width: "12px",
                        marginTop: "6px",
                        position: "absolute",
                        zIndex: 1,
                    }}>
                        <Text textAlign="center">{title}</Text>
                    </Box>
                )}
                <Box as="pre" className={className}
                    overflow="scroll"
                    p=".5em 0"
                    style={style}
                    data-linenumber={hasLineNumbers}>
                  <Box as="code" className={`language-${language}`}>
                    {tokens.map((line, i) => {
                      const lineProps = getLineProps({ line, key: i })
    
                      if (shouldHighlightLine(i)) {
                        lineProps.className = `${lineProps.className} highlight-line`
                      }
    
                      return (
                        <Box {...lineProps} position="relative" _before={shouldHighlightLine(i) ? {
                          content: `""`,
                          position: `absolute`,
                          width: '4px', height: "100%",
                          backgroundColor: `rgb(2, 155, 206)`,
                        } : {}}>
                          {<Text
                            className="line-number"
                            position="relative" textAlign="center"
                            w={hasLineNumbers ? "3em" : ".5em"}
                            userSelect="none"
                            opacity="0.3" display="inline-block" as="span">
                              {hasLineNumbers ? i + 1 : ""}
                          </Text>}
                          {line.map((token, key) => (
                            <Box as="span" {...getTokenProps({ token, key })} />
                          ))}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
          )}
        </Highlight>
      ) 

}

export default MCode;