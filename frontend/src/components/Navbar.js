import { Link } from "react-router-dom";
import Search from "./Search";
const Navbar = () => {
    return (
        // useParams();
        <div>
        <nav className="navbar">
            <h1> Health Center Database Dashboard</h1>
            <div className="links">
                {/* <p>Home</p>
                <p>Add</p> */}
                <Link to="/">Home</Link>
                <Link to="/create">Add Data</Link>
                <Link to="/search">Search</Link>
            </div>
            {/* <Search/> */}
        </nav>
        <div>
        
        </div>
        </div>
    );
}
 
export default Navbar;