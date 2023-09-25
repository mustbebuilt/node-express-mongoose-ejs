// Import the necessary modules
const Film = require("../models/Film");

// Define the controller functions
const getAllData = async()=> {
  try {
    // Query the collection to retrieve all films
    const films = await Film.find();
    console.dir(Film);
    return films;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { error: "Failed to retrieve data" };
  }
}

const getLatestFilms = async () => {
  try {
    const films = await Film.find().sort({ releaseDate: -1 }).limit(4);
    return films;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { error: "Failed to retrieve data" };
  }
}

const getDataById = async(id)=> {
  try {
    // Query the collection to retrieve a film by ID
    const film = await Film.findById(id);
    return film;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { error: "Failed to retrieve data" };
  }
}

// search
const searchResults = async(searchTerm)=> {
  console.info("searchTerm:", searchTerm);
  try {
    // const data = await Film.find({ filmTitle: searchTerm});
        const data = await Film.find({ filmTitle: { $regex: new RegExp(searchTerm, 'i') } });
    console.info("data:", data);
     return data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { error: "Failed to retrieve data" };
  }
}

// create
const createData = async (data)  =>{
  try {
    const newDocument = await Film.create(data);
    console.log(newDocument);
    return newDocument;
  } catch (error) {
    console.error("Error creating data:", error);
    return { error: "Failed to create data" };
  }
}
// update
const updateData  = async (id, data) => {
  try {
    const updatedDocument = await Film.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedDocument;
  } catch (error) {
    console.error("Error updating data:", error);
    return { error: "Failed to update data" };
  }
}

// delete
const deleteData = async (id) => {
  try {
    const deletedDocument = await Film.findByIdAndDelete(id);
    return deletedDocument;
  } catch (error) {
    console.error("Error deleting data:", error);
    return { error: "Failed to delete data" };
  }
}


// Export the controller functions
module.exports = {
  getLatestFilms,
  getAllData,
  getDataById,
  searchResults,
  createData,
  updateData,
  deleteData
};
