import React from "react";

const PropertyItem = ({ provided, property }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="property-item">
      {property.propertyName}
      <div className="info">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
          alt="profile"
        />
        <div className="city">{property.city}</div>
      </div>
    </div>
  );
};

export default PropertyItem;
