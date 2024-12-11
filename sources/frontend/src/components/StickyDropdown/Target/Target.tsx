import { ReactElement, cloneElement, forwardRef } from "react";

export interface TargetProps {
    children: ReactElement<HTMLElement>
}

const TargetSubComponent = forwardRef<HTMLInputElement, TargetProps>((props, ref) => {
    return cloneElement(props.children as ReactElement, { ref });
});
export default TargetSubComponent;