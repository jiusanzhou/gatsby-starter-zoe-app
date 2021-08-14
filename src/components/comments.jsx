import { Box } from "@chakra-ui/react";
import React from "react";

class GiscusComments extends React.Component {

    constructor(props) {
        super(props);
        this.commentBox = React.createRef();
    }

    componentDidMount() {
        const { config = {} } = this.props;
        const {
            repo,
            repoID, // auto query
            categoryID , // auto query

            src,
            category,
            mapping,
            reactionsEnabled,
            theme,
            crossorigin,
            async 
        } = config

        const _src = src || "https://giscus.app/client.js"
        const _category = category || "Announcements"
        const _mapping = mapping || "pathname"
        const _reactionsEnabled = reactionsEnabled || "1"
        const _theme = theme || "light"
        const _crossorigin = crossorigin || "anonymous"
        const _async = async || true

        let scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", _src);
        scriptEl.setAttribute("data-category", _category);
        scriptEl.setAttribute("data-mapping", _mapping);
        scriptEl.setAttribute("data-reactions-enabled", _reactionsEnabled);
        scriptEl.setAttribute("data-theme", _theme);
        scriptEl.setAttribute("crossorigin", _crossorigin);
        scriptEl.setAttribute("async", _async);


        scriptEl.setAttribute("data-repo", repo);
        scriptEl.setAttribute("data-repo-id", repoID);
        scriptEl.setAttribute("data-category-id", categoryID);

        this.commentBox.current.appendChild(scriptEl);
    }

    render() {
        const { config, ...props } = this.props;
        return <Box w="full" {...props}>
            <Box ref={this.commentBox} />
        </Box>
    }
}

const providers = {
    giscus: GiscusComments,
}

const Comments = ({provider, ...props}) => {
    const _ = providers[provider]
    if (!_) return <div>unknown provider: {provider}</div>
    return React.createElement(_, props)
}

export default Comments;