const shutdown = require('../../utils/shutdown')

const mockDisconnect = jest.fn()
jest.mock('@ngrok/ngrok', () => ({
  disconnect: (...args) => mockDisconnect(...args),
}))

describe('Shutdown', () => {
  it('Should close the server and the existing connections', () => {
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    const mockClose = jest.fn(async callback => await callback())
    const server = {
      close: mockClose,
    }

    shutdown(server)()

    expect(mockClose).toHaveBeenCalled()
    expect(mockDisconnect).toHaveBeenCalled()
  })
})
