import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";


function Command() {
    const [commands, setCommands] = useState([])

    //on load function
    useEffect(() => {
        axios.get("/read-all")
            .then((response) => {
                setCommands(response.data)
            })
    }, [])



    return (
        <div className="App">
            commands

            {
                commands ?
                    <div className="commands">
                        {
                            commands.map((value, index) => {
                                return (
                                    <li key={index}>
                                        {value.command}
                                    </li>
                                )
                            })
                        }
                    </div>
                    :
                    <div className="commands">
                        no commands
                    </div>
            }

        </div>
    );
}

export default Command;
