import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner({setPageState,setId}) {

    useEffect(() => {
        console.log("Scanner component mounted");
        const scanner = new Html5QrcodeScanner('reader',{
            qrbox:{
            width: 250,
            height: 250,},
            fps: 10,
            },);

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            const id =result.substring(6);
            setId(id);
            setPageState(1);

        }

        function error(err) {

        }
        return () => {
            scanner.clear();
        };

    }, []); // Empty dependency array to run the effect only once

    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
            <h1>QR Code Scanning in React</h1>

                <div id="reader"></div>

        </div>
    );
}

export default Scanner;
