import { Grid } from "@material-ui/core"
import GridList from "@material-ui/core/GridList"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    root:{
        width: '100%',
        height: '60vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        background: 'white',
    },
    gridListContainer:{
        width: '100%',
        height:'100%',
        margin:0,
        padding: 0,
        border: 0,
    },
    gridList:{
        width: '100%',
        height: '60vh',
        flexWrap: 'wrap',
        transform: 'translateZ(0)',
        display: 'inline-block',
        fontSize: 0,
        '&::-webkit-scrollbar': {
            width: 0
        }
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
        opacity: 1,
        '&:hover':{
            opacity: 0.5
        },
    },
    mainImg:{
        maxHeight: '60vh',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: '50% 50%',
        background: 'white'
    }

}));

export default function BookImageGrid(props) {
    const classes = useStyles();
    const main = props.main;
    const [shown, setShown] = useState(main);
    const images = props.images;

    return(
        <div className={classes.root}>
            
            <Grid className={classes.grid} container spacing={2} >

                <Grid item xs={10} sm={10}  >
                    <img className={classes.mainImg} src={shown} />
                </Grid>

                <Grid item xs={2} sm={2}  container className={classes.gridListContainer}>
                    <GridList className={classes.gridList} spacing={0} cols={1} cellHeight={'auto'} >
                        {images.map(i=>
                            <img key={images.indexOf[i]} className={classes.gridListImg} src={i} onClick={() => setShown(i)}  />    
                        )}
                    </GridList>
                </Grid>

            </Grid>

        </div>
    )
}