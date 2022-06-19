import { randomUUID } from 'crypto';

class UUIDGenerator {
  public generate(): string {
    const uuid = randomUUID();
    return uuid;
  }
}

export default new UUIDGenerator;