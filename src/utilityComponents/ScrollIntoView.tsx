import { useEffect, useRef } from "react";

interface ScrollIntoViewProps {
    messageAdded: number
}

export default function ScrollIntoView({ messageAdded }: ScrollIntoViewProps) {
    const ref = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        if ('scrollRestoration' in history) {
            // Back off, browser, I got this...
            history.scrollRestoration = 'manual';
        }
        if (ref.current != null) {
            setTimeout(() => {
                ref.current?.scrollIntoView({ block: "nearest", behavior:"smooth" })
            }, 100);
        }
    }, [messageAdded]);
    return <div ref={ref} />
}