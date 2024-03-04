import { createContext, useEffect, useState } from "react";

export const mainContext = createContext()

const MainProvider = ({children}) => {

    const [blogs, setBlogs] = useState([])

    const getBlog = () => {
    return fetch('http://localhost:3000/blogs')
    .then((resp) => resp.json())
    .then((blog) => setBlogs(blog))
}

    const updateBlogs = async () => {
    try {
        await getBlog()
    } catch (err) {
        console.error(err)
    }
}

    const postBlog = (newBlogData) => {
    return fetch('http://localhost:3000/blogs', {
        method: 'POST',
        body: newBlogData
    })
    .then((resp) => resp.json())
}

    const addBlog = async (blogData) => {
        try {
            await postBlog(blogData)
            updateBlogs()
        } catch (err) {
            console.error(err)
        }
    }


    return ( 
        <mainContext.Provider value={{blogs, setBlogs, addBlog, postBlog, getBlog}}>
            {children}
        </mainContext.Provider>
    );
}

export default MainProvider;