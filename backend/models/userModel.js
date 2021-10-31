import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdProcessUserAt: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdUserAt: {
      type: Date,
    },
    selfieImg: {
      data: Buffer,
      contentType: String,
    },
    passportImg: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamp: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
