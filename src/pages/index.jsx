import React from "react"
import { Link } from "gatsby"
import { css } from "linaria"

import Layout from "../layout"
import Section from "../components/section"
import Image from "../components/image"
import { Flex, Text } from "@chakra-ui/core"
import { DownloadButtons } from "../views/app-release"

const extendFooter = ( <Section
  className={ css`
    padding: 0;
    padding-bottom: 4.65rem;
  ` }
  theme="black"
  title="大集市"
  position="left"
  description="找对平台，躺着赚钱">

  </Section>
)

const IndexPage = () => (
  <Layout extendFooter={ extendFooter }>
    <Section
      title={"大集市"}
      subTitle="找对平台，躺着赚钱"
      description="Static websites and Progressive Web Applications are secure, scalable, SEO-friendly, and even up to 10x faster."
      action={<DownloadButtons itemPrefix="下载 " itemProps={{variantColor: "pink"}} />}
      wraperBg="url(https://s2.pstatp.com/ee/feishu_website/static/img/header-bg.fc2eac06b7.png)"
      h="calc(100vh - 5em)">
    </Section>
  </Layout>
)

export default IndexPage
