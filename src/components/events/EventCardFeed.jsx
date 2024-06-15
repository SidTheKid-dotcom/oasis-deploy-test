"use client"

import ReactPlayer from "react-player";
import Link from 'next/link';

export default function EventCardFeed({ loadMedia, event, isActive, muted, setMuted, eventRef, playerRef }) {
    //const router = useRouter();

    const toggleMute = () => setMuted(prevMuted => !prevMuted);

    const renderMedia = () => {
        if (!loadMedia || !event.media_type) return <div className="w-full h-full bg-gray-300 animate-pulse" />;

        const media = event.media_type === 'video'
            ? (
                <div>
                    <div>
                        <button onClick={(e) => { e.stopPropagation(); toggleMute(); }}>{muted ? 'Unmute' : 'Mute'}</button>
                    </div>
                    <ReactPlayer id="event-video-player"
                        ref={playerRef}
                        controls
                        url={event.media}
                        width="100%"
                        height="100%"
                        muted={muted}
                        playing={isActive}
                    />
                </div>
            )
            : (
                <figure className="w-full h-full">
                    <img src={event.media} className="object-cover" width="100%" height="100%" alt="event Media" />
                </figure>
            );
        return (
            <div className="rounded-[10px] w-full min-h-[50px] overflow-hidden">{media}</div>
        );
    };

    return (
        <div ref={eventRef} className="lazy-event-card">
            <div className="my-[1rem] px-[2rem] text-white flex flex-col w-[70%] min-h-[100px] rounded-[15px] bg-[#2a313d]">
                <section>
                    <div className="mt-[1rem] grid grid-cols-12 items-center">
                        <div className="col-span-2 rounded-full overflow-hidden w-[50px] h-[50px] border border-solid border-white">
                            <figure className="w-full h-full">
                                {loadMedia ? (
                                    <img src={event.user.profile_picture || '/github.svg'} className="w-full h-full object-cover" alt="Profile Picture" />
                                ) : (
                                    <img src='/github.svg' className="w-full h-full object-cover" alt="Profile Picture" />
                                )}
                            </figure>
                        </div>
                        <div className="col-span-6 text-md flex flex-col justify-center">
                            <div className="font-bold">{event.user.username}</div>
                        </div>
                        <div className="col-span-1 flex flex-row justify-end">
                            <button>
                                <figure>
                                    <img src='/ellipsis-vertical-solid.svg' width="7px" height="12px" alt="Ellipsis Icon" />
                                </figure>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="my-[10px]">
                    <div className="text-[0.75rem]">{event.title}</div>
                    <div className="text-[0.75rem]">{event.description}</div>
                    <div className="text-[0.75rem]">{event.venue}</div>
                    <div className="grid grid-cols-12 text-[0.75rem]">
                        <div className="col-span-4">Start: {event.start.split('T')[0]}</div>
                        <div className="col-span-4"></div>
                        <div className="col-span-4">Time: {event.start.split('T')[1].split('.')[0]}</div>
                    </div>
                    <div className="grid grid-cols-12 text-[0.75rem]">
                        <div className="col-span-4">End: {event.end.split('T')[0]}</div>
                        <div className="col-span-4"></div>
                        <div className="col-span-4">Time: {event.end.split('T')[1].split('.')[0]}</div>
                    </div>
                </section>
                <section className="mb-[20px]">{renderMedia()}</section>
            </div>
        </div>
    );
}
