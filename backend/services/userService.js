import User from '../models/userModel.js'
import generateToken from '../util/generateToken.js'

export const createUser = async ({ email, password }) => {
  try {
    const userExist = await User.findOne({ email })

    if (userExist) {
      throw new Error('User alresdy exists !')
    } else {
      const user = await User.create({
        email,
        password,
        createdProcessUserAt: Date.now(),
      })

      return {
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      }
    }
  } catch (e) {
    throw e
  }
}

export const updateUser = async (
  _id,
  { first_name, last_name, phone_number }
) => {
  try {
    const user = await User.findById(_id)

    if (!user) {
      throw new Error('User does not exist !')
    } else {
      user.firstName = first_name
      user.lastName = last_name
      user.phone = phone_number
      user.createdUserAt = Date.now()

      const updateUser = await user.save()

      return updateUser
    }
  } catch (e) {
    throw e
  }
}
