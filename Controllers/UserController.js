import { User } from "../Models/UserModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password)
    throw new ApiError(400, "All fields are required!");

  const userExists = await User.findOne({ $or: [{ email }, { mobile }] });

  if (userExists)
    throw new ApiError(409, "User with email or mobile already exists");

  const createdUser = await User.create({
    name,
    email,
    mobile,
    password,
  });

  const user = await User.findById(createdUser._id).select("-password");

  if (!user)
    throw new ApiError(500, "Error occurred while registering the user!");
  const accessToken = user.generateAccessToken();

  res.status(201).json(
    new ApiResponse(201, "User registered successfully!", {
      user,
      accessToken,
    })
  );
});

//Login Controller

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "Email is required!");
  if (!password) throw new ApiError(400, "Password is required!");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User does not exists!");

  const isPasswordCorrect = await user.isPasswordValid(password);
  if (!isPasswordCorrect) throw new ApiError(401, "Invalid user credentials!");

  const accessToken = user.generateAccessToken();
  const loggedInUser = { ...user._doc };
  delete loggedInUser.password;

  res.status(200).json(
    new ApiResponse(200, "User logged in successfully!", {
      user: loggedInUser,
      accessToken,
    })
  );
});

//Get User Controller
export const getUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, "User validated successfully", { user: req.user })
    );
});
