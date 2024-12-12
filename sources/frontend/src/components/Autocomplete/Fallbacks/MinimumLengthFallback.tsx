import { memo } from "react";
import { MinimumLengthFallbackProps } from "./Fallback.types";

const MinimumLengthFallback = memo((props: MinimumLengthFallbackProps) => (
    <div className="info-fallback">
        <div>⚠️ Type more than {props.expectedLength} characters to recieve suggestions.</div><div>Now you have only {props.actualLength}.</div>
    </div>
));

export default MinimumLengthFallback;