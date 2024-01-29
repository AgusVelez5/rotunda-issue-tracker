const request = require("supertest")
const server = require("../../../../index")

const mockGetIssues = jest.fn()
jest.mock('../../../../utils/git', () => ({
  getIssues: (...args) => mockGetIssues(...args) 
}))

const mockCalculateScore = jest.fn()
jest.mock('../../../../endpoints/apiV1/issues/issues_utils', () => ({
  calculateScore: (...args) => mockCalculateScore(...args) 
}))

describe("Issues endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    server.close()
  })

  // Workaround for clear mocks bug
  it("Should return status 500 if error", async () => {
    mockGetIssues.mockRejectedValueOnce("fake error")

    const res = await request(server).get("/api/v1/issues")

    expect(res.statusCode).toEqual(500)
    expect(res.body).toEqual({
      error: {
        status: 500,
        message: 'Internal Server Error',
      },
    })
  })

  it("Should return issues", async () => {
    const fakeScores = [20, 25]
    const fakeIssues = [
      {
        title: "issue1",
        number: 1,
        created_at: "2020-01-01T00:00:00Z",
        user: { login: "user1" },
        labels: [{ name: "label1" }],
        assignees: [{ login: "user1" }],
        html_url: "https://fake-url.com"
      },
      {
        title: "issue2",
        number: 2,
        created_at: "2020-01-01T00:00:00Z",
        user: { login: "user2" },
        labels: [{ name: "label1" }],
        assignees: [{ login: "user2" }],
        html_url: "https://fake-url.com"
      },
    ]
    const expectedIssues = [
      {
        title: "issue2",
        number: 2,
        created_at: "2020-01-01T00:00:00Z",
        opener: "user2",
        labels: ["label1"],
        score: fakeScores[1],
        url: "https://fake-url.com",
        assignees: ["user2"],
      },
      {
        title: "issue1",
        number: 1,
        created_at: "2020-01-01T00:00:00Z",
        opener: "user1",
        labels: ["label1"],
        score: fakeScores[0],
        url: "https://fake-url.com",
        assignees: ["user1"],
      },
    ]

    mockCalculateScore.mockReturnValueOnce(fakeScores[0]).mockReturnValueOnce(fakeScores[1])
    mockGetIssues.mockResolvedValue(fakeIssues)

    const res = await request(server).get("/api/v1/issues")

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expectedIssues)
  })

  it("Should return the issues assigned to a user", async () => {
    const fakeWho = "user2"
    const fakeScores = [20, 25]
    const fakeIssues = [
      {
        title: "issue1",
        number: 1,
        created_at: "2020-01-01T00:00:00Z",
        user: { login: "user1" },
        labels: [{ name: "label1" }],
        assignees: [{ login: "user1" }],
        html_url: "https://fake-url.com"
      },
      {
        title: "issue2",
        number: 2,
        created_at: "2020-01-01T00:00:00Z",
        user: { login: "user2" },
        labels: [{ name: "label1" }],
        assignees: [{ login: "user2" }],
        html_url: "https://fake-url.com"
      },
    ]
    const expectedIssues = [
      {
        title: "issue2",
        number: 2,
        created_at: "2020-01-01T00:00:00Z",
        opener: "user2",
        labels: ["label1"],
        score: fakeScores[1],
        url: "https://fake-url.com",
        assignees: ["user2"],
      }
    ]

    mockCalculateScore.mockReturnValueOnce(fakeScores[0]).mockReturnValueOnce(fakeScores[1])
    mockGetIssues.mockResolvedValue(fakeIssues)

    const res = await request(server).get("/api/v1/issues").query({ who: fakeWho })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expectedIssues)
  })
})