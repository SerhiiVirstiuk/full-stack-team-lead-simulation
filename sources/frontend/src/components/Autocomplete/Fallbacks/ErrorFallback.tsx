import { memo } from "react";
import { ErrorFallbackProps } from "./Fallback.types";

const ErrorFallback = memo((props: ErrorFallbackProps) => 
    <div className="error-fallback">
        <span>⛔ Error occured: {props.errorMessage}</span>
    </div>);

export default ErrorFallback;