import CommentReplies from "./CommentReplies";
import { formatDistanceToNow } from 'date-fns';

import { useState } from "react";
import ReplyCommentBox from "./ReplyCommentBox";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';


export default function CommentFeed({ comments, setComments }) {
  const [viewReplies, setViewReplies] = useState(
    Array(comments.length).fill(false)
  );
  const [openReplyBox, setOpenReplyBox] = useState([]);

  const toggleViewReplies = (index) => {
    const newViewReplies = [...viewReplies];
    newViewReplies[index] = !newViewReplies[index];

    setViewReplies(newViewReplies);
  };

  const toggleReplyBox = (index) => {
    const newOpenReplyBox = [...openReplyBox];
    newOpenReplyBox.fill(false);

    newOpenReplyBox[index] = true;

    setOpenReplyBox(newOpenReplyBox);
  };

  return (
    <div className="flex flex-col gap-2 ">
      {comments.map((comment, index) => (
        <div key={index} className="mt-[1rem] mx-[0.5rem] grid grid-cols-12 gap-1">
          <div className="col-span-1 mb-[10px] ">
            <div className="rounded-full h-full flex flex-col items-center justify-start gap-2">
              <figure className="relative border border-white w-[40px] h-[40px] mt-[-0.4rem]  place-content-center rounded-full overflow-hidden">
                <Link href={`/profile/${comment.comment_by.id}`}>
                  <img
                    className="w-full object-cover"
                    src={comment.comment_by.profile_picture}
                  ></img>
                </Link>
              </figure>
              {viewReplies[index] && (
                <div className="relative rounded-full bg-slate-400 opacity-50 w-[2px] h-full">
                  <div className="absolute bottom-0 h-[1.5px] rounded-full w-[20px] bg-slate-400"></div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-10 pl-[0.95rem] sm:pl-[0.25rem]">
            <div className="flex flex-row h-[30px] justify-start pixel-text">
              <Link href={`/profile/${comment.comment_by.id}`}>
                <div className="break-words">{comment.comment_by.username}</div>
              </Link>
              <div className="text-gray-400 text-[0.75rem]">&nbsp;&bull;&nbsp;{formatDistanceToNow(comment.created_at, { addSuffix: true })}</div>
            </div>
            {comment.gif_url ? (
              <div className="max-w-[200px] mt-[0.5rem]">
                <figure>
                  <img src={comment.gif_url}></img>
                </figure>
              </div>
            ) : (
              <div className="open-sans py-2 break-words">
                <ReactMarkdown>{comment.comment}</ReactMarkdown>
              </div>
            )}
            <div className="flex flex-row gap-4 text-[0.75rem] mt-1">
              <button onClick={() => toggleReplyBox(index)}>Reply</button>
              {comment.child_comments.length > 0 &&
                <button
                  onClick={() => toggleViewReplies(index)}
                  className="text-slate-400"
                >
                  View Replies
                </button>
              }
            </div>
            {openReplyBox[index] && (
              <div className="mt-[10px]">
                <ReplyCommentBox
                  parent_id={comment.id}
                  comments={comments}
                  setComments={setComments}
                />
              </div>
            )}
            {viewReplies[index] && (
              <div className="mt-[10px]">
                <div>
                  <CommentReplies replies={comment.child_comments} />
                </div>
              </div>
            )}
          </div>
        </div>
      ))
      }
    </div >
  );
}
