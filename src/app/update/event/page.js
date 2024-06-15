"use client"

import { useEffect, useState } from "react"
import UpdateEvent from "../../../components/update/event/UpdateEvent"

import { useAuth } from "@/context/authContext";

import axios from "axios";

export default function UpdateEventPage() {

    const { token } = useAuth();

    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true)

    const eventId = 7;

    useEffect(() => {

        const fetchEventData = async () => {

            try {

                const response = await axios.get(`https://oasis-api.xyz/api/event/fetchEvent?id=${eventId}`, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });

                setValues(response.data);
                setLoading(false);

                console.log(response.data);
            }
            catch (error) {
                console.log('Error occured in updating event: ', error);
            }
        }

        fetchEventData();
    }, [])

    return (
        !loading ? <UpdateEvent displayType={"EVENT"} values={values} /> : <div>Loading...</div>
    )
}