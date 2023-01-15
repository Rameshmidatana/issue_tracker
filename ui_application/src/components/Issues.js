import { useEffect, useState } from "react";
import Axios from "axios";
import { Card, getNativeSelectUtilityClasses } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from "react-router-dom";
import moment from "moment";
import "./../css/reports.css";

const Issues = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        getIssues();
    }, []);

    const handleDelete = (issue_id)=>{
        if(issue_id !== undefined && issue_id !== null){
            Axios.delete(`http://localhost:3001/deleteIssue/${issue_id}`).then(res =>{
                console.log(res.data);
                setErrorMessage(res.data);
                getIssues();
            });
        }
    }
    
    const getIssues = () =>{
        Axios.get("http://localhost:3001/getIssues").then((res) => {
        console.log("response processing");
        if (res.status === 200) {
            console.log(res.data);
            setUsers(res.data);
        } else {
            console.log(res.status);
            setErrorMessage("Something went wrong.... Please try again");
        }
    })
    }
    return (
        <>{users.length > 0 ? <>
        <div className ="container">
        <Card variant="outlined"><h3>Active Issues List</h3>


<table className="table table-sm"><tbody>
<tr scope="row">{[...Object.keys(users[0]),"actions"].map((header, index) => <th scope="col" key={index}>{header.toUpperCase()}</th>)}</tr>
    {
       
        users.map((user, index) => <tr key={user.issue_id}>
            <td scope="col">{user.issue_id}</td>
            <td scope="col">{user.issue_name}</td>
            <td scope="col">{user.issue_type}</td>
            <td scope="col">{user.comments}</td>
            <td scope="col">{user.operator_name}</td>
            <td scope="col">{moment(user.issue_created_date).format('YYYY/MM/DD HH:MM:SS')}</td>
            <td><Link to={'/editIssue/'+user.issue_id}><DriveFileRenameOutlineIcon color="primary" /></Link> 
            <HighlightOffIcon onClick = {()=>{handleDelete(user.issue_id)}} sx={{ color: "#bd0202" }}/></td>
            </tr>)

    }
</tbody></table></Card>   

        
        </div>
        </> : <></>}</>
    )
}
export default Issues;