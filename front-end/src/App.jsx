import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import PropertyList from "./components/PropertyList";
import CreatePropertyForm from "./components/CreatePropertyForm";
import Filtering from "./components/Filtering";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/get-properties")
      .then((response) => response.json())
      .then((data) => {
        return setProperties(data.properties);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedProperties = Array.from(properties);
    // get the index of the property that was moved in the overall array
    const index = updatedProperties.findIndex(
      (prop) => prop._id.toString() === result.draggableId
    );
    const [movedProperty] = updatedProperties.splice(index, 1);
    movedProperty.group = result.destination.droppableId;
    updatedProperties.splice(index, 0, movedProperty);

    setProperties(updatedProperties);
  };

  const handleSave = () => {
    fetch("http://localhost:3000/api/save-properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertiesData: { properties } }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        toast.success("Successfully saved changes!");
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
        toast.error("Error saving changes");
      });
  };

  const cleaningsRequired = filteredProperties
    .filter((prop) => prop.group === "Exited")
    .reverse();
  const cleaningsPending = filteredProperties
    .filter((prop) => prop.group === "Cleaning")
    .reverse();
  const cleaningsDone = filteredProperties
    .filter((prop) => prop.group === "Full Property List")
    .reverse();

  const handleCreateProperty = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <Toaster position="top-right" reverseOrder={false} />
      <button className="create" onClick={handleCreateProperty}>
        Create a Property
      </button>
      <Filtering
        properties={properties}
        setFilteredProperties={setFilteredProperties}
      />
      <button onClick={handleSave}>Save Changes</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="lists">
          <PropertyList
            properties={cleaningsRequired}
            droppableId="Exited"
            title="Cleanings Required"
          />
          <PropertyList
            properties={cleaningsPending}
            droppableId="Cleaning"
            title="Cleanings Pending"
          />
          <PropertyList
            properties={cleaningsDone}
            droppableId="Full Property List"
            title="Cleanings Done"
          />
        </div>
      </DragDropContext>
      {isModalOpen && (
        <CreatePropertyForm
          setIsModalOpen={setIsModalOpen}
          setProperties={setProperties}
        />
      )}
    </div>
  );
}

export default App;
