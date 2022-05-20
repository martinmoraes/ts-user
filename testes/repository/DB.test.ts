import DB from '../../src/repositories/DB';

describe('DB', () => {
  it('should connect da DB', async () => {
    const db = new DB();
    const resulted = await db.connectToDatabase('users');
    expect(resulted).toEqual(expect.any(Object));
    db.disconnectDB();
  });
});
