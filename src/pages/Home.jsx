import people from "../data/people.json";
import relationships from "../data/relationships.json";

function Home() {
  return (
    <main className="container mt-5">
      <div>
        {/* 
          Loop through the people array.
          For each person, React will create a section of JSX containing
          that person's information and their relationships.
        */}
        {people.map((person) => {

          /*
            Get the current person's MongoDB ObjectId.

            person._id looks like:
            {
              "$oid": "6aa45d044b02fc3d05a49db2"
            }

            We only need the actual ID string, so we access .$oid.
          */
          const personId = person._id.$oid;


          /*
            Look through the relationships array for a spouse relationship
            involving the current person.

            We use .find() because a person should only have one current
            matching spouse relationship in this data model.

            The current person could be stored as either person1Id OR
            person2Id, so we check both fields.

            .find() returns the matching relationship object.
            If none is found, it returns undefined.
          */
          const spouseRelationship = relationships.find(
            (relationship) =>
              relationship.type === "spouse" &&
              (relationship.person1Id.$oid === personId ||
                relationship.person2Id.$oid === personId),
          );

          /*
            Find all parent-child relationships where the current person
            is listed as the parent.

            We use .filter() instead of .find() because a person can have
            multiple children.

            The result is a new array containing all of the matching
            parent-child relationship objects.
          */
          const childRelationships = relationships.filter(
            (relationship) =>
              relationship.type === "parent-child" &&
              relationship.parentId.$oid === personId,
          );

          /*
            Determine which person in the spouse relationship is the
            OTHER person.

            If the current person is person1Id, then their spouse must
            be person2Id.

            Otherwise, their spouse is person1Id.

            The ?. is optional chaining. If spouseRelationship is undefined,
            JavaScript will return undefined instead of causing an error.
          */
          const spouseId =
            spouseRelationship?.person1Id.$oid === personId
              ? spouseRelationship.person2Id.$oid
              : spouseRelationship?.person1Id.$oid;

          /*
            We now know the spouse's ID, but we still need the spouse's
            actual person record.

            Search the people array for the person whose MongoDB ObjectId
            matches spouseId.

            This gives us access to their name, birth information, etc.
          */
          const spouse = people.find(
            (otherPerson) => otherPerson._id.$oid === spouseId,
          );

          /*
            Convert the parent-child relationship records into actual
            person records.

            First, .map() goes through each parent-child relationship.

            For each relationship, .find() searches the people array
            for the person whose ObjectId matches relationship.childId.

            The result is an array of actual person objects representing
            the current person's children.

            .filter(Boolean) removes any undefined values in case a childId
            exists in relationships.json but the matching person cannot
            be found in people.json.
          */
          const children = childRelationships
            .map((relationship) =>
              people.find(
                (otherPerson) =>
                  otherPerson._id.$oid === relationship.childId.$oid,
              ),
            )
            .filter(Boolean);

          /*
            Return the JSX that will be displayed for the current person.

            person.personKey is used as React's unique key for each person
            created by the people.map().
          */
          return (
            <div key={person.personKey}>

              {/* Display the current person's name. */}
              <h3>
                {person.name.first} {person.name.last}
              </h3>

              {/* Display the current person's birthplace. */}
              <p>
                <strong>Birthplace:</strong> {person.birth.location.town},{" "}
                {person.birth.location.state}
              </p>

              {/*
                Only display the spouse section if a spouse was found.

                This is conditional rendering:
                if "spouse" contains a person object, render the <p>.
                If spouse is undefined, React renders nothing.
              */}
              {spouse && (
                <p>
                  <strong>Spouse:</strong> {spouse.name.first}{" "}
                  {spouse.name.last}
                </p>
              )}

              {/*
                Only display the Children section when the person has
                at least one child.

                We then use another .map() to display each child in the
                children array.
              */}
              {children.length > 0 && (
                <div className="mb-3">
                  <strong>Children:</strong>

                  {children.map((child) => (
                    <div key={child.personKey}>
                      {child.name.first} {child.name.last}
                    </div>
                  ))}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Home;