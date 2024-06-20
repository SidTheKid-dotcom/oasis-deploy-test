export default function CommentReplies({ replies }) {
    return (
        <div className="flex flex-col">
            {replies.map((reply, index) => (
                <div key={index} className="mt-[1rem] grid grid-cols-12 gap-1.5">
                    <div className="col-span-1 mb-[10px]">
                        <div className="cols-span-2 rounded-full h-full flex flex-col items-center justify-start">
                            <figure>
                                <img src='/github.svg' width="30px" height="30px"></img>
                            </figure>
                        </div>
                    </div>
                    <div className="col-span-10">
                        <div className="flex flex-col h-[30px] justify-center">
                            <div>{reply.comment_by.username}</div>
                        </div>
                        {
                            reply.gif_url ? (
                                <div className="max-w-[200px]">
                                    <figure>
                                        <img src={reply.gif_url}></img>
                                    </figure>
                                </div>

                            ) : (
                                <div className="open-sans">{reply.comment}</div>
                            )
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}