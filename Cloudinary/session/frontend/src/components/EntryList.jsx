const EntryList = ({ entries }) => (
  <div>
    <h2>Entries</h2>
    <ul>
      {entries.map((entry) => (
        <li key={entry._id}>
          {/* <img
            style={{ maxWidth: "200px" }}
            src={entry.imageUrl}
            alt={`${entry.name}`}
          /> */}
          <p>{entry.content}</p>
          <img style={{ maxWidth: "200px" }} src={entry.imageUrl} />
        </li>
      ))}
    </ul>
  </div>
);

export default EntryList;
