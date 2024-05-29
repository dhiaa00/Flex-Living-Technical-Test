import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import PropertyItem from "./PropertyItem";

const PropertyList = ({ properties = [], droppableId = "", title = "" }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => {
        return (
          <div
            className="list"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <h2>{title}</h2>
            {properties.map((property, index) => (
              <Draggable
                key={property._id}
                draggableId={property._id.toString()}
                index={index}>
                {(provided) => (
                  <PropertyItem provided={provided} property={property} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default PropertyList;
