import { EffectCallback, useEffect, useRef } from "react"

export const useMountedEffect = (effect: EffectCallback) => {

    const mountedRef = useRef(false);

    useEffect(() => {

        if (! mountedRef.current) {
            effect();
        } else {
            mountedRef.current = true;
        }

    }, []);
}