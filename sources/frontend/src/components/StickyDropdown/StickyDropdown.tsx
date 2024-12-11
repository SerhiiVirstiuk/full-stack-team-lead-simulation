import './StickyDropdown.scss';
import { ReactElement, cloneElement, useEffect, useRef, useState } from 'react';
import { StickyDropdownProps } from './StickyDropdown.types';
import { numberToPxString } from '../../utilities/converters';
import { hasFocus } from '../../utilities/focus-utilities';

const updateDropdownWidthAndPosition = (
    targetElement: HTMLElement | null, 
    dropdown: HTMLDivElement | null,
    width?: number) => {
    if (targetElement && dropdown) {
        const targetElementToStickRect = targetElement.getBoundingClientRect();

        // New dropdown dimensions and position
        const dropdownWidth = width ?? targetElementToStickRect.width;
        const dropdownPosition = {
            left: targetElementToStickRect.left,
            top: targetElementToStickRect.bottom
        };

        if (dropdownWidth && dropdownPosition) {
            dropdown.style.width = numberToPxString(dropdownWidth);
            dropdown.style.left = numberToPxString(dropdownPosition.left);
            dropdown.style.top = numberToPxString(dropdownPosition.top - 1); // minus one pixel to make borders transition smooth
        }
    }
}

const StickyDropdownComponent = (props: StickyDropdownProps) =>
{
    const [target, content] = props.children;
    const [isOpen, setVisibility] = useState(props.isOpen ?? false);

    const containerRef = useRef<HTMLDivElement>(null);
    const targetElementRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Ref forwarding to assign it to Target child and get its dimensions
    const targetWithRef = cloneElement(target as ReactElement, { ref: targetElementRef });
    
    useEffect(() => {
        const targetElement = targetElementRef.current;
        const dropdown = dropdownRef.current;

        updateDropdownWidthAndPosition(
            targetElement, 
            dropdown,
            props.width)

        const resizeHandler = () => updateDropdownWidthAndPosition(
            targetElement, 
            dropdown,
            props.width);

        // In case of resize page could be changed accirding to media queries
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    const handleFocus = (event: React.FocusEvent<HTMLElement>) => setVisibility(hasFocus(containerRef, event.target) ?? false);
    const handleBlur = (event: React.FocusEvent<HTMLElement>) => setVisibility(hasFocus(containerRef, event.relatedTarget) ?? false);

    return (
        <div 
            className='dropdown-container'
            ref={containerRef}
            onFocus={handleFocus}
            onBlur={handleBlur}>
            {targetWithRef}
            <div 
                tabIndex={-1} // it's a trick to make focus/blur working properly
                ref={dropdownRef}
                className={`dropdown ${isOpen ? "open" : ""} ${props.className ?? ""}`}
                style={{
                    minHeight: props.minHeight,
                    maxHeight: props.maxHeight,
                }}>
                {content}
            </div>
        </div>

    );
}

export default StickyDropdownComponent;