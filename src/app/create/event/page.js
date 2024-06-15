import CreateEvent from "./CreateEvent"

export default function CreateEventPage() {
    const placeholders = {
        title: "Name",
        body: "Description"
    }

    return <CreateEvent displayType={"EVENT"} placeholders={placeholders} />
}