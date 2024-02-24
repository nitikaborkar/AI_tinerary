import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventsByLocation = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const locationName = 'Sydney'; // Replace with your desired location name

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
                    params: {
                        apikey: 'I3YcEyGHrshfwzIQUTi5Bve5Wjeq0FY1',
                        keyword: locationName,
                        locale: '*',
                        startDateTime: '2024-02-24T00:00:00Z', // Start of date range in ISO 8601 format
                        endDateTime: '2024-03-01T23:59:59Z',   // End of date range in ISO 8601 format
                    },
                });

                if (response.data && response.data._embedded) {
                    setEvents(response.data._embedded.events);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) return <div>Loading events...</div>;

    return (
        <div>
            <h2>Events in {locationName}</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                            {event.name}
                        </a> - {event.dates.start.localDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsByLocation;
