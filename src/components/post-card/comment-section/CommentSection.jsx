import CommentBox from "./CommentBox";
import CommentFeed from "./CommentFeed";
import { Toaster } from "sonner";

export default function CommentSection({ postId, comments, setComments }) {
  return (
    <div className="w-full bg-black pixel-text text-white p-2 rounded-[10px]  mb-[50%] md:mb-0">
      <Toaster />
      <CommentBox postId={postId} setComments={setComments} />
      <CommentFeed comments={comments} setComments={setComments} />
    </div>
  );
}
