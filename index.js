const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for the "jobs" collection
const jobSchema = new mongoose.Schema({
  name: String,
  location: String,
  posted: String,
  status: String,
  applied: Number,
  jobViews: Number,
  daysLeft: Number,
  premium: Boolean,
  dateFormat: Date,
});

// Model for the "jobs" collection
const Job = mongoose.model("Job", jobSchema);

app.use(bodyParser.json());

// Create a new job
app.post("/jobs", async (req, res) => {
  try {
    const newJob = req.body;
    const job = await Job.create(newJob);
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create a new job" });
  }
});

// Get all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Get a single job by ID
app.get("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch the job" });
  }
});

// Update a job by ID
app.put("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = req.body;
    const job = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the job" });
  }
});

// Delete a job by ID
app.delete("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndRemove(jobId);
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the job" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
