const { Router } = require("express");
const router = Router();
const FilterScheme = require("../models/FilterScheme");

// get
router.get("/", async (req, res) => {
  try {
    const fscheme = await FilterScheme.find();

    res.status(200).json(fscheme);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
// get

//post
router.post("/", async (req, res) => {
    const { name } = req.body;
  
    let fscheme = await FilterScheme.findOne({ name });
    if (fscheme) return res.send("Fscheme undefined!");
  
    fscheme = new FilterScheme(req.body);
    await fscheme.save();
  
    res.send("Fscheme Created: OK");
  });
  //post
  
  //delete
  router.delete("/:_id", async (req, res) => {
    try {
      await FilterScheme.findByIdAndDelete({ _id: req.params._id });
  
      res.send(`${req.params._id} Fscheme deleted: OK`);
    } catch (error) {
      console.log({
        error,
        message: "Fscheme did not delete, something wrong!",
      });
    }
  });
  //delete
  
  //patch
  router.patch("/:_id", async (req, res) => {
    try {
      const _id = req.params._id;
      const updFscheme = req.body;
  
      const result = await FilterScheme.findByIdAndUpdate(_id, updFscheme);
      res.send(result);
    } catch (error) {
      console.log({
        error,
        message: "Patch did not work, Error!",
      });
    }
  });
  // patch


module.exports = router;