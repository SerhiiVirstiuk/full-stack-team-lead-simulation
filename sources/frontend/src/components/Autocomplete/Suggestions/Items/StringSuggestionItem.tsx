import Highlighter from '../../../Highlighter/Highlighter';
import './StringSuggestionItem.scss';
import { StringSuggestionItemProps } from "./StringSuggestionItem.types";

const StringSuggestionItemComponent = (props: StringSuggestionItemProps) => {
    const { value, searchValue } = props;
    const className = props.className ?? "string-suggestion";
    const styles = {
        height: props.itemHeight ?? 'auto'
    };

    if (!searchValue || !value.toLowerCase().startsWith(searchValue.toLowerCase())) {
        return <div className={className} style={styles}>{value}</div>;
    }

    const highlightPart = value.substring(0, searchValue.length);
    const remainingPart = value.substring(searchValue.length);

    return (
        <div className={className} style={styles}>
            <Highlighter>{highlightPart}</Highlighter>
            <span style={{whiteSpace: "pre-wrap"}}>{remainingPart}</span>
        </div>
    );
}

export default StringSuggestionItemComponent;