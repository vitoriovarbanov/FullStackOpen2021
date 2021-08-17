import React, { useState } from 'react';

const Header = (props) => {
    const [counter, setCounter] = useState(0)

    const handleClick = () => {
        setCounter(counter + 1)
    }

    /* setTimeout(() => {
        
    }, 1000) */

    return (
        <div>
            <div>
                {counter}
            </div>
            <button onClick={handleClick}>plus</button>
        </div>
    )
}

export default Header