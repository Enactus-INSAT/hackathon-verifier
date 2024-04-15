import React from "react";


const ParticipantDetails = ({ id, setPageState,error,loading,record,setRecord }) => {

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

    if (!record || !record[id - 1] || !record[id - 1].paid) {
        console.log("Record or paid property not found.");
        console.log(id,record)
        return (
            <>
                <div>No record found</div>
                <button className="btn btn-primary mt-3" onClick={handleBackButtonClick}>Go Back</button>
            </>
        );
    }
    const token = '266dyenkaudiknfmfrc62xri2rr8opmu6nlkpahn';
    const sheetId = 'wraanf560o2tx';
    const handleIn = async (id) => {
        const newData = {
            "Is In": "TRUE"
        };

        fetch('https://sheetdb.io/api/v1/'+sheetId+'/id/'+id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        }) .then(response => {
            if (!response.ok) {
                alert("user with id "+id+" not updated");
            }
            else{
                record.forEach((recordElement,index)=>{
                    if(recordElement.id===id){
                        record[index]["Is In"]="TRUE"
                        setRecord([...record])
                    }
                })
            } } )  // Fetch the data from the API endpoint
    }
    const handleOut = async (id) => {
        const newData = {
            "Is In": "FALSE"
        };

        fetch('https://sheetdb.io/api/v1/'+sheetId+'/id/'+id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        }) .then(response => {
            if (!response.ok) {
                alert("user with id "+id+" not updated");
            }
            else{
                record.forEach((recordElement,index)=>{
                    if(recordElement.id===id){
                        record[index]["Is In"]="FALSE"
                        setRecord([...record])
                    }
                })
            } } )  // Fetch the data from the API endpoint
    }
    return (
        <div style={{ paddingLeft: "3vw", height: "100vh" }}>
            <h1>Records</h1>
            <div>
                {Object.entries(record[id - 1]).map(([key, value]) => (
                    <p key={key} style={{color:value === "FALSE" ? "red" :value==="TRUE"?"green":null}}>
                        <strong >{key}: </strong>{value}
                        {key === "Is In" ? value === "FALSE" ? <span style={{
                        fontWeight: "900",
                        color: "green",
                        cursor: "pointer",
                        marginLeft: "10px"
                    }} onClick={()=>{
                            handleIn(id)

                        }}> In</span>:<span style={{
                            fontWeight: "900",
                            color: "red",
                            cursor: "pointer",
                            marginLeft: "10px"
                        }} onClick={()=>{handleOut(id)}}  > Out</span>:null}
                    </p>

                ))}

            </div>
            {/* Bootstrap button to set the page state to 0 */}
            <button className="btn btn-primary mt-3" onClick={handleBackButtonClick}>Go Back</button>
        </div>
    );
}

export default ParticipantDetails;
