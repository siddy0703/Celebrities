import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: '10px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textArea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      resize: 'none',
      outline: 'none',
      '&:focus': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const menuItems = [
    { id: 1, label: 'Male', value: 'Male' },
    { id: 2, label: 'Female', value: 'Female' },
    { id: 3, label: 'Transgender', value: 'Transgender' },
    { id: 4, label: 'Rather not say', value: 'Rather not say' },
    { id: 5, label: 'Other', value: 'Other' }
  ];

function MaterialAccordion({ id, title, dob, gen, cont, description, deleteElement }) {
    const g = menuItems.filter(item => item.value.toLowerCase() === gen)
    function calculateAge(x) {
        const today = new Date();
        const dob = new Date(x);
      
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
      
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
      
        return age;
      }
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [age, setAge] = useState(calculateAge(dob));
    const [gender, setGender] = useState(g[0].label);
    const [country, setCountryName] = useState(cont);
    const [comment, setComment] = useState(description);
    const [saveFlag, setSaveFlag] = useState(true)
    const [isEditMode, setIsEditMode] = useState(true);
    const [cancelFlag, setCancelFlag] = useState(false);
    const [del, delElement] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [originalState, setOriginalState] = useState({ id, title, dob, gen, cont, description, deleteElement });
    
      const handleCancel = () => {
        setAge(calculateAge(dob));
        setGender(g[0].label);
        setCountryName(originalState.cont);
        setComment(originalState.description);
      };
      const handleCountryChange = (event) => {
        setCountryName(event.target.value);
        setSaveFlag(false);
      };
    
      const handleGenderChange = (event) => {
        setGender(event.target.value);
        setSaveFlag(false);
      };

      const handleAgeChange = (event) => {
        const inputAge = event.target.value
        if (!isNaN(inputAge)) {
            setAge(inputAge);
            setError('');
          } else {
            setError('Age must be a number');
          }
        setSaveFlag(false);
      };
    
      const handleCommentChange = (event) => {
        setComment(event.target.value);
        setSaveFlag(false);
      };
    
      const handleSaveClick = () => {
        setExpanded(false);
        setIsEditMode(true)
        setSaveFlag(true);
        setCancelFlag(false)
      };

      const handleEditClick = () => {
        setCancelFlag(true)
        setIsEditMode(false)
        setIsEditMode(false)
      };

      const handleOpen = (index) => {
        delElement(index)
        setOpen(true);
     };
  
    const handleClose = () => {
        setOpen(false);
        setExpanded(false);
        const elementToDelete = del;
        deleteElement(elementToDelete)
    };

  return (
    <>
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div style={{ width: '50%' }}>
                {isEditMode ? 
                    <div>
                        <FormControl className={classes.formControl}>
                        <TextField label="Age" value={age} onChange={handleAgeChange} InputProps={{
                        readOnly: true,
                        }}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                        <InputLabel>Gender</InputLabel>
                        <Select value={gender} onChange={handleGenderChange}>
                        {menuItems.map((item) => (
                            <MenuItem key={item.id} value={item.value} disabled>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                        <TextField label="Country" value={country} onChange={handleCountryChange} InputProps={{
                        readOnly: true,
                        }}/>
                        </FormControl>
                        <FormControl style={{ width: '100%' }}>
                        <TextareaAutosize className={classes.textArea} placeholder="Comment" value={comment} onChange={handleCommentChange} rowsMin={3} readOnly/>
                        </FormControl>
                    </div> : 
                    <div>
                        <FormControl className={classes.formControl}>
                            <TextField label="Age" value={age} onChange={handleAgeChange}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Gender</InputLabel>
                            <Select value={gender} onChange={handleGenderChange}>
                            {menuItems.map((item) => (
                                <MenuItem key={item.id} value={item.value}>
                                    {item.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField label="Country" value={country} onChange={handleCountryChange}/>
                        </FormControl>
                        <FormControl style={{ width: '100%' }}>
                            <TextareaAutosize className={classes.textArea} placeholder="Comment" value={comment} onChange={handleCommentChange} rowsMin={3}/>
                        </FormControl>
                    </div>
                }
                {!isEditMode ? <Button variant="contained" color="primary" className={classes.button} onClick={handleSaveClick} disabled={saveFlag}>
                Save
                </Button> : null}
                {age >=18 && isEditMode ?<Button variant="contained" color="primary" className={classes.button} onClick={handleEditClick}>
                Edit
                </Button>: null}
                {isEditMode ?<Button variant="contained" color="primary" className={classes.button} onClick={() => handleOpen(id)}>
                Delete
                </Button>: null}
                {cancelFlag ? <Button variant="contained" color="primary" className={classes.button} onClick={handleCancel}>
                Cancel
                </Button>: null}
            </div>
            </AccordionDetails>     
        </Accordion>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Dialog Box</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to Delete?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
}

function AccordionList({ accordions, delElem }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const matchesSearchText = (text) => {
    return text.toLowerCase().includes(searchText.toLowerCase());
  };

  const deleteElement = (i) => {
    delElem(i)
  };

  return (
    <div>
      <TextField label="Search" variant="outlined" onChange={handleSearchChange} />
      {accordions.map((accordion) => (
        matchesSearchText(accordion.description) ? (
          <MaterialAccordion key={accordion.id}
            id={accordion.id}
            title={accordion.first}  
            dob={accordion.dob}
            gen={accordion.gender}
            cont={accordion.country}
            description={accordion.description} 
            deleteElement={deleteElement}/>
        ) : null
      ))}
    </div>
  );
}

export default AccordionList;
