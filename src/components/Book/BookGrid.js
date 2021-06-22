import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import { makeStyles } from "@material-ui/core/styles";
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
    const books = props.books

    return(
        <GridList cellHeight={'auto'} className={classes.gridList} spacing={10} cols={2.5}>
                {books.map(book =>
                    <GridListTile className={classes.card}>
                        <BookCard
                            key = {book.id}
                            book = {book}
                        />
                    </GridListTile>
                )}
        </GridList>
        
    )
}