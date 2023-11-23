import { throttle } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

export const useScrollEndReached = (fn: () => void) => {
    const elementRef = useRef<HTMLDivElement>(null);

    const throttleFunc = throttle(fn);

    const onScroll = useCallback(() => {

        if (elementRef.current) {
            const { bottom } = elementRef.current!.getBoundingClientRect();
    
            if (bottom - window.innerHeight < 400) {
                throttleFunc();
            }
        }
    }, [throttleFunc]);

    useEffect(() => {

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }

    }, [onScroll]);

    return elementRef;
};