import { JWT_SECRET } from "../configs/index.js";
import { pool } from "../db/index.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function verifyEmail(userEmail) {
  var checkDomain = 0;
  var checkAtSign = 0;
  if (userEmail.indexOf("@") > -1) {
    checkAtSign = 1;
  }
  if (
    userEmail.indexOf(".com") > -1 ||
    userEmail.indexOf(".in") > -1 ||
    userEmail.indexOf(".org") > -1
  ) {
    checkDomain = 1;
  }

  if (checkAtSign != 1 || checkDomain != 1) {
    return 0;
  } else {
    return 1;
  }
}

const createUser = async (req, res) => {
  try {
    const { userEmail, userPassword, userName } = req.body;

    if (!userName) {
      return res.status(400).json({ error: "Username can't be empty" });
    } else if (!userEmail) {
      return res.status(400).json({ error: "UserEmail Can't be empty" });
    } else if (!userPassword) {
      return res.status(400).json({ error: "Password can't be empty" });
    }

    if (!verifyEmail(userEmail)) {
      return res.status(400).json({ error: "Use a valid email id" });
    }

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE "userEmail" = $1',
      [userEmail.toUpperCase()]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Email already in use" });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        imageUrl = result.secure_url;
      } else {
        return res
          .status(500)
          .json({ error: "Failed to upload image to Cloudinary" });
      }
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const result = await pool.query(
      'INSERT INTO users ("userEmail", "userPassword", "userName", "userType", "userImgUrl") VALUES ($1, $2, $3, $4, $5) RETURNING "userId", "userEmail", "userName", "userType", "userImgUrl"',
      [userEmail.toUpperCase(), hashedPassword, userName, "users", imageUrl]
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      {
        userId: newUser.userId,
        userEmail: newUser.userEmail,
        userType: newUser.userType,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE "userEmail" = $1',
      [userEmail.toUpperCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      String(userPassword),
      user.userPassword
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        userEmail: user.userEmail,
        userType: user.userType,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      'DELETE FROM users WHERE "userId" = $1 RETURNING *',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUser, loginUser, deleteUser };
