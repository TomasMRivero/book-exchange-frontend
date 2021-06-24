import { makeStyles } from '@material-ui/core/styles';

import { useCallback } from "react";
import { useHistory } from "react-router";

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
    },
    content: {
        height: '100%',
        background: '#F0F3F8',
        padding: 7,
        paddingTop: 13,
    },
    image: {
        //height: '30vw',
        width: '100%',
        objectFit: 'cover',
        objectPosition: '50% 50%'
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 14,
        },
        textAlign: 'left'
    },
    author: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 14,
        },
        fontStyle: 'italic',
        textAlign: 'left',
    }
  }));

export default function BookCard(props){
    const classes = useStyles();
    const history = useHistory();
    const book = props.book
    const onClickBook = useCallback((e) => {
        e.preventDefault();
        history.push(`/book/${book.id}`)
    }, [history, book]);
    return(
        <Card className = {classes.root} onClick={onClickBook} style={{cursor:'pointer'}} >
            <CardActionArea style={{height:'100%'}}>
                <CardMedia
                    component="img"
                    className={classes.image}
                    alt="Libro"
                    image="https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg"
                    title="Contemplative Reptile"
                    height = {props.setHeight}
                />
                <CardContent className={classes.content} xs zeroMinWidth>
                    <Typography noWrap className = {classes.title} gutterBottom variant="bold" component="h2">
                        {book.title}
                    </Typography>
                    <Typography className={classes.author} noWrap gutterBottom variant="italic" component="p">
                        {book.author}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}