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
        if (ref.current) ref.current.scrollIntoView({ block: "nearest" })
    }, [messageAdded]);
    return <div ref={ref} />
}