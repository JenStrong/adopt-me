import React from "react"; //
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Minneapolis, MN" })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          // checks to make sure the data we want is acutally there
          if (Array.isArray(data.petfinder.pets.pet)) {
            // checks whether the data coming back is an array (multiple pets) or an object (a single pet)
            pets = data.petfinder.pets.pet; // if multiple pets, just hold the array
          } else {
            pets = [data.petfinder.pets.pet]; // if one pet, put data in an array
          }
        } else {
          pets = []; //if no pets, set data to empty array
        }

        this.setState({
          pets // you would normally write pets: pets, but since it's the same word, you can shorten it.
        });
      });
  }
  render() {
    return (
      <div className="search ">
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(",");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`} // this is a template string
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
