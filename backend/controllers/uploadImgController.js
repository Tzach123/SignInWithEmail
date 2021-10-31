import asyncHandler from 'express-async-handler'

export const getImg = asyncHandler((req, res) => {
  res.json({ img: `/${req.file.path}` })
})
