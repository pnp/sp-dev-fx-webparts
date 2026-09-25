interface IPackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}

const packageJson = jest.requireActual('../package.json') as IPackageJson;
const packageLock = jest.requireActual('../package-lock.json') as {
  packages: { '': { dependencies: Record<string, string>; devDependencies: Record<string, string> } };
};

describe('SPFx toolchain invariants', () => {
  it('V1/B4 pins every direct dependency exactly', () => {
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    expect(Object.keys(dependencies).map(name => dependencies[name])).toEqual(
      expect.not.arrayContaining([expect.stringMatching(/^[~^*]|\b(latest|next)\b/)])
    );
  });

  it('V2/B3 uses the stable SPFx and React 17 line', () => {
    expect(packageJson.dependencies.react).toBe('17.0.1');
    expect(packageJson.dependencies['react-dom']).toBe('17.0.1');
    expect(packageJson.devDependencies['@types/react']).toMatch(/^17\./);
    expect(packageJson.devDependencies['@types/react-dom']).toMatch(/^17\./);

    Object.keys(packageJson.dependencies)
      .filter(name => name.indexOf('@microsoft/sp-') === 0)
      .forEach(name => expect(packageJson.dependencies[name]).toBe('1.23.2'));
  });

  it('V1/B4 keeps the manifest and lock root on the committed exact graph', () => {
    expect(packageLock.packages[''].dependencies).toEqual(packageJson.dependencies);
    expect(packageLock.packages[''].devDependencies).toEqual(packageJson.devDependencies);
    expect(packageJson.dependencies).toMatchObject({
      '@fluentui/react-components': '9.74.7',
      '@pnp/logging': '4.21.0',
      '@pnp/queryable': '4.21.0',
      '@pnp/sp': '4.21.0'
    });
    expect(packageJson.dependencies).not.toHaveProperty('@fluentui/react-icons');
    expect(packageJson.dependencies).not.toHaveProperty('immer');
  });

  it('I10 exposes bounded Heft lint, test, build, and package commands', () => {
    expect(packageJson.scripts.lint).toBe('heft run --only build');
    expect(packageJson.scripts.test).toContain('heft test');
    expect(packageJson.scripts.build).toBe('heft build --clean --production');
    expect(packageJson.scripts.package).toContain('heft package-solution --production');
  });
});
