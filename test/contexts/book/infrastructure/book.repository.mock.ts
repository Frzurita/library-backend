export const bookRepositoryMock = () => ({
  create: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
  addAvailableCredit: jest.fn(),
  getAllByAvailableCredit: jest.fn(),
});
