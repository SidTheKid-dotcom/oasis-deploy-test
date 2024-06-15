import { useState } from "react"

export default function UserCommunities({ communities }) {
    
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className="flex flex-row gap-4">
                <button onClick={() => setActiveIndex(0)} className={`p-2 bg-black font-[2rem] rounded-full border border-solid ${activeIndex === 0 ? 'bg-blue-500' : 'border-slate-400'}`}>&nbsp;Created&nbsp;</button>
                <button onClick={() => setActiveIndex(1)} className={`p-2 bg-black font-[2rem] rounded-full border border-solid ${activeIndex === 1 ? 'bg-blue-500' : 'border-slate-400'}`}>&nbsp;Joined&nbsp;</button>
            </div>
            {
                activeIndex === 0 ?
                    communities.created.map((community, index) => {
                        return (
                            <div key={index} className="grid grid-cols-12 gap-3 bg-black my-4 border border-solid border-slate-400 rounded-2xl py-4 px-6">
                                <section className="col-span-3 flex flex-col justify-center">
                                    <figure>
                                        <img src={community.icon} width="175px" className="mt-[3px] h-auto border border-solid border-white rounded-[1rem]"></img>
                                    </figure>
                                </section>
                                <section className="col-span-9">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row w-full justify-between">
                                            <h1 className="font-bold text-4xl text-blue-500">{community.name}</h1>
                                            <div className="text-xl flex flex-row items-center gap-2">
                                                <figure>
                                                    <img src='/user-solid.svg' width="15px" height="15px"></img>
                                                </figure>
                                                {community.no_of_subscribers}</div>
                                            <div className="flex items-center">
                                                <button className="px-2 py-1 border border-solid border-slate-400 rounded-full">Following</button>
                                            </div>
                                            <div className="flex items-center">
                                                <button>
                                                    <img src='/ellipsis-vertical-solid.svg' width="5px"></img>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-justify">
                                            {community.description}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                    })
                    :
                    communities.joined.map((community, index) => {
                        return (
                            <div key={index} className="grid grid-cols-12 gap-3 bg-black my-4 border border-solid border-slate-400 rounded-2xl py-4 px-6">
                                <section className="col-span-3 flex flex-col justify-center">
                                    <figure>
                                        <img src={community.icon} width="175px" className="mt-[3px] h-auto border border-solid border-white rounded-[1rem]"></img>
                                    </figure>
                                </section>
                                <section className="col-span-9">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row w-full justify-between">
                                            <h1 className="font-bold text-4xl text-blue-500">{community.name}</h1>
                                            <div className="text-xl flex flex-row items-center gap-2">
                                                <figure>
                                                    <img src='/user-solid.svg' width="15px" height="15px"></img>
                                                </figure>
                                                {community.no_of_subscribers}</div>
                                            <div className="flex items-center">
                                                <button className="px-2 py-1 border border-solid border-slate-400 rounded-full">Following</button>
                                            </div>
                                            <div className="flex items-center">
                                                <button>
                                                    <img src='/ellipsis-vertical-solid.svg' width="5px"></img>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-justify">
                                            {community.description}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                    })
            }
        </div>
    )
}
