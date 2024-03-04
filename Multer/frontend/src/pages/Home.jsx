import { useContext } from "react";
import NavBar from "../components/NavBar";
import { mainContext } from "../context/mainProvider";

const Home = () => {

    const {blogs, setBlogs} = useContext(mainContext)

    return ( 
        <>
        <NavBar />
        <main>
        {blogs.map((blog) => {
            return (
                <>
                    <h2>{blog.title}</h2>
                    <img src="" alt="" />
                    <p>{blog.desc}</p>
                    <p>{blog.text}</p>
                </>
            )
        })}
        </main>
        </>
     );
}
 
export default Home;