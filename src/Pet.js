import React from "react";

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location } = this.props; //this is destructuring it allows you to do console.log(name) instead of console.log(this.props.name)

    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn"); // this only keeps the one photo at the size "pn" if there are multiple photos for the pet
    }

    return (
      <div className="pet">
        <div className="image-container">
          <img src={photos[0].value} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </div>
    );
  }
}

export default Pet;
