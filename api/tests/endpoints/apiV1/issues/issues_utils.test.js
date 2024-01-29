const {
  calculateScore,
} = require('../../../../endpoints/apiV1/issues/issues_utils')


const mockGetLaboralsDays = jest.fn()
jest.mock('../../../../utils/utils', () => ({
    PRIORITY_WEIGHTS: {
      'Low Priority': 10,
      'High Priority': 50,
    },
    DEFAULT_WEIGHT: 20,
    getLaboralsDays: (...args) => mockGetLaboralsDays(...args),
  })
)

describe('Issue utils', () => {
  describe('calculateScore function', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it.each([
      { 
        issue: {
          labels: [
            { name: 'Low Priority' },
          ],
          created_at: new Date("01/01/2020"),
        },
        laboralsDays: 10,
        expected: 100
      },
      { 
        issue: {
          labels: [
            { name: 'High Priority' },
          ],
          created_at: new Date("01/01/2020"),
        },
        laboralsDays: 5,
        expected: 250
      },
    ])('Should return score', ({issue, laboralsDays, expected}) => {
      mockGetLaboralsDays.mockReturnValue(laboralsDays)

      expect(calculateScore(issue)).toEqual(expected)
      expect(mockGetLaboralsDays).toHaveBeenCalled()
    })

    it('Should use default label if there is not priority label', () => {
      const laboralsDays = 7
      const expected = 140
      const issue = {
        labels: [],
        created_at: new Date("01/01/2020"),
      }

      mockGetLaboralsDays.mockReturnValue(laboralsDays)

      expect(calculateScore(issue)).toEqual(expected)
      expect(mockGetLaboralsDays).toHaveBeenCalled()
    })

    it('Should use the first label if there are many', () => {
      const laboralsDays = 7
      const expected = 70
      const issue = {
        labels: [
          { name: 'Low Priority' },
          { name: 'High Priority' }
        ],
        created_at: new Date("01/01/2020"),
      }

      mockGetLaboralsDays.mockReturnValue(laboralsDays)

      expect(calculateScore(issue)).toEqual(expected)
      expect(mockGetLaboralsDays).toHaveBeenCalled()
    })
  })
})
