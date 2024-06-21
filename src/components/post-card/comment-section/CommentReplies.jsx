import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function CommentReplies({ replies }) {

    const reversedReplies = [...replies].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div className="flex flex-col">
            {reversedReplies.map((reply, index) => (
                <div key={index} className="mt-[1rem] grid grid-cols-12 gap-1.5">
                    <div className="col-span-1 mb-[10px]">
                        <div className="cols-span-2 rounded-full h-full flex flex-col items-center justify-start">
                            <figure className="relative border border-white w-[40px] h-[40px] mt-[-0.4rem]  place-content-center rounded-full overflow-hidden">
                                <img
                                    className="w-full object-cover"
                                    src={reply.comment_by.profile_picture}
                                ></img>
                            </figure>
                        </div>
                    </div>
                    <div className="col-span-10">
                        <div className="flex flex-row h-[30px] justify-start pixel-text mb:[0.5rem]">
                            <Link href={`/profile/${reply.comment_by.id}`}>
                                <div className='break-words'>{reply.comment_by.username}</div>
                            </Link>
                            <div className="text-gray-400 text-[0.75rem]">&nbsp;&bull;&nbsp;{formatDistanceToNow(reply.created_at, { addSuffix: true })}</div>
                        </div>
                        {
                            reply.gif_url ? (
                                <div className="max-w-[200px]">
                                    <figure>
                                        <img src={reply.gif_url}></img>
                                    </figure>
                                </div>

                            ) : (
                                <div className="open-sans break-words">{reply.comment}</div>
                            )
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}