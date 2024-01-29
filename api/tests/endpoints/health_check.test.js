const request = require("supertest")
const server = require("../../index")

describe("Health check endpoint", () => {
  afterAll(() => {
    server.close()
  })

  it("Should return the members of the org", async () => {
    const res = await request(server).get("/health_check")

    expect(res.statusCode).toEqual(200)
  })
})