export class TestDataGenerator {
    static generateUniqueUsername(prefix = 'testuser', length = 6): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const randomPart = Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        return `${prefix}${randomPart}`.toLowerCase();
    }
  }