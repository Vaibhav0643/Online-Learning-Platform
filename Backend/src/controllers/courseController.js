import { pool } from "../db/index.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadCourse = async (req, res) => {
  try {
    const { courseTitle, courseDescription, videoURLs, videoTitle } = req.body;

    if (
      !courseTitle ||
      !courseDescription ||
      !videoURLs ||
      !videoTitle ||
      !req.file ||
      videoURLs.length === 0
    ) {
      return res.status(400).json({
        error:
          "Course title, description,Course banner image, and at least one video URL and VideoTitle are required",
      });
    }

    const videoURLsArray = videoURLs.split(",");
    const videoTitleArray = videoTitle.split(",");

    console.log(videoURLsArray);
    console.log(videoTitleArray);

    let courseBannerImage = null;
    const result = await uploadOnCloudinary(req.file.path);
    if (result) {
      courseBannerImage = result.secure_url;
    } else {
      return res
        .status(500)
        .json({ error: "Failed to upload image to Cloudinary" });
    }

    const courseResult = await pool.query(
      'INSERT INTO courses ("courseTitle", "courseDescription", "courseBannerImage", "ownerId","videoCount") VALUES ($1, $2, $3, $4,$5) RETURNING *',
      [
        courseTitle,
        courseDescription,
        courseBannerImage,
        req.userId,
        videoURLsArray.length,
      ]
    );

    const uploadedCourse = courseResult.rows[0];
    const courseId = uploadedCourse.courseId;

    const videoInsertPromises = videoURLsArray.map(async (videoURL, index) => {
      try {
        const result = await pool.query(
          'INSERT INTO course_videos ("courseId", "videoURL","videoNumber","videoTitle") VALUES ($1, $2,$3,$4) RETURNING *',
          [courseId, videoURL, index + 1, videoTitleArray[index]]
        );
        return result.rows[0];
      } catch (error) {
        console.error("Error inserting video URL:", error);
        return null;
      }
    });

    const videoResults = await Promise.all(videoInsertPromises);
    res.status(201).json({
      message: "Course uploaded successfully",
      course: uploadedCourse,
      videos: videoResults,
    });
  } catch (error) {
    console.error("Error uploading course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const courseResult = await pool.query(
      'SELECT * FROM courses WHERE "courseId" = $1',
      [courseId]
    );

    const course = courseResult.rows[0];

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const isAdmin = req.userType === "admin";
    const isCourseOwner = await checkCourseOwnership(req.userId, courseId);
    const isEnrolled = await checkUserEnrollment(req.userId, courseId);

    let courseDetails;

    if (isAdmin || isCourseOwner) {
      const videosResult = await pool.query(
        'SELECT * FROM course_videos WHERE "courseId" = $1 ORDER BY "videoId"',
        [courseId]
      );

      const videos = videosResult.rows;

      const enrolledUsersResult = await pool.query(
        'SELECT users."userId", users."userName", users."userImgUrl" FROM users_courses JOIN users ON users_courses."userId" = users."userId" WHERE users_courses."courseId" = $1',
        [courseId]
      );

      const enrolledUsers = enrolledUsersResult.rows;
      courseDetails = {
        ...course,
        videos,
        enrolledUsers,
      };
    } else if (isEnrolled) {
      const videosResult = await pool.query(
        'SELECT * FROM course_videos WHERE "courseId" = $1 ORDER BY "videoId"',
        [courseId]
      );

      const videos = videosResult.rows;

      const userProgress = await pool.query(
        'SELECT progress FROM users_courses WHERE "courseId" = $1 AND "userId" = $2',
        [courseId, req.userId]
      );

      const progress = userProgress.rows[0].progress;

      courseDetails = {
        ...course,
        videos,
        progress,
      };
    } else {
      courseDetails = {
        ...course,
      };
    }

    res.status(200).json({ courseDetails });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const enrollUserInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.userId;

    const isEnrolled = await checkUserEnrollment(userId, courseId);

    if (isEnrolled) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in the course" });
    }

    await pool.query(
      'INSERT INTO users_courses ("courseId", "userId","progress") VALUES ($1, $2,$3)',
      [courseId, userId, 0]
    );

    res.status(201).json({
      message: "User enrolled in the course successfully",
    });
  } catch (error) {
    console.error("Error enrolling user in the course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//****************THIS FUNCTION NEEDS TO BE TESTED*********************
const getAllCourses = async (req, res) => {
  try {
    const courses = await pool.query("SELECT * FROM courses");

    if (!courses) {
      return res.status(404).json({ error: "No courses found" });
    }

    // Check if any courses were found
    if (courses.rows.length === 0) {
      return res.status(200).json({ courses: [] }); // Return an empty array if no courses found
    }

    res.status(200).json({ courses: courses.rows });
  } catch (error) {
    console.error("Error fetching all courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//****************THIS FUNCTION NEEDS TO BE TESTED*********************
const getUserCourses = async (req, res) => {
  try {
    const userId = req.params.userId;

    const courses = await pool.query(
      'SELECT c.* FROM users_courses uc JOIN courses c ON uc."courseId" = c."courseId" WHERE uc."userId"=$1',
      [userId]
    );

    if (!courses) {
      return res.status(404).json({ error: "No courses found" });
    }

    // Check if any courses were found
    if (courses.rows.length === 0) {
      return res.status(200).json({ courses: [] }); // Return an empty array if no courses found
    }

    res.status(200).json({ courses: courses.rows });
  } catch (error) {
    console.error("Error fetching courses for the given userId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const isAdmin = req.userType === "admin";

    const isCourseOwner = await checkCourseOwnership(req.userId, courseId);

    if (!isAdmin && !isCourseOwner) {
      return res
        .status(403)
        .json({ error: "Permission denied - User cannot delete this course" });
    }

    await pool.query('DELETE FROM courses WHERE "courseId" = $1', [courseId]);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const videoNumber = req.params.videoNumber;
    const videoCount = req.params.videoCount;
    const userId = req.params.userId;

    console.table([userId, courseId, videoNumber, videoCount]);

    const progressPercentage = Math.round((videoNumber / videoCount) * 100);

    const userProgress = await pool.query(
      'UPDATE users_courses SET "progress" = $1 WHERE "courseId" = $2 AND "userId" = $3 RETURNING *',
      [progressPercentage, courseId, userId]
    );
    console.log(userProgress);

    const progress = userProgress.rows[0].progress;

    res.status(200).json({ progress });
  } catch (error) {
    console.error("Error updating user progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWebsiteStats = async (req, res) => {
  try {
    const videosResult = await pool.query("SELECT COUNT(*) FROM course_videos");
    const totalVideos = parseInt(videosResult.rows[0].count);

    const enrolledUsersResult = await pool.query(
      "SELECT COUNT(*) FROM users_courses"
    );
    const totalEnrolledStudents = parseInt(enrolledUsersResult.rows[0].count);

    const coursesResult = await pool.query("SELECT COUNT(*) FROM courses");
    const totalCourses = parseInt(coursesResult.rows[0].count);

    res.status(200).json({
      totalVideos,
      totalEnrolledStudents,
      totalCourses,
    });
  } catch (error) {
    console.error("Error fetching website statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkUserEnrollment = async (userId, courseId) => {
  const enrollmentResult = await pool.query(
    'SELECT * FROM users_courses WHERE "userId" = $1 AND "courseId" = $2',
    [userId, courseId]
  );

  return enrollmentResult.rows.length > 0;
};

const checkCourseOwnership = async (userId, courseId) => {
  const ownershipResult = await pool.query(
    'SELECT * FROM courses WHERE "courseId" = $1 AND "ownerId" = $2',
    [courseId, userId]
  );

  return ownershipResult.rows.length > 0;
};

const editCourse = async (req, res) => {
  try {
    console.log("Hello from EDIT");
    const courseId = req.params.courseId;
    const { courseTitle, courseDescription, videoURLs, videoTitle } = req.body;
    console.table([courseTitle, courseDescription, videoURLs, videoTitle]);

    if (!courseTitle || !courseDescription || !videoURLs || !videoTitle) {
      return res.status(400).json({
        error:
          "Course title, description, video URLs, and video titles are required",
      });
    }

    // Split video URLs and titles into arrays
    const videoURLsArray = videoURLs.split(",");
    const videoTitlesArray = videoTitle.split(",");

    let courseBannerImage = null;
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        courseBannerImage = result.secure_url;
      } else {
        return res
          .status(500)
          .json({ error: "Failed to upload image to Cloudinary" });
      }
    }

    // Update course info
    const courseUpdateResult = await pool.query(
      'UPDATE courses SET "courseTitle" = $1, "courseDescription" = $2, "courseBannerImage" = $3 WHERE "courseId" = $4 RETURNING *',
      [courseTitle, courseDescription, courseBannerImage, courseId]
    );

    const updatedCourse = courseUpdateResult.rows[0];

    // Update video info
    const videoUpdatePromises = videoURLsArray.map(async (videoURL, index) => {
      try {
        const result = await pool.query(
          'UPDATE course_videos SET "videoURL" = $1, "videoTitle" = $2 WHERE "courseId" = $3 AND "videoNumber" = $4 RETURNING *',
          [videoURL, videoTitlesArray[index], courseId, index + 1]
        );
        return result.rows[0];
      } catch (error) {
        console.error("Error updating video information:", error);
        return null;
      }
    });

    const updatedVideos = await Promise.all(videoUpdatePromises);

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
      videos: updatedVideos,
    });
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllCourses,
  getUserCourses,
  getCourseDetails,
  uploadCourse,
  enrollUserInCourse,
  deleteCourse,
  updateUserProgress,
  getWebsiteStats,
  editCourse,
};
