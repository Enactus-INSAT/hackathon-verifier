import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {Button} from "react-bootstrap";

function Scanner({ setPageState, setId, records,setRecord }) {
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [fullName, setFullName] = useState("");
    const token = '266dyenkaudiknfmfrc62xri2rr8opmu6nlkpahn';
    const sheetId = 'wraanf560o2tx';
    const keys = [
        "Horodateur",
        "Adresse e-mail",
        "Full name",
        "Phone Number",
        "Occupation",
        "If you're a student name your University",
        "Choose your character",
        "If you picked to be Monica Gueller, choose",
        "id",
        "paid",
        "status"
    ];

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 10,
        });

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            const id = result.substring(6);
            setId(id);
            setPageState(1);
        }

        function error(err) {

        }

        return () => {
            scanner.clear();
        };

    }, []); // Empty dependency array to run the effect only once


    const handleSearchChange = (event) => {
       setFullName(event.target.value)
        if(!event.target.value){
            setFilteredRecords([]);
            return;
        }
        const filtered = records ? records.filter(record =>
            record["Full name"] && record["Full name"].toLowerCase().includes(event.target.value.toLowerCase())
        ) : [];

         console.log("Filtered records:", filtered);
        setFilteredRecords(filtered);
    };

    const handlePay = async (id) => {
        const newData = {
            paid: "TRUE" // Update the "paid" column to true
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
                records.forEach((record,index)=>{
                    if(record.id===id){
                        records[index].paid="TRUE"
                        setRecord([...records])
                    }
                })
            } } )  // Fetch the data from the API endpoint
    }
    const handleUnpay =async (id) => {
        const newData = {
            paid: "FALSE" // Update the "paid" column to true
        };

        fetch('https://sheetdb.io/api/v1/'+sheetId+'/id/'+id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        })  .then(response => {
            if (!response.ok) {
                alert("user with id "+id+" not updated");
            }
            else{
                records.forEach((record,index)=>{
                    if(record.id===id){
                        records[index].paid="FALSE"
                        setRecord([...records])
                    }

                })
            }
        } ) // Fetch the data from the API endpoint
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",gap:"20px"
        }}>
            <h1>QR Code Scanning in React</h1>
            <div id="reader"></div>
            {/* Search bar */}
            <input type="text" placeholder="Search by Full Name" value={fullName} onChange={handleSearchChange}/>
            {/* Display filtered records */}
            {filteredRecords.length === 0 ? fullName ? <div>No records found</div> : null :
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                    <tr style={{backgroundColor: '#f2f2f2'}}>
                        <th style={{border: '1px solid #ddd', padding: '8px'}}>Key</th>
                        <th style={{border: '1px solid #ddd', padding: '8px'}}>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRecords.map((record, index) => (
                        <React.Fragment key={index}>
                            {Object.entries(record).map(([key, value]) => (
                                <tr key={key} style={{backgroundColor: index % 2 === 0 ? '#fff' : '#f2f2f2'}}>
                                    <td style={{border: '1px solid #ddd', padding: '8px'}}>{key}</td>
                                    {key === "paid" ?value=== "TRUE" ?
                                            <td style={{border: '1px solid #ddd', padding: '8px' }}>{value}
                                                <span style={{fontWeight:"900",color:"red",cursor:"pointer",marginLeft:"10px"}}
                                                onClick={()=>handleUnpay(record.id)}
                                                > Unpay</span>


                                            </td>
                                            : <td style={{border: '1px solid #ddd', padding: '8px'}}>{value}
                                                <span style={{
                                                    fontWeight: "900",
                                                    color: "green",
                                                    cursor: "pointer",
                                                    marginLeft: "10px"
                                                }} onClick={ ()=>{handlePay(record.id)}}> Pay</span>
                                            </td> :
                                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{value}</td>}

                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>}
        </div>
    );
}

export default Scanner;
