const request = require("supertest")
const server = require("../../index")

require()

const mockGet = jest.fn()
const mockStore = jest.fn()
jest.mock('../../utils/cache_manager', () => ({
  get: (...args) => mockGet(...args),
  store: (...args) => mockStore(...args)
}))

const mockCalculateScore = jest.fn()
jest.mock('../../endpoints/apiV1/issues/issues_utils', () => ({
  calculateScore: (...args) => mockCalculateScore(...args)
}))

describe("Github webhook endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    server.close()
  })

  describe("Issues event", () => {
    it("Should handle 'opened' action", async () => {
      const fakeScore = 20
      mockCalculateScore.mockReturnValue(fakeScore)
      mockGet.mockResolvedValue([
        { title: "issue1", number: 1 },
        { title: "issue2", number: 2 },
      ])
      mockStore.mockResolvedValue()
      const fakeIssue = {
        title: "issue3",
        number: 3,
        created_at: "2020-01-01T00:00:00Z",
        user: { login: "user1" },
        labels: [{ name: "label1" }],
        assignees: [{ login: "user1" }],
        html_url: "https://fake-url.com"
      }
      const expectedIssues = [
        { title: "issue1", number: 1 },
        { title: "issue2", number: 2 },
        {
          title: "issue3",
          number: 3,
          created_at: "2020-01-01T00:00:00Z",
          opener: "user1",
          labels: ["label1"],
          score: fakeScore,
          url: "https://fake-url.com",
          assignees: ["user1"],
        },
      ]

      const body = {
        action: "opened",
        issue: fakeIssue,
      }
  
      const res = await request(server)
        .post("/git-webhook")
        .send(body)
        .set("x-github-event", "issues")
  
      expect(res.statusCode).toEqual(202)
      expect(mockGet).toHaveBeenCalledWith("issues")
      expect(mockCalculateScore).toHaveBeenCalledWith(fakeIssue)
      expect(mockStore).toHaveBeenCalledWith("issues", expectedIssues)
    })

    it("Should handle 'closed' action", async () => {
      mockGet.mockResolvedValue([
        { title: "issue1", number: 1 },
        { title: "issue2", number: 2 },
      ])
      mockStore.mockResolvedValue()
      const fakeIssue = {
        title: "issue1",
        number: 1,
      }
      const expectedIssues = [
        { title: "issue2", number: 2 }
      ]

      const body = {
        action: "closed",
        issue: fakeIssue,
      }
  
      const res = await request(server)
        .post("/git-webhook")
        .send(body)
        .set("x-github-event", "issues")
  
      expect(res.statusCode).toEqual(202)
      expect(mockGet).toHaveBeenCalledWith("issues")
      expect(mockStore).toHaveBeenCalledWith("issues", expectedIssues)
    })
  })

  describe("Organization event", () => {
    it("Should handle 'member_added' action", async () => {
      mockGet.mockResolvedValue([ "user1", "user2" ])
      mockStore.mockResolvedValue()
      const fakeUsername = "user3"
      const expectedMembers = [ "user1", "user2", "user3" ]
      const body = {
        action: "member_added",
        membership: {
          user: {
            login: fakeUsername
          }
        }
      }
  
      const res = await request(server)
        .post("/git-webhook")
        .send(body)
        .set("x-github-event", "organization")
  
      expect(res.statusCode).toEqual(202)
      expect(mockGet).toHaveBeenCalledWith("members")
      expect(mockStore).toHaveBeenCalledWith("members", expectedMembers)
    })
  })
})