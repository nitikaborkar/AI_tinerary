import React, { useState } from 'react';
import axios from 'axios';

const EventSearchPage = () => {
    const [location, setLocation] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiKey = 'I3YcEyGHrshfwzIQUTi5Bve5Wjeq0FY1';

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
                params: {
                    apikey: apiKey,
                    keyword: location,
                    locale: '*',
                    startDateTime: '2024-02-24T00:00:00Z',
                    endDateTime: '2024-03-01T23:59:59Z',
                },
            });

            if (response.data && response.data._embedded) {
                setEvents(response.data._embedded.events);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchEvents();
    };

    return (
        <div className="main-content">
            <h2>Search Events by Location</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>
            {loading && <div>Loading events...</div>}
            {events.length > 0 && (
                <div>
                    <h3>Events in {location}</h3>
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
            )}
        </div>
    );
};

export default EventSearchPage;
