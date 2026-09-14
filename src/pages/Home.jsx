import people from "../data/people.json";

function Home() {
  return (
    <main className="container mt-5">
      <div>
        {people.map((person) => (
          <div className="card mb-3" key={person.personKey}>
            <div className="cardBody">
              <h3 className="card-title">
                {person.name.first} {person.name.last}
              </h3>
              <div className="row">
                <div className="col-6">
                  <p>
                    <strong>Birthplace:</strong>
                    {person.birth.location.town}, {person.birth.location.state}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
