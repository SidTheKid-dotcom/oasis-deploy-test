export default function Links({ links, setShowLinks }) {

    const handleCloseWindow = () => {
        setShowLinks(false);
    }

    return (
        <div className="opacity-100 grid grid-cols-12 h-full">
            <div className="col-span-2"></div>
            <div className="col-span-7 flex flex-col items-center justify-center">
                <section className="max-w-[500px] flex flex-col w-[50%] bg-[#2a313d] rounded-[5px] p-2">
                    <div className="flex flex-row justify-between">
                        <h1 className="font-bold text-2xl">My Socials</h1>
                        <button onClick={handleCloseWindow} className="mt-[-7px] mr-[5px]">X</button>
                    </div>
                    <div>
                        {
                            links.length == 0 ? (
                                <div>

                                </div>
                            ) : (
                                <div>
                                    <div className="h-[25px]"></div>
                                    <div className="flex flex-col gap-4 text-lg ml-[15px]">
                                        <div className="flex flex-row gap-3">
                                            <figure>
                                                <img src="/instagram.svg" width="20px" height="20px" className="mt-[5px]"></img>
                                            </figure>
                                            {links.instagram}
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <figure>
                                                <img src="/github.svg" width="20px" height="20px" className="mt-[5px]"></img>
                                            </figure>
                                            {links.github}
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <figure>
                                                <img src="/reddit-alien.svg" width="20px" height="20px" className="mt-[4px]"></img>
                                            </figure>
                                            {links.reddit}
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <figure>
                                                <img src="/discord.svg" width="20px" height="20px" className="mt-[7px]"></img>
                                            </figure>
                                            {links.discord}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
            </div>
            <div className="col-span-3"></div>
        </div>
    )
}