import { Suspense } from "react";
import CreatePost from "./CreatePost"

export default function CreatePostPage() {
    const placeholders = {
        title: "Title",
        body: "Write a caption..."
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreatePost displayType={"POST"} placeholders={placeholders} />
        </Suspense>
    )
}