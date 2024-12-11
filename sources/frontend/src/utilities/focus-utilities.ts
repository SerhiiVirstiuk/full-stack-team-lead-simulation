import { RefObject } from "react";

export const hasFocus = (elementRef: RefObject<HTMLElement>, target: (EventTarget & Element) | null) => 
    elementRef.current && elementRef.current.contains(target)
