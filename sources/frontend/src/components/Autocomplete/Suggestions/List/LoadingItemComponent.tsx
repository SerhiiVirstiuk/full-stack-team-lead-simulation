import { memo } from "react";
import { getRandomArbitrary } from "../../../../utilities/random";

const LoadingItemComponent = memo((props: {index: number}) => <div className="item-loading" style={{width: `${getRandomArbitrary(50, 70)}%`}}>
    <span>&nbsp;</span>
</div>);

export default LoadingItemComponent;