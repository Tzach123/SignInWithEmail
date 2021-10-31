import emailValidator from 'email-validator'
import passValidator from 'password-validator'
import { phone } from 'phone'

const validationFirstRegistration = ({ email, password, password_confirm }) => {
  if (!validationEmail(email)) {
    throw new Error(
      'Invalid email ! must be in the following format: {text}@{text}.com'
    )
  }
  if (!passwordValidation(password)) {
    throw new Error(
      'The password must contain 8-32 characters, uppercase, lowercase and numbers !'
    )
  }
  if (password !== password_confirm) {
    throw new Error('The password and confirm password must be equal! !')
  }
  return true
}

const validationLastRegistration = ({
  first_name,
  last_name,
  phone_number,
  passImgPath,
  selfieImgPath,
}) => {
  if (first_name.length <= 1 || last_name.length <= 1) {
    throw new Error('Name must contain minimum one character !')
  }

  if (!phoneValidation(phone_number).isValid) {
    throw new Error('The phone number must be in IL format !')
  }

  if (!passImgPath || !selfieImgPath) {
    throw new Error('The image are required !')
  }

  return true
}

const validationEmail = (email) => {
  return emailValidator.validate(email)
}

const passwordValidation = (password) => {
  var schema = new passValidator()
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(32) // Maximum length 32
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least digit
    .has()
    .not()
    .spaces() // Should not have spaces
  return schema.validate(password)
}

const phoneValidation = (phone_number) => {
  return phone(phone_number, { country: 'IL' })
}

export { validationFirstRegistration, validationLastRegistration }
