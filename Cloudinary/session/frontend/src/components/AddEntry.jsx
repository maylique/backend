const AddEntry = ({ birds }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    fetch("http://localhost:3000/entries", { method: "POST", body: formData });
  };
  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <h2 className="mb-2 text-2xl">Add new Entry</h2>

      <label className="block mb-2">
        <p>Welchen Vogel hast du gesehen?</p>
        <select className="block" name="bird" id="birdInput">
          {birds.map((bird) => (
            <option value={bird._id}>{bird.latinName}</option>
          ))}
        </select>
      </label>

      <label className="block" htmlFor="bird">
        Und sonst so?
      </label>
      <textarea className="block" type="text" name="content" />
      <input type="file" name="bild" id="" />
      <button className="block p-2 bg-gray-800 rounded-md shadow-sm text-white">
        Hinzufügen
      </button>
    </form>
  );
};

export default AddEntry;
