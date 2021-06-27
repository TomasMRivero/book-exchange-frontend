import { Grid, Typography, Button } from "@material-ui/core";
import { SentimentDissatisfied } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
    button:{
        width: '70%',
        transition: "1s ease",
        fontSize:'1.2em',
        fontWeight: 'bold',
        background: '#6fa1ff',
        '&:hover':{
            border:'2px',
            marginTop: 15,
            background: '#a5c5ff',
        },
    }
}));

export default function NotFound(props){
    const target = () => {return (props.target?props.target:'la página')};
    const classes = useStyles();
    const history = useHistory();

    const onClickHome = useCallback((e) => {
        e.preventDefault();
        history.push('/');
    }, [history]);
    
    return (
        <Grid container direction='column' justify='center' style={{width:'100%', height:'100vh'}}>
            <Grid item xs={'auto'}>
                <SentimentDissatisfied style={{margin: 15, fontSize: '5em', marginBottom: 0}}/>
            </Grid>
            <Grid iem xs={'auto'}>
                <Typography variant='h5' style={{margin: 15}}>No se encontró {target()}</Typography>
                <Button className={classes.button} variant='contained' onClick={onClickHome}>{'Volver al inicio >>'}</Button>
            </Grid>
        </Grid>
    )


}