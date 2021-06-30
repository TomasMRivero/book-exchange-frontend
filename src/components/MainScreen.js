import { useCallback } from "react"
import { useHistory } from "react-router"
import SearchField from "./SearchField"
import { Typography, Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root:{
      margin: 'auto',
      padding: 0,
      overflowX: 'hidden'
    },
    search:{
        transition: "1s ease",
        width: "70%",
        margin:'auto',
        marginBottom:0,
        border:'1px solid #f0f0f0',
        '&:hover':{
            border:'2px solid #9aa5b0',
            marginBottom: 15
        },
        borderRadius: 15,
        padding: 15
    },
    button:{
        width: '70%',
        transition: "1s ease",
        fontSize:'1.2em',
        [theme.breakpoints.down('xs')]: {
            fontSize:'0.9em'
        },
        fontWeight: 'bold',
        background: '#6fa1ff',
        '&:hover':{
            border:'2px',
            marginTop: 15,
            background: '#a5c5ff',
        },

    },
    divisor:{
        margin: theme.spacing(5)
    }
}))

export default function MainScreen(){
    const classes = useStyles();
    const history = useHistory()
    const onClickUploadBook = useCallback((e) => {
        e.preventDefault()
        history.push('/book');
    }, [history]);
    return(
        <div className={classes.root}>
            <Grid container style={{width: "100vw", height:"100vh"}} justify='center' alignContent='center' >
                <Grid item xs={12} >
                    <div className={classes.search} >
                    <SearchField />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.divisor} align='center' variant='h6'>ó</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} variant="contained" onClick={onClickUploadBook} size='large'>Pulicar un nuevo libro</Button>
                </Grid>
            </Grid>
            
        </div>
    )
}