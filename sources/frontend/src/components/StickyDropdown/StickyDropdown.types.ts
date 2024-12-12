import { ReactElement } from "react";
import TargetSubComponent from "./Target/Target";
import ContentSubComponent from "./Content/Content";

export interface StickyDropdownProps {
    className?: string;
    isOpen?: boolean;
    width?: number;
    minHeight?: number;
    maxHeight?: number;
    onBlur?: () => void;
    children: [ReactElement<typeof TargetSubComponent>, ReactElement<typeof ContentSubComponent>];
}