import { Link } from "react-router"

const Home = ()=>{
    return(
        <div>
            <h1>This is home page</h1>
            <Link to={'/recipebook'} > recipebook</Link>
        </div>
    )
}
export default Home