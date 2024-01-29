const sortData = require('../../middlewares/sort')

const mockError = jest.fn()
jest.mock('../../utils/logger', () => ({
  error: (...args) => mockError(...args),
}))

describe('Sort middleware', () => {
  let mockRequest, mockResponse, mockNext

  beforeEach(() => {
    jest.clearAllMocks()

    mockRequest = {}
    mockResponse = {}
    mockNext = jest.fn()
  })

  it('Should sort values', () => {
    mockResponse = {
      locals: {
        sortBy: 'value',
        order: 'asc',
        data: [
          { value: 1 },
          { value: 3 },
          { value: 2 },
        ],
      },
      send: jest.fn(),
    }

    sortData(mockRequest, mockResponse, mockNext)

    expect(mockResponse.send).toHaveBeenCalledWith([
      { value: 1 },
      { value: 2 },
      { value: 3 },
    ])
    expect(mockNext).not.toHaveBeenCalled()
    expect(mockError).not.toHaveBeenCalled()
  })

  it('Should handle error', () => {
    const error = new Error('Some error')
    mockResponse = {
      locals: {
        sortBy: 'value',
        order: 'asc',
        data: [],
      },
      send: jest.fn(),
    }

    jest.spyOn(mockResponse.locals.data, 'sort').mockImplementation(() => {
      throw error
    })

    sortData(mockRequest, mockResponse, mockNext)

    expect(mockError).toHaveBeenCalledWith(error)
    expect(mockNext).toHaveBeenCalledWith(error)
    expect(mockResponse.send).not.toHaveBeenCalled()
  })
})