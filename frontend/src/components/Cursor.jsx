import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

const Cursor = () => {
    const crsrRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            gsap.to(crsrRef.current, {
                x: e.clientX , // Center the cursor
                y: e.clientY,
                duration: 0.2,
                ease: "power3.out"
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <div
            ref={crsrRef}
            className='pointer-events-auto fixed z-[100] top-0 left-0 w-5 h-5 border-2 border-zinc-800 rounded-[4px] origin-center -translate-z-1/2 -translate-y-1/2'
        ></div>
    );
}

export default Cursor