import Task from "../models/Task.js";


// Create task
// @route POST /api/tasks

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get all tasks (search + filter + pagination)
// @route GET /api/tasks

export const getTasks = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 5 } =
      req.query;


    const query = {
      userId: req.user._id
    };

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    // Filter
    if (status) {
      query.status = status;
    }

    // console.log("FINAL QUERY =", query);

    const skip = (page - 1) * limit;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    // total tasks of user (NO FILTER)
    const totalTasks = await Task.countDocuments({
      userId: req.user._id
    });

    // global completed
    const completed = await Task.countDocuments({
      userId: req.user._id,
      status: "completed"
    });

    // global pending
    const pending = await Task.countDocuments({
      userId: req.user._id,
      status: "pending"
    });

    // global completion rate
    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round(
          (completed / totalTasks) * 100
        );


    const filteredTotal =
      await Task.countDocuments(query);

    res.status(200).json({
      success: true,

      total: filteredTotal,

      page: Number(page),

      pages: Math.ceil(
        filteredTotal / limit
      ),

      stats: {
        total: totalTasks,
        completed,
        pending,
        completionRate
      },

      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Update task
// @route PUT /api/tasks/:id

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// @route DELETE /api/tasks/:id

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//   @route PATCH /api/tasks/:id/toggle

export const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    task.status =
      task.status === "pending"
        ? "completed"
        : "pending";

    await task.save();

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};