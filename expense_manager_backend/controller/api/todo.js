const User = require("../../models/user");
const Todo = require("../../models/todo");

module.exports.create = async (req, res) => {
  const user = req.user;
  console.log(user._id);
  // You can now use the user object to access user details

  try {
    const dateString = req.body.date;
    const parts = dateString.split("-"); // Split the string into an array ['21', '02', '2023']

    // Convert the date parts to numbers
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are 0-based (0 = January, 1 = February, ...)
    const year = parseInt(parts[2], 10);

    // Create a Date object
    const dateObject = new Date(year, month, day);

    console.log("user id", req.user.name);
    let todo = await Todo.create({
      description: req.body.description,
      date: dateObject,
      category: req.body.category,
      price: req.body.price,
      userid: req.user._id,
    });
    return res.status(200).json({
      success: true,
      message: "Hurray! data is created",
      data: {
        todo: todo,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports.gets = async (req, res) => {
  try {
    let todos = await Todo.find({ userid: req.user._id });

    return res.status(200).json({
      success: true,
      message: "Hurray! You fetched the Todo successfully",
      data: {
        todos: todos,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports.getall = async (req, res) => {
  try {
    let todos = await Todo.find();
    if (todos) {
      return res.status(200).json({
        success: true,
        message: "Hurray! You fetched all Todos sucessfully",
        data: {
          todos: todos,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports.update = async (req, res) => {
  try {
    // let todo = await Todo.findOne({_id:req.params.id})
    let todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
console.log(todo);
    if (todo) {
      return res.status(200).json({
        success: true,
        message: "Hurray! data is updated",
        data: {
          todo,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports.delete = async (req, res) => {
  try {
    console.log(req.params.id);
    await Todo.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
