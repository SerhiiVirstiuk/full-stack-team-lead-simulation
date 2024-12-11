import { HighlighterProps } from "./Highlighter.types";

const HighlighterComponent = (props: HighlighterProps) => {
    const backgroundColor = props.color ?? '#FBF719';

    return <span style={{backgroundColor}}>{props.children}</span>
}

export default HighlighterComponent;