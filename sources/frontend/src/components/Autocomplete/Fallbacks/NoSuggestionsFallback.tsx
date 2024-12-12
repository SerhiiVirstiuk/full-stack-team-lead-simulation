import { memo } from "react";

const NoSuggestionsFallback = memo(() => 
    <div className="info-fallback">
        <span>No suggesstions for this input 😢</span>
    </div>
);

export default NoSuggestionsFallback;