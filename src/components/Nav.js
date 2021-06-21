import { useHistory, useRouteMatch } from "react-router";
import SearchField from "./SearchField";

function ShowSearchBar() {
    const match = useRouteMatch("/")
    if (!match.isExact){
        return <SearchField />;
    }
    return null
}

export default function Nav(){
    const history = useHistory()
    
    return(
        <div className="nav-bar">
            <h3>Book Trader</h3>
            <ShowSearchBar />
            <h3>User</h3>
        </div>
    )
}