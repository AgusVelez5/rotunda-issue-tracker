const errorHandler = require('../../middlewares/error_handler')

describe('Error handler middleware', () => {
  let mockRequest, mockResponse

  beforeEach(() => {
    jest.clearAllMocks()

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockImplementation(() => mockResponse),
      send: jest.fn()
    };
  })

  it('Should send received data', () => {
    const error = {
      status: 400,
      msg: 'Bad request'
    }

    errorHandler(error, mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(error.status)
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: {
        status: error.status,
        message: error.msg
      }
    })
  })

  it('Should send default values', () => {
    const error = {}
    const expected = {
      error: {
        status: 500,
        message: 'Internal Server Error'
      }
    }

    errorHandler(error, mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(expected.error.status)
    expect(mockResponse.send).toHaveBeenCalledWith(expected)
  })
})