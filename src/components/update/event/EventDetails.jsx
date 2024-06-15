export default function EventDetails({ eventDetails, setEventDetails, timeChanged, setTimeChanged }) {

    // Event handler function to update eventDetails state when the input changes

    const handleVenuChange = (event) => {
        setEventDetails(prevDate => ({ ...prevDate, venue: event.target.value }));
    }

    const handleStartDateChange = (event) => {
        setEventDetails(prevDate => ({ ...prevDate, startDate: event.target.value }));
    };

    const handleEndDateChange = (event) => {
        setEventDetails(prevDate => ({ ...prevDate, endDate: event.target.value }));
    };

    const handleStartTimeChange = (event) => {
        setEventDetails(prevDate => ({ ...prevDate, startTime: event.target.value }));
        setTimeChanged({ start: true, end: timeChanged.end });
    };

    const handleEndTimeChange = (event) => {
        setEventDetails(prevDate => ({ ...prevDate, endTime: event.target.value }));
        setTimeChanged({ start: timeChanged.start, end: true });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 mb-[20px]">
                <div className="col-span-1 flex flex-col justify-center">
                    <label className="text-[1.25rem]">Venue: </label>
                </div>
                <input
                    className='text-black rounded-[5px] p-1 col-span-2'
                    type="text"
                    placeholder="Enter Venue"
                    value={eventDetails.venue}
                    onChange={handleVenuChange}
                />
            </div>
            <div className="w-full grid grid-cols-12">
                <div className="col-span-1 flex flex-col justify-center">
                    <label className="text-[1.25rem]">Start: </label>
                </div>
                <div className="col-span-1 flex flex-col justify-center mt-[-3px]">
                    <label><img src='/calendar-days-solid.svg' width="25px"></img></label>
                </div>
                <input
                    className='text-black rounded-[5px] p-1 col-span-2'
                    type="date"
                    value={eventDetails.startDate}
                    onChange={handleStartDateChange} />
                <div className="col-span-3"></div>
                <div className="col-span-1 flex flex-col justify-center">
                    <label><img src='/clock-solid.svg' width="30px"></img></label>
                </div>
                <input
                    className='text-black rounded-[5px] p-1 col-span-2'
                    type="time"
                    value={eventDetails.startTime}
                    onChange={handleStartTimeChange} />
            </div>
            <div className="w-full grid grid-cols-12">
                <div className="col-span-1 flex flex-col justify-center">
                    <label className="text-[1.25rem]">End: </label>
                </div>
                <div className="col-span-1 flex flex-col justify-center mt-[-3px]">
                    <label><img src='/calendar-days-solid.svg' width="25px"></img></label>
                </div>
                <input
                    className='text-black rounded-[5px] p-1 col-span-2'
                    type="date"
                    value={eventDetails.endDate}
                    onChange={handleEndDateChange} />
                <div className="col-span-3"></div>
                <div className="col-span-1 flex flex-col justify-center">
                    <label><img src='/clock-solid.svg' width="30px"></img></label>
                </div>
                <input
                    className='text-black rounded-[5px] p-1 col-span-2'
                    type="time"
                    value={eventDetails.endTime}
                    onChange={handleEndTimeChange} />
            </div>
        </div>
    )
}