import JWT from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/UserModel.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const accessToken = req.headers["authorization"]?.replace("Bearer ", "");
    if (!accessToken) throw new ApiError(401, "Unauthorized request");

    const decodedToken = JWT.verify(accessToken, process.env.JWT_TOKEN);

    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      error?.statusCode || 401,
      error?.message || "Invalid access token"
    );
  }
});
