const BirdList = ({birds}) => (
  <div>
    <h2>Birds</h2>
    <ul>
      {birds.map((bird) => (
        <li key={bird._id}>
          <img
            style={{ maxWidth: "200px" }}
            src={bird.imageUrl}
            alt={`${bird.name}`}
          />
          <p>{bird.latinName}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default BirdList;
