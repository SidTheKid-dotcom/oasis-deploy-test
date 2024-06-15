import CommentBox from "./CommentBox";
import CommentReplies from "./CommentReplies"

import { useState } from "react";
import ReplyCommentBox from "./ReplyCommentBox";

export default function CommentFeed({ comments, setComments }) {

    const [viewReplies, setViewReplies] = useState(Array(comments.length).fill(false));
    const [openReplyBox, setOpenReplyBox] = useState([]);

    const toggleViewReplies = (index) => {
        const newViewReplies = [...viewReplies];
        newViewReplies[index] = !newViewReplies[index];

        setViewReplies(newViewReplies);
    }

    const toggleReplyBox = (index) => {
        const newOpenReplyBox = [...openReplyBox];
        newOpenReplyBox.fill(false);

        newOpenReplyBox[index] = true;

        setOpenReplyBox(newOpenReplyBox);
    }

    return (
        <div className="flex flex-col gap-2">
            {comments.map((comment, index) => (
                <div key={index} className="mt-[1rem] grid grid-cols-12">
                    <div className="col-span-1 mb-[10px]">
                        <div className="cols-span-2 rounded-full h-full flex flex-col items-center justify-start">
                            <figure>
                                <img src='/github.svg' width="30px" height="30px"></img>
                            </figure>
                            {
                                viewReplies[index] && <div className="mt-1 rounded-full bg-slate-400 opacity-50 w-[2px] h-full"></div>
                            }
                        </div>
                    </div>
                    <div className="col-span-10">
                        <div className="flex flex-col h-[30px] justify-center">
                            <div>{comment.comment_by.username}</div>
                        </div>
                        {
                            comment.gif_url ? (
                                <div className="max-w-[200px]">
                                    <figure>
                                        <img src={comment.gif_url}></img>
                                    </figure>
                                </div>
                            ) : (
                                <div>{comment.comment}</div>
                            )
                        }
                        <div className="flex flex-row gap-4">
                            <button onClick={() => toggleReplyBox(index)}>Reply</button>
                            <button onClick={() => toggleViewReplies(index)} className="text-slate-400">View Replies</button>
                        </div>
                        {
                            openReplyBox[index] && (
                                <div className="mt-[10px]">
                                    <ReplyCommentBox parent_id={comment.id} comments={comments} setComments={setComments} />
                                </div>
                            )
                        }
                        {
                            viewReplies[index] && (
                                <div className="mt-[10px]">
                                    <div>
                                        <CommentReplies replies={comment.child_comments} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
            )
            }
        </div>
    )
}