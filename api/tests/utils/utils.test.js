const { getDays, getLaboralsDays } = require('../../utils/utils')

describe('Utils', () => {
  describe('getDays function', () => {
    it.each([
      { 
        from: new Date("01/01/2020"),
        to: new Date("01/08/2020"), 
        expected: 7
      },
      { 
        from: new Date("01/01/2020"),
        to: new Date("02/01/2020"), 
        expected: 31
      },
    ])('from $from to $to should be $expected days', ({from, to, expected}) => {
      expect(getDays(from, to)).toEqual(expected)
    })
  })

  describe('getLaboralsDays function', () => {
    it.each([
      { 
        from: new Date("01/01/2020"),
        to: new Date("01/08/2020"), 
        expected: 5
      },
      { 
        from: new Date("01/01/2020"),
        to: new Date("02/01/2020"), 
        expected: 23
      },
    ])('from $from to $to should be $expected days', ({from, to, expected}) => {
      expect(getLaboralsDays(from, to)).toEqual(expected)
    })
  })
})