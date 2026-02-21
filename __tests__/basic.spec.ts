import fs from 'fs';

describe('HW05 – alapvető ellenőrzések', () => {
  test('prisma/schema.prisma exists', () => {
    expect(fs.existsSync('./prisma/schema.prisma')).toBe(true);
  });

  test('apps/api/src/index.ts exists', () => {
    expect(fs.existsSync('./apps/api/src/index.ts')).toBe(true);
  });

  test('docker-compose.yml exists', () => {
    expect(fs.existsSync('./docker-compose.yml')).toBe(true);
  });

  test('schema.prisma contains Transaction model', () => {
    const schema = fs.readFileSync('./prisma/schema.prisma', 'utf8');
    expect(schema.includes('model Transaction')).toBe(true);
  });
});
