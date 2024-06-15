"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import Event from "../../components/events/Event";
import { useAuth } from "@/context/authContext";

export default function EventsFeed() {
    
    const { token } = useAuth();

    const [events, setEvents] = useState([]);
    const [activeVideoId, setActiveVideoId] = useState(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://oasis-api.xyz/api/event/checkoutevents', {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.warn('Error occurred in fetching events: ', error);
            }
        };

        fetchEvents();

        return () => {
            // Cleanup
            setEvents([]);
        };
    }, []);

    return (
        <div>
            {events.map((event, index) => (
                <Event key={index} event={event} isActive={event.id === activeVideoId} setActiveVideoId={setActiveVideoId} muted={muted} setMuted={setMuted} />
            ))}
        </div>
    );
}