module.exports = {
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn()
  },
  model: jest.fn(),
  Schema: class Schema {
    static Types = {
      ObjectId: ''
    }

    set() {
      return jest.fn()
    }
  }
}
