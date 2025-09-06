import fs from 'node:fs/promises';
import path from 'node:path';

const resource = process.argv[2];

if (!resource) {
  console.error('Please provide a resource name.');
  process.exit(1);
}

const directoryPath = path.join('app', 'api', 'v1', resource);
const filePath = path.join(directoryPath, 'route.ts');

const content = `
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from ${resource}' });
}
`;

await fs.mkdir(directoryPath, { recursive: true });
await fs.writeFile(filePath, content);

console.log(`API route for '${resource}' created at ${filePath}`);

