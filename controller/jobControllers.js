import express, { response } from "express";
import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModal.js";
import { NotFoundError } from "../customErrors/customError.js";
import User from "../models/userModal.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const getJobs = async (req, res) => {
  const { search, jobStatus, jobType,sort } = req.query;
  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);

  const totalJobs = await Job.countDocuments();
  const numOfPages = Math.ceil(totalJobs / limit);

  if (!jobs) return res.status(404).json({ msg: "Job not found" });
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, cureentPage: page, jobs });
};

// Create a new job

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  if (!req.body.company || !req.body.position)
    throw new NotFoundError(`Job ${jobType} not found`);

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Get a single job

export const getJob = async (req, res) => {
  const { id } = req.params;

  const theJob = await Job.findById(id);
  if (!theJob) throw new NotFoundError(`Job with id: ${id} is not found`);
  res.status(StatusCodes.OK).json({ theJob });
};

// Delete a job

export const deleteJob = async (req, res) => {
  const id = req.params.id;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) throw new NotFoundError(`Job with id ${id} not found`);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Job removed successfully", removedJob });
};

// Edit the job

export const editJob = async (req, res) => {
  const id = req.params.id;
  const the_job = await Job.findByIdAndUpdate(id, req.body, { new: true });

  if (!the_job) {
    throw new NotFoundError(`Job with id ${id} not found`);
  }

  res.status(200).json({ msg: "Job modified successfully", the_job });
};

// job stats
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);

  const defaultStatus = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  console.log(monthlyApplications);

  res.status(StatusCodes.OK).json({
    monthlyApplications,
    defaultStatus,
  });
};
