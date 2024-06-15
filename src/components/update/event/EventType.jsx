export default function EventType({ eventType, setEventType }) {

    const handleChange = (event) => {
        setEventType(event);
    };

    return (
        <div className="flex flex-row gap-4">
            <div>
                Type of Event:
            </div>
            <div>
                <select onChange={handleChange} className="p-2 bg-black rounded-[5px] w-[120px]">
                    <option className="text-white">Social</option>
                    <option className="text-white">Club</option>
                </select>
            </div>
        </div>
    )
}