import ParticipantDetails from "./ParticipantDetails";
import Scanner from "./scanner";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";



function App() {
    const [pageState, setPageState] = useState(0);
    const [id, setId] = useState(null);
  return (
      (pageState === 0 ?    <Scanner setPageState={setPageState} setId={setId}   />: <ParticipantDetails setPageState={setPageState} id={id}    />)

  );
}

export default App;
