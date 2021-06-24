import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "../useWindowDimensions";

import BookCard from "./BookCard";


const useStyles = makeStyles((theme) => ({
    gridList: {
      flexWrap: 'nowrap',
      padding: 15,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    }
  }));

export default function BookGrid(props){
    const classes = useStyles();
    const books = props.books;
    const {height, width} = useWindowDimensions();

    console.log({height});
    console.log({width});

    const setCols = (width) => {
        if (width < 600){
            return 2
        }else if(width < 780){
            return 3
        }else if(width < 960){
            return 4
        }else if(width < 1140){
            return 5
        }else{
            return 6
        }
    }

    return(
        <GridList cellHeight={'auto'} className={classes.gridList} spacing={10} cols={setCols(width)}>
                {books.map(book =>
                    <GridListTile className={classes.card}>
                        <BookCard
                            key = {book.id}
                            book = {book}
                            setHeight = {width / setCols(width)}
                        />
                    </GridListTile>
                )}
        </GridList>
        
    )
}