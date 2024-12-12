import { memo } from "react";
import './Spinner.scss';
import { SpinnerProps } from "./Spinner.types";

const Spinner = memo((props: SpinnerProps) =>
    <span className="rotating-spinner" style={{display: props.isVisible ? "inline-block" : "none"}}>🤔</span>
);

export default Spinner;