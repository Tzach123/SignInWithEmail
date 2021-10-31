import axios from 'axios'
import { getErrorMessage } from '../utils/error'

export const createProcesUser = async (email, password, password_confirm) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/registration/createprocessuser`,
      { email, password, password_confirm },
      config
    )

    return data
  } catch (e) {
    throw getErrorMessage(e)
  }
}

export const getUser = async (token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/registration/getuser`, config)

    return data
  } catch (e) {
    throw getErrorMessage(e)
  }
}

export const updateProcesUser = async (
  { first_name, last_name, phone_number, passport_img, selfie_img },
  token
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const passImgPath = await uploadPassportImg(passport_img, token)
    const selfieImgPath = await uploadSelfieImg(selfie_img, token)

    const { data } = await axios.put(
      `/api/registration/updateprocessuser`,
      { first_name, last_name, phone_number, passImgPath, selfieImgPath },
      config
    )

    return data
  } catch (e) {
    throw getErrorMessage(e)
  }
}

const uploadPassportImg = async (img, token) => {
  try {
    const file = img.files[0]

    const formData = new FormData()
    formData.append('image', file)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(
      `/api/uploadimg/passport`,
      formData,
      config
    )
    return data
  } catch (e) {
    throw getErrorMessage(e)
  }
}

const uploadSelfieImg = async (img, token) => {
  try {
    const file = img.files[0]

    const formData = new FormData()
    formData.append('image', file)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(`/api/uploadimg/selfie`, formData, config)
    return data
  } catch (e) {
    throw getErrorMessage(e)
  }
}
