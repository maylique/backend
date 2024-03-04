import { useContext, useRef } from "react";
import { mainContext } from "../context/mainProvider";

const Admin = () => {

    const { addBlog } = useContext(mainContext)

    const formRef = useRef()

    const handleSubmit = async () => {
    const formData = new FormData(formRef.current)
    await addBlog(formData)

    formRef.current.reset()
}
    return ( 
        <>
        <form ref={formRef}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title"/>
            <label htmlFor="image">Image</label>
            <input type="file" name="image"/>
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" />
            <label htmlFor="text">Text</label>
            <input type="text" name="text" />
            <button type="button" onClick={handleSubmit} >Submit</button>
        </form>
        </>
     );
}
 
export default Admin;