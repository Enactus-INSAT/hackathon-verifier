import ParticipantDetails from "./ParticipantDetails";
import Scanner from "./scanner";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";



function App() {
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = '266dyenkaudiknfmfrc62xri2rr8opmu6nlkpahn';
    const sheetId = 'wraanf560o2tx';

    useEffect(() => {
        // Fetch the data from the API endpoint
        fetch('https://sheetdb.io/api/v1/'+sheetId, {
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
                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                // Set the error state
                setError(error);
                setLoading(false);
            });
    }, []); // Run this effect only once, on component mount

    const [pageState, setPageState] = useState(0);
    const [id, setId] = useState(null);
  return (
      (pageState === 0 ?    <Scanner setPageState={setPageState} setId={setId} records={record} setRecord={setRecord}  />: <ParticipantDetails setPageState={setPageState} id={id} loading={loading} error={error} record={record}  setRecord={setRecord}    />)

  );
}

export default App;
