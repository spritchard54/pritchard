import people from "../data/people.json";

function Home() {
  return (
    <main className="container mt-5">
      <div>
        {people.map((person) => (
          <div className="card mb-3 px-3 py-2" key={person.personKey}>
            <div className="cardBody">
              <h3 className="card-title">
                {person.name.first} {person.name.last}
              </h3>
              <div className="row">
                <div className="col-9">
                  <p>
                    <strong>Date of Birth:</strong> {person.birth.date}
                  </p>
                  <p>
                    <strong>Birthplace:</strong> {person.birth.location.town},{" "}
                    {person.birth.location.state},{" "}
                    {person.birth.location.country}
                  </p>

                  <div>
                    <strong>Biography:</strong>

                    {person.bio.map((block, index) => {
                      if (block.type === "paragraph") {
                        return <p key={index}>{block.text}</p>;
                      }

                      if (block.type === "list") {
                        return (
                          <ul className="twoCol mb-3" key={index}>
                            {block.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
                <div className="col-3">
                      {person.profileImg && (

                  <img
                    src={person.profileImg}
                    className="img-fluid"
                    alt={`${person.name.first} ${person.name.last}`}
                  />

                      )}
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
