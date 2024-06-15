import CreatePost from "./CreatePost"

export default function CreatePostPage() {
    const placeholders = {
        title: "Title",
        body: "Write a caption..."
    }

    return <CreatePost displayType={"POST"} placeholders={placeholders} />
}