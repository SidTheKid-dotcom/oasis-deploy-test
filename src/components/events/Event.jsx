"use client"

import EventCardFeed from "./EventCardFeed";

import { useEffect, useRef, useState } from "react";

export default function Event({ event, isActive, setActiveVideoId, muted, setMuted }) {
    const eventRef = useRef(null);
    const playerRef = useRef();

    const [loadMedia, setLoadMedia] = useState(false);

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !loadMedia) {
                    setLoadMedia(true);
                    handleScroll(); // Update active video when event enters view
                }
            });
        }, { threshold: 0.5, root: null});

        const handleScroll = () => {
            if (eventRef.current) {
                const viewPortCenter = window.innerHeight / 2;
                const eventRect = eventRef.current.getBoundingClientRect();

                if (eventRect.top < viewPortCenter && viewPortCenter < eventRect.bottom) {
                    setActiveVideoId(event.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        if (eventRef.current) {
            observer.observe(eventRef.current);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    useEffect(() => {
        if (!isActive) {
            playerRef.current?.getInternalPlayer()?.pause();
        }
    }, [isActive]);


    return (
        <EventCardFeed loadMedia={loadMedia} event={event} isActive={isActive} muted={muted} setMuted={setMuted} eventRef={eventRef} playerRef={playerRef} />
    )
}
