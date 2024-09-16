const User = require("../model/User");

module.exports.DisplayAllPlants = async (req, res) => {
  try {
    let {garden} = await User.find({ id: req.body.id });
    if (garden.length == 0) {
      res.status(200).json({ message: "No plants found in your garden" });
    }
    res.status(200).json({ plants: garden });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports.AddPlant = async (req, res) => {
  try {
    const { imgUrl, name, id } = req.body;
    const plant = new Object({ imgUrl: imgUrl, name: name });
    let user = await User.findById(id);
    if (!user) {
      res.status(404).json({message: "User not found" });
    }
    user.garden.push(plant);
    await user.save();
    res.status(200).json({ message: "plant added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports.DeletePlant = async (req, res) => {
  try {
    let { garden } = await User.findById(req.session.user._id);
    const index = req.params.index;
    garden.splice(index, 1)
    await User.findByIdAndUpdate(req.body.id, {
      garden: garden,
    });
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports.startGrowing = async (req, res) => {
  try {
    let { garden } = await User.findById(req.body.id);
    const index = req.params.index;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    let growing = new Object({
      ...garden[index],
      plantedDate: formattedToday,
    });
    garden[index] = growing;
    await User.findByIdAndUpdate(req.body.id, { garden: garden });
    res.status(200).json({ message: "Plant started growing" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
