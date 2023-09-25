const express = require("express");
const router = express.Router();
const dataController = require("../controllers/controllers");

// GET /
router.get("/", async (req, res) => {
  try {
    const data = await dataController.getLatestFilms();
    res.render("films",   {
          title: "Welcome to CineList",
          films: data,
        });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/film/:id", async (req, res) => {
  try {
    const data = await dataController.getDataById(req.params.id);
    console.log(data);
     res.render("oneFilm",   {
          title: data.filmTitle,
          film: data,
        });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const data = await dataController.searchResults(searchTerm);

    // Check if the search returned any documents
    if (data.length === 0) {
      // No documents found, set a message in the render options
      res.render("films", {
        title: "Search Results",
        searchMsg: `No results found for the search term ${searchTerm}.`,
      });
    } else {
      // Documents found, render the view with the search results as before
      res.render("films", {
        title: "Search Results",
        films: data,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// CMS routes

// GET /cms

router.get("/cms", async (req, res) => {
  try {
    const data = await dataController.getAllData();
    res.render("cms", {
      title: "CMS",
      films: data,
    });
      } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /cms/edit
// EDIT GET
router.get("/cms/edit/:id", async (req, res) => {
  try {
    const data = await dataController.getDataById(req.params.id);
    console.log(data);
    const unformattedDate = new Date(data.releaseDate);
    const year = unformattedDate.getFullYear();
    const month = String(unformattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(unformattedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
     res.render("edit",   {
          title: data.filmTitle,
          film: data,
          formattedDate: formattedDate,
        });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// EDIT POST
router.post("/cms/edit/", async (req, res) => {
  try {
    const updatedData = await dataController.updateData(
      req.body.id,
      req.body
    );
    res.redirect("/cms");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ADD GET
router.get("/cms/insert", async (req, res) => {
  res.render("insert", {title: "Add a new film"});
});

// ADD POST
router.post("/cms/insert", async (req, res) => {
  try {
    console.log(req.body);
    const newData = await dataController.createData(req.body);
    console.log(newData);
    res.redirect("/cms");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE GET
router.get("/cms/delete/:id", async (req, res) => {
  try {
    const data = await dataController.getDataById(req.params.id);
    console.log(data);
     res.render("delete",   {
          title: data.filmTitle,
          film: data,
        });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE POST
router.post("/cms/delete/", async (req, res) => {
  try {
    const deletedData = await dataController.deleteData(req.body.filmID);
        res.redirect("/cms");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
