import asyncHandler from 'express-async-handler'
import {
  validationFirstRegistration,
  validationLastRegistration,
} from '../services/validationService.js'
import { comparePhotos } from '../services/reliableTests.js'
import { createUser, updateUser } from '../services/userService.js'
import { sendVerificationToEmail } from '../services/emailService.js'

//@des  Create a new user in the registration process
//@route  POST /api/registration/createprocessuser
//@access  public
const createProcessUser = asyncHandler(async (req, res) => {
  const userDetails = req.body
  // throw error in the case of user information is invalid
  validationFirstRegistration(userDetails)

  const user = await createUser(userDetails)

  await sendVerificationToEmail(user.email, user.token)

  res.status(201).json({
    success: true,
    message: `User for further process created! A link will be sent to your email for further registration..`,
  })
})

//@des  Updates user details
//@route  PUT /api/registration/createprocessuser
//@access  Private
const updateProcessUser = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const userDetails = req.body
  const { passImgPath, selfieImgPath } = req.body

  // throw error in the case of user information is invalid
  validationLastRegistration(userDetails)

  //Check if the passport photo and selfie match, Belonging to the same person.
  const isMatch = comparePhotos(passImgPath, selfieImgPath)

  if (!isMatch) {
    return res.json({
      success: false,
      message: `Image authentication failed ! The request was continued for further processing manually.`,
    })
  }

  updateUser(_id, userDetails)

  res.json({
    success: true,
    message: `Success!`,
  })
})

//@des  Get user
//@route  GET /api/registration/getuser
//@access  Private
const getUser = asyncHandler(async (req, res) => {
  res.json(req.user)
})

export { createProcessUser, updateProcessUser, getUser }
