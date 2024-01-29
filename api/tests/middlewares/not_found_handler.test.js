const notFoundHandler = require('../../middlewares/not_found_handler')

describe('Not found handler middleware', () => {
  it('Should send not found obj', () => {
    const mockRequest = {
      url: "/some/path"
    }
    const mockResponse = {}
    const mockNext = jest.fn()

    notFoundHandler(mockRequest, mockResponse, mockNext)
    
    expect(mockNext).toHaveBeenCalledWith({
      status: 404,
      msg: '/some/path not found'
    })
  })
})