import React from 'react'
import { default as CommentsProvider } from "../components/comments"
import { useSiteMetadata } from "../utils/hooks";

const { comments } = useSiteMetadata()

const Comments = (props) => {
    return <CommentsProvider
        provider={comments.provider} config={comments} {...props} />
}

export default Comments