import { useEffect, useState } from "react";

const ParticipantDetails = ({ id, setPageState }) => {
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = 'iv8bxeuzidpdelow5n3d4fgicd338f70ouxw6gg7';

    useEffect(() => {
        // Fetch the data from the API endpoint
        fetch('https://sheetdb.io/api/v1/tdci1nwqx9yl9', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                // Set the fetched record
                setRecord(data);
                setLoading(false);
            })
            .catch(error => {
                // Set the error state
                setError(error);
                setLoading(false);
            });
    }, []); // Run this effect only once, on component mount

    const handleBackButtonClick = () => {
        // Set the page state to 0
        setPageState(0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!record || !record[id - 1]) {
        return <>
            <div style={{backgroundColor: record[id - 1].paid === "FALSE" ? "red" : "green", paddingLeft: "3vw", height: "100vh" }}>
            <div>No record found</div>
            <button className="btn btn-primary mt-3" onClick={handleBackButtonClick}>Go Back</button>
            </div>
        </>;
    }

    return (
        <div style={{backgroundColor: record[id - 1].paid === "FALSE" ? "red" : "green", paddingLeft: "3vw", height: "100vh" }}>
            <h1>Records</h1>
            <div>
                {Object.entries(record[id - 1]).map(([key, value]) => (
                    <p key={key}>
                        <strong>{key}: </strong>{value}
                    </p>
                ))}
            </div>
            {/* Bootstrap button to set the page state to 0 */}
            <button className="btn btn-primary mt-3" onClick={handleBackButtonClick}>Go Back</button>
        </div>
    );
}

export default ParticipantDetails;
