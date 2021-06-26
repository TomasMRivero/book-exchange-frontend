import { useCallback } from "react";
import { useSelector } from "react-redux"
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { StarBorder } from "@material-ui/icons";
import useWindowDimensions from "../useWindowDimensions";

const useStyles = makeStyles((theme) => ({
    root:{
        transition: ".3s ease",
        width: '100%',
        margin: 'auto',
        borderBottom: '1px solid grey',
        '&:last-child':{
            borderBottom: 0
        },
        cursor: 'pointer',
        '&:hover':{
            background: '#f0f0f0'
        },
    },
    gridContainer:{
        width: '100%',
        margin: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    title:{
        display: '-webkit-box',
        width:'100%',
        maxHeight: '3.6em',
        lineHeight: '1.8em',
        wordWrap: 'break-all',
        overflow: 'hidden',
        lineClamp: 2,
        boxOrient: 'vertical',
    },
    img:{
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        objectPosition: '50% 50%',
    },
    ratingContainer:{
        display:'flex',
        fontSize: 20,
        justifyContent:'flex-start',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
        },
    }

}));

export default function BookItem({
    book
}){
    const classes = useStyles();
    const {height, width} = useWindowDimensions();

    const history = useHistory();
    const owner = useSelector(state => state.models.users[book.user_account_id]);

    const onClickBook = useCallback((e) => {
        e.preventDefault();
        history.push(`/book/${book.id}`)
    }, [history, book]);

    const onClickUser = useCallback((e) => {
        e.preventDefault();
        history.push(`/user/${owner.id}`)
    }, [history, owner.id]);

    const setHeight = (width) => {
        return (width<=960?width/4:960/4);
    }
    return(
        <div className = {classes.root} onClick={onClickBook}>
            <Grid container className={classes.gridContainer} justify="space-evenly" spacing={3}>
                <Grid item xs={4} sm={3}style={{height:setHeight()}}>
                    <img
                    className={classes.img}
                    src="https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg"
                    />
                </Grid>
                <Grid item xs={8} sm={9} container direction='row' justify='center' alignContent={'center'} >
                    <Grid item xs={12} height={'3.6em'}>
                        <Typography className={classes.title} gutterBottom align='left' variant='h6'><b>{book.title}</b></Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography gutterBottom align='left' noWrap variant='subtitle1'><b>Autor:</b> {book.author}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.ratingContainer}>
                        <Typography gutterBottom align='left' display='block' variant='subtitle1'><b>Estado:</b> </Typography>
                        <Rating
                            name="customized-empty"
                            defaultValue={3.5}
                            precision={0.5}
                            emptyIcon={ <StarBorder fontSize="inherit" />}
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Typography gutterBottom align='left' variant='subtitle2' onClick={onClickUser}>Publicado por: <b>{owner.alias}</b></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.ratingContainer}>
                        <Typography gutterBottom align='left' display='inline' variant='subtitle2' >Reputación: </Typography>
                        <Rating
                            name="customized-empty"
                            defaultValue={4}
                            precision={0.5}
                            emptyIcon={ <StarBorder fontSize="inherit" />}
                            size = 'small'
                            disabled
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}