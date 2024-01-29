const request = require("supertest")
const server = require("../../../../index")

const mockGetMembers = jest.fn()
jest.mock('../../../../utils/git', () => ({
  getMembers: (...args) => mockGetMembers(...args) 
}))

describe("Members endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  afterAll(() => {
    server.close()
  })

  // Workaround for clear mocks bug
  it("Should return status 500 if error", async () => {
    mockGetMembers.mockRejectedValueOnce('fake-error');

    const res = await request(server).get("/api/v1/members")

    expect(res.statusCode).toEqual(500)
    expect(res.body).toEqual({
      error: {
        status: 500,
        message: 'Internal Server Error',
      },
    })
  })

  it("Should return the members of the org", async () => {
    mockGetMembers.mockResolvedValueOnce([
      { login: "user1" },
      { login: "user2" },
    ])

    const res = await request(server).get("/api/v1/members")

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(["user1", "user2"])
  })
})