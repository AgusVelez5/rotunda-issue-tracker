const getValidateQueryParams = require('../../middlewares/validate_query_params')

describe('Validate query params middleware', () => {
  let mockRequest, mockResponse, mockNext

  beforeEach(() => {
    jest.clearAllMocks()

    mockRequest = {}
    mockResponse = {}
    mockNext = jest.fn()
  })

  describe('Order validator', () => {
    it.each([
      {
        value: 'asc',
      },
      {
        value: 'desc',
      },
    ])('Should allow valid value: $value', ({ value }) => {
      const validateQueryParams = getValidateQueryParams(['order'])
      mockRequest.query = { order: value }
    
      validateQueryParams(mockRequest, mockResponse, mockNext)

      expect(mockNext).toHaveBeenCalled()
      expect(mockNext.mock.calls[0].length).toBe(0) // No arguments passed to next
    })

    it('Should deny invalid value', () => {
      const validateQueryParams = getValidateQueryParams(['order'])
      mockRequest.query = { order: 'fake-value' }
    
      validateQueryParams(mockRequest, mockResponse, mockNext)

      expect(mockNext).toHaveBeenCalled()
      expect(mockNext.mock.calls[0].length).toBe(1) // One argument passed to next
    })
  })

  describe('Sort by validator', () => {
    it('Should allow valid value: $value', () => {
      const validateQueryParams = getValidateQueryParams(['sortBy'])
      mockRequest.query = { sortBy: 'score' }
    
      validateQueryParams(mockRequest, mockResponse, mockNext)

      expect(mockNext).toHaveBeenCalled()
      expect(mockNext.mock.calls[0].length).toBe(0) // No arguments passed to next
    })

    it('Should deny invalid value', () => {
      const validateQueryParams = getValidateQueryParams(['sortBy'])
      mockRequest.query = { sortBy: 'fake-value' }
    
      validateQueryParams(mockRequest, mockResponse, mockNext)

      expect(mockNext).toHaveBeenCalled()
      expect(mockNext.mock.calls[0].length).toBe(1) // One argument passed to next
    })
  })

  describe('Github username validator', () => {
    it.each([
      'fakeName', 
      'fake-name', 
      'fake-name-123'
    ])('Should allow valid username: %s', (username) => {
      const validateQueryParams = getValidateQueryParams(['who'])
      mockRequest.query = { who: username }
    
      validateQueryParams(mockRequest, mockResponse, mockNext)

      expect(mockNext).toHaveBeenCalled()
      expect(mockNext.mock.calls[0].length).toBe(0) // No arguments passed to next
    })

    it.each([
      'fakeName%&$', 
      'fake--name', 
      '-fakename', 
      'fakename-', 
      'fakenameFakenameFakenameFakenameFakename', // 40 characters
    ])('Should deny invalid username: %s', (username) => {
      const validateQueryParams = getValidateQueryParams(['who'])
      mockRequest.query = { who: username }
    
      validateQueryParams(mockRequest, mockResponse, mockNext)

      expect(mockNext).toHaveBeenCalled()
      expect(mockNext.mock.calls[0].length).toBe(1) // One argument passed to next
    })
  })
})