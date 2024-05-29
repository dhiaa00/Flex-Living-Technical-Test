import express from "express";
import cors from "cors";
import fs from "fs/promises";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(bodyParser.json({ limit: "10mb" }));

app.get("/api/get-properties", async (req, res) => {
  try {
    const propertiesData = await fs.readFile(
      "./back-end/data/properties.json",
      "utf-8"
    );
    res.status(200).send(propertiesData);
  } catch (error) {
    console.error("Error reading properties data:", error);
    res.status(500).send("Error reading properties data.");
  }
});

app.post("/api/save-properties", async (req, res) => {
  try {
    const { propertiesData } = req.body;
    await fs.writeFile(
      "./back-end/data/properties.json",
      JSON.stringify(propertiesData, null, 2)
    );
    res.status(200).send("Changes saved successfully.");
  } catch (error) {
    console.error("Error saving changes:", error);
    res.status(500).send("Error saving changes.");
  }
});

app.post("/api/create-property", async (req, res) => {
  try {
    const { propertyName, address, city } = req.body;
    const pastProps = await fs.readFile(
      "./back-end/data/properties.json",
      "utf-8"
    );
    const localProperties = JSON.parse(pastProps).properties;

    const lastElementId = localProperties[localProperties.length - 1]._id;

    const decimalId = BigInt("0x" + lastElementId);

    const newDecimalId = decimalId + BigInt(1);

    const newHexId = newDecimalId.toString(16);

    localProperties.push({
      _id: newHexId,
      propertyName,
      address,
      city,
      group: "Full Property List",
    });
    const newProperties = { properties: localProperties };
    await fs.writeFile(
      "./back-end/data/properties.json",
      JSON.stringify(newProperties, null, 2)
    );
    res.status(200).send("Property created successfully.");
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
