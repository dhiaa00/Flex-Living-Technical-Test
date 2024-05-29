import { useState } from "react";
import Modal from "react-modal";
import "/src/css/createPropertyForm.css";
import toast from "react-hot-toast";

const CreatePropertyForm = ({ setIsModalOpen, setProperties }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    city: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsModalOpen(false);
  };

  const handleCreateProperty = (event) => {
    event.preventDefault();
    const propertyName = formData.propertyName;
    const address = formData.address;
    const city = formData.city;

    fetch("http://localhost:3000/api/create-property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyName, address, city }),
    })
      .then((response) => response)
      .then((data) => {
        fetch("http://localhost:3000/api/get-properties")
          .then((response) => response.json())
          .then((data) => {
            return setProperties(data.properties);
          })
          .catch((error) => console.error("Error fetching properties:", error));
        closeModal();
        toast.success("Property successfully Created!");
      })
      .catch((error) => {
        console.error("Error creating property:", error);
        closeModal();
        toast.error("Error creating property");
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Create Property">
      <h2>Create Property</h2>
      <form>
        <label>
          Property Name:
          <input onChange={handleInputChange} type="text" name="propertyName" />
        </label>
        <label>
          Address:
          <input onChange={handleInputChange} type="text" name="address" />
        </label>
        <label>
          City:
          <input onChange={handleInputChange} type="text" name="city" />
        </label>
        <button onClick={handleCreateProperty} type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
};

export default CreatePropertyForm;
