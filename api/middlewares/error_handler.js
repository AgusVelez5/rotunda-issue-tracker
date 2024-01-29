module.exports = (error, _, res, __) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.msg || 'Internal Server Error',
    },
  })
}
