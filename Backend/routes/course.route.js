import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getallUsers,
  getCourseById,
  getCourseInfo,
  getCourseLecture,
  getCreatorCourses,
  getlecture,
  getLectureById,
  getPublishedCourse,
  getUserInfo,
  makeAdmin,
  removeAdmin,
  removeLecture,
  searchCourse,
  togglePublishCourse,
} from "../controllers/course.controller.js";
const router = express.Router();

router.route("/getuser").post(getlecture);
router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get( isAuthenticated,getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/users").get(isAuthenticated, getallUsers);
router.route("/makes/:userId").put(isAuthenticated, makeAdmin);
router.route("/removes/:userId").put(isAuthenticated, removeAdmin);
router.route("/users/edit/:userId").get(isAuthenticated, getUserInfo);
router.route("/course-detail/:courseId").get(isAuthenticated,getCourseInfo);
router
.route("/:courseId")
.put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);

router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);


export default router;
