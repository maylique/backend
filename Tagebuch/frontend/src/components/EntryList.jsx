const EntryList = ({ entries }) => {
  return (
    <div>
      {entries.map((entry) => (
        <div>{entry.content}</div>
      ))}
    </div>
  );
};

export default EntryList;
