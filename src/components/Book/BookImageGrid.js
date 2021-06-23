import { Grid } from "@material-ui/core"
import GridList from "@material-ui/core/GridList"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    root:{
        width: '80vw',
        height: '80vw',
        margin: 'auto',
        overflow: 'hidden',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
    },
    gridListContainer:{
        height:'100%',
    },
    gridList:{
        width: 'auto',
        height: '80vw',
        flexWrap: 'wrap',
        transform: 'translateZ(0)',
        display: 'inline-block',
        fontSize: 0
    },
    gridListImg:{
        transition: ".3s ease",
        height: 'auto',
        width:'100%',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        cursor: 'pointer',
        border: 0,
        margin: 0,
        padding: 0,
        backfaceVisibility: 'hidden',
        opacity: 1, '&:hover':{
            opacity: (theme.palette.common.white, 0.25),
        }
    },
    mainImg:{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: '50% 50%'
    }

}));

export default function BookImageGrid(props) {
    const classes = useStyles();
    const main = props.main;
    const [shown, setShown] = useState(main);
    const images = props.images;

    return(
        <div className={classes.root}>
            
            <Grid container spacing={2} >

                <Grid item xs={10} >
                    <img className={classes.mainImg} src={shown} />
                </Grid>

                <Grid item xs={2} container className={classes.gridListContainer}>
                    <GridList className={classes.gridList} spacing={0} cols={1} cellHeight={'auto'} >

                        {images.map(i=>
                        <img className={classes.gridListImg} src={i} onClick={() => setShown(i)}  />    
                        )}

                    </GridList>
                </Grid>

            </Grid>

        </div>
    )
}