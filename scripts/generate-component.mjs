import fs from 'node:fs/promises';
import path from 'node:path';

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

const componentPath = path.join('src', 'components', 'features', `${componentName}.tsx`);
const testPath = path.join('tests', 'unit', 'components', `${componentName}.test.tsx`);

const componentContent = `
import { type FC } from 'react';

interface ${componentName}Props {}

export const ${componentName}: FC<${componentName}Props> = ({}) => {
  return <div>${componentName}</div>;
};
`;

const testContent = `
import { render, screen } from '@testing-library/react';
import { ${componentName} } from '@/components/features/${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });
});
`;

await fs.mkdir(path.dirname(componentPath), { recursive: true });
await fs.writeFile(componentPath, componentContent);

await fs.mkdir(path.dirname(testPath), { recursive: true });
await fs.writeFile(testPath, testContent);

console.log(`Component '${componentName}' created at ${componentPath}`);
console.log(`Test file for '${componentName}' created at ${testPath}`);

