import { Grid, Paper } from "@material-ui/core"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import { makeStyles } from "@material-ui/core/styles"

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
        height: 'auto',
        width:'100%',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        border: 0,
        margin: 0,
        padding: 0,
    },
    mainImg:{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '50% 50%'
    }

}));

export default function BookImageGrid(props) {
    const classes = useStyles();
    const main = props.main;
    const images = props.images;
    return(
        <div className={classes.root}>
            
            <Grid container spacing={2} >

                <Grid item xs={9} >
                    <img className={classes.mainImg} src={main} />
                </Grid>

                <Grid item xs={3} container className={classes.gridListContainer}>
                    <GridList className={classes.gridList} spacing={0} cols={1} cellHeight={'auto'} >

                        {images.map(i=>
                        <img className={classes.gridListImg} src={i} />    
                        )}

                    </GridList>
                </Grid>

            </Grid>

        </div>
    )
}