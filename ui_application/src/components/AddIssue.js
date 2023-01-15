import { Typography, Button, FormControl, FormGroup, InputLabel, styled, Grid, Checkbox, FormControlLabel, ButtonGroup, Select, MenuItem, Card, Radio, RadioGroup, TextField, CardContent} from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Box } from "@mui/system";
import axios from "axios"
import SendIcon from '@mui/icons-material/Send';
import CachedIcon from '@mui/icons-material/Cached';
import "./../css/AddIssue.css"





const FormContainer = styled(FormGroup)`
width:80%;
margin: 5% auto;
`

const FormLables = styled(Typography)`
font-weight:bold;
font-size:0.8rem;
`
const AddIssue = () => {
  const [toolName, setToolName] = useState("select");
  const [operatorName, setOperatorName] = useState("select");
  const [comments, setComments] = useState("");
  const [toolType, setToolType] = useState("select");
  const [saveDisabled,setSaveDisabled] = useState(false);
  
  const [editMode,setEditMode] = useState(false);
  const [issueIdforEdit, setIssueIdforEdit] = useState(0);
  const issueCreator = "http://localhost:3001/addIssue";
  let {issue_id} = useParams();
  

  useEffect(() => {
    if(issue_id !== undefined &&  issue_id !== null && !isNaN(issue_id)){
      axios.get(`http://localhost:3001/getIssue/${issue_id}`).then(res =>{
                if(res.data.length > 0){
                  console.log((res.data)[0])
                  let {issue_id, issue_name, issue_type, issue_created_date, comments, operator_name} = res.data[0];
                  setIssueIdforEdit(issue_id);
                  setToolName(issue_name);
                  setToolType(issue_type);
                  setOperatorName(operator_name);
                  setComments(comments)
                  setEditMode(true);
                }
                               
            });
      
    }else{
     console.log("Not in Edit Mode");
    }
  },[]);

  const handleToolName = (e) => {
    setToolName(e.target.value)
  }
  const handleOperatorName = (e) => {
    setOperatorName(e.target.value)
  }
  const handleCommentsUpdate = (e) => {
    setComments(e.target.value)
  }
  const handleToolType = (e) => {
    setToolType(e.target.value)
  }
  

  const handleSubmit = () => {
    if(editMode){
      if (toolName !== "" && toolName !== "select" && operatorName !== "" && operatorName !== "select" && toolType !== "" && toolType !== "select") {
        axios.post(`http://localhost:3001/updateIssue/${issueIdforEdit}`,{toolName,operatorName,comments,toolType}).then((res)=>{
          console.log(res);
        }).catch((error) => {
              console.log(error);
            });
            //setSaveDisabled(true);
      }

    }else{
      if (toolName !== "" && toolName !== "select" && operatorName !== "" && operatorName !== "select" && toolType !== "" && toolType !== "select") {
        axios.post(issueCreator,{toolName,operatorName,comments,toolType}).then((res)=>{
          console.log(res);
        }).catch((error) => {
              console.log(error);
            });
            //setSaveDisabled(true);
      }
    }
  }

  const handleResetForm = (e)=>{

  setToolName("select");
  setOperatorName("select");
  setComments("");  
  setToolType("select");
  }

  return (
    <>


<FormContainer>
<Card className="add-issue-card">
<Grid container spacing={2}>
    <Grid item xs={4} md={4}>
      <FormLables align="left">Tool Name :</FormLables>
    </Grid>
    <Grid item xs={8} md={8}>
      <FormControl fullWidth>
        <InputLabel id="toolname-label">*</InputLabel>
        <Select
          labelId="toolname-label"
          id="toolName"
          value={toolName}
          label="*"
          size="small"
          onChange={(e) => handleToolName(e)}
        >
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="tool1">Tool 1</MenuItem>
          <MenuItem value="tool2">Tool 2</MenuItem>
          <MenuItem value="tool3">Tool 3</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>

  <Grid container spacing={2}>
    <Grid item xs={4} md={4}>
      <FormLables align="left">Operator Name :</FormLables>
    </Grid>
    <Grid item xs={8} md={8}>
      <FormControl fullWidth>
        <InputLabel id="operator-label">*</InputLabel>
        <Select
          labelId="operator-label"
          id="operator"
          value={operatorName}
          label="*"
          size="small"
          onChange={(e) => handleOperatorName(e)}
        >
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="operator1">Operator 1</MenuItem>
          <MenuItem value="operator2">Operator 2</MenuItem>
          <MenuItem value="operator3">Operator 3</MenuItem>
          
        </Select>
      </FormControl>
    </Grid>
  </Grid>


  <Grid container spacing={2}>
    <Grid item xs={4} md={4}>
      <FormLables align="left">Comments :</FormLables>
    </Grid>
    <Grid item xs={8} md={8}>
      <FormControl fullWidth>
        <TextField id="outlined-basic" value={comments}  variant="outlined" onChange={(e) => handleCommentsUpdate(e)} size="small" />

      </FormControl>
    </Grid>
  </Grid>



  <Grid container spacing={2}>
    <Grid item xs={4} md={4}>
      <FormLables align="left">Issue Type :</FormLables>
    </Grid>
    <Grid item xs={8} md={8}>
      <FormControl fullWidth>
        <InputLabel id="type-label">*</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          value={toolType}
          label="*"
          size="small"
          onChange={(e) => handleToolType(e)}
        >
           <MenuItem value="select">Select</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
          <MenuItem value="production">Production</MenuItem>
          <MenuItem value="down">Down</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
  
  </Card>
  <ButtonGroup variant="contained" className="submit-button-group" aria-label="outlined primary button group">

  <Button color="secondary" startIcon={<CachedIcon />} onClick={(e)=>handleResetForm()}>Reset Form</Button>
  <Button color="success" endIcon={<SendIcon />} disabled = {saveDisabled} onClick={(e) => handleSubmit()}>{editMode ? "Update Issue" : "Post Issue"}</Button>
</ButtonGroup>


</FormContainer>

      
    

      
      
    </>
  )
}
export default AddIssue;