import { makeStyles } from '@material-ui/core/styles';

import { useCallback } from "react";
import { useHistory } from "react-router";

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        width: '100%',
    },
    content: {
        background: '#F0F3F8',
        padding: 7,
        paddingTop: 13,
    },
    image: {
        height: '40vw',
        width: '100%',
        objectFit: 'cover',
        objectPosition: '50% 50%'
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 17,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 20,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 23,
        },
        textAlign: 'left'
    },
    author: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 13,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 20,
        },
        fontStyle: 'italic',
        textAlign: 'left'
    }
  }));

export default function BookCard({
    book
}){
    const classes = useStyles();
    const history = useHistory();
    const onClickBook = useCallback((e) => {
        e.preventDefault();
        history.push(`/book/${book.id}`)
    }, [history, book]);
    return(
        <Card className = {classes.root} onClick={onClickBook} style={{cursor:'pointer'}} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.image}
                    alt="Libro"
                    image="https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg"
                    title="Contemplative Reptile"
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