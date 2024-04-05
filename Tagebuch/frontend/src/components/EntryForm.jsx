import { useRef } from "react";

const EntryForm = ({ postEntry }) => {
  const inputRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = inputRef.current.value;
    postEntry(content);
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea ref={inputRef} type="text" name="content" />
      <button>Submit</button>
    </form>
  );
};

export default EntryForm;
