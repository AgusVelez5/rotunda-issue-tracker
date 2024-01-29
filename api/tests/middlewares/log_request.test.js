const logRequest = require('../../middlewares/log_request')

const mockInfo = jest.fn()
jest.mock('../../utils/logger', () => ({
  info: (...args) => mockInfo(...args),
}))

describe('LogRequest middleware', () => {
  let mockRequest, mockResponse, mockNext

  beforeEach(() => {
    jest.clearAllMocks()

    mockRequest = {
      method: 'GET',
      path: '',
    }
    mockResponse = {}
    mockNext = jest.fn()
  })

  it('Should log request', () => {
    mockRequest.path = "/some/path"

    logRequest(mockRequest, mockResponse, mockNext)
    
    expect(mockInfo).toHaveBeenCalledWith('GET /some/path')
    expect(mockNext).toHaveBeenCalled()
  })

  it('Should not log on health_check', () => {
    mockRequest.path = 'health_check'

    logRequest(mockRequest, mockResponse, mockNext)
    
    expect(mockInfo).not.toHaveBeenCalled()
    expect(mockNext).toHaveBeenCalled()
  })
})