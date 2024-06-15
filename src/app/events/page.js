"use client"

import EventsFeed from "./EventsFeed";

export default function EventsFeedPage() {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-3"></div>
            <div className="col-span-6">
                <EventsFeed />
            </div>
            <div className="col-span-3"></div>
        </div>
    )
}