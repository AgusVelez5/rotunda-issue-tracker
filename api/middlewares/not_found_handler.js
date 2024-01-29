module.exports = (req, _, next) => {
  next({
    status: 404,
    msg: `${req.url} not found`,
  })
}
