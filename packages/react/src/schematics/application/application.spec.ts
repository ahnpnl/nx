import { Tree } from '@angular-devkit/schematics';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import * as stripJsonComments from 'strip-json-comments';
import { readJsonInTree, NxJson } from '@nrwl/workspace';
import { runSchematic } from '../../utils/testing';

describe('app', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = Tree.empty();
    appTree = createEmptyWorkspace(appTree);
  });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects['my-app'].root).toEqual('apps/my-app');
      expect(workspaceJson.projects['my-app-e2e'].root).toEqual(
        'apps/my-app-e2e'
      );
      expect(workspaceJson.defaultProject).toEqual('my-app');
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', tags: 'one,two' },
        appTree
      );
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson).toEqual({
        npmScope: 'proj',
        projects: {
          'my-app': {
            tags: ['one', 'two']
          },
          'my-app-e2e': {
            tags: []
          }
        }
      });
    });

    it('should generate files', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);
      expect(tree.exists('apps/my-app/src/main.tsx')).toBeTruthy();
      expect(tree.exists('apps/my-app/src/app/app.tsx')).toBeTruthy();
      expect(tree.exists('apps/my-app/src/app/app.spec.tsx')).toBeTruthy();
      expect(tree.exists('apps/my-app/src/app/app.css')).toBeTruthy();

      const tsconfig = readJsonInTree(tree, 'apps/my-app/tsconfig.json');
      expect(tsconfig.extends).toEqual('../../tsconfig.json');
      expect(tsconfig.compilerOptions.types).toContain('jest');

      const tsconfigApp = JSON.parse(
        stripJsonComments(tree.readContent('apps/my-app/tsconfig.app.json'))
      );
      expect(tsconfigApp.compilerOptions.outDir).toEqual('../../dist/out-tsc');
      expect(tsconfigApp.extends).toEqual('./tsconfig.json');

      const tslintJson = JSON.parse(
        stripJsonComments(tree.readContent('apps/my-app/tslint.json'))
      );
      expect(tslintJson.extends).toEqual('../../tslint.json');

      expect(tree.exists('apps/my-app-e2e/cypress.json')).toBeTruthy();
      const tsconfigE2E = JSON.parse(
        stripJsonComments(tree.readContent('apps/my-app-e2e/tsconfig.e2e.json'))
      );
      expect(tsconfigE2E.compilerOptions.outDir).toEqual('../../dist/out-tsc');
      expect(tsconfigE2E.extends).toEqual('./tsconfig.json');
    });
  });

  describe('nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir' },
        appTree
      );
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects['my-dir-my-app'].root).toEqual(
        'apps/my-dir/my-app'
      );
      expect(workspaceJson.projects['my-dir-my-app-e2e'].root).toEqual(
        'apps/my-dir/my-app-e2e'
      );
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir', tags: 'one,two' },
        appTree
      );
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson).toEqual({
        npmScope: 'proj',
        projects: {
          'my-dir-my-app': {
            tags: ['one', 'two']
          },
          'my-dir-my-app-e2e': {
            tags: []
          }
        }
      });
    });

    it('should generate files', async () => {
      const hasJsonValue = ({ path, expectedValue, lookupFn }) => {
        const content = tree.readContent(path);
        const config = JSON.parse(stripJsonComments(content));

        expect(lookupFn(config)).toEqual(expectedValue);
      };
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir' },
        appTree
      );

      // Make sure these exist
      [
        'apps/my-dir/my-app/src/main.tsx',
        'apps/my-dir/my-app/src/app/app.tsx',
        'apps/my-dir/my-app/src/app/app.spec.tsx',
        'apps/my-dir/my-app/src/app/app.css'
      ].forEach(path => {
        expect(tree.exists(path)).toBeTruthy();
      });

      // Make sure these have properties
      [
        {
          path: 'apps/my-dir/my-app/tsconfig.json',
          lookupFn: json => json.extends,
          expectedValue: '../../../tsconfig.json'
        },
        {
          path: 'apps/my-dir/my-app/tsconfig.app.json',
          lookupFn: json => json.compilerOptions.outDir,
          expectedValue: '../../../dist/out-tsc'
        },
        {
          path: 'apps/my-dir/my-app-e2e/tsconfig.json',
          lookupFn: json => json.extends,
          expectedValue: '../../../tsconfig.json'
        },
        {
          path: 'apps/my-dir/my-app-e2e/tsconfig.e2e.json',
          lookupFn: json => json.compilerOptions.outDir,
          expectedValue: '../../../dist/out-tsc'
        },
        {
          path: 'apps/my-dir/my-app/tslint.json',
          lookupFn: json => json.extends,
          expectedValue: '../../../tslint.json'
        }
      ].forEach(hasJsonValue);
    });
  });

  it('should create Nx specific template', async () => {
    const tree = await runSchematic(
      'app',
      { name: 'myApp', directory: 'myDir' },
      appTree
    );
    expect(tree.readContent('apps/my-dir/my-app/src/app/app.tsx')).toBeTruthy();
    expect(tree.readContent('apps/my-dir/my-app/src/app/app.tsx')).toContain(
      'Welcome to my-app'
    );
  });

  describe('--style scss', () => {
    it('should generate scss styles', async () => {
      const result = await runSchematic(
        'app',
        { name: 'myApp', style: 'scss' },
        appTree
      );
      expect(result.exists('apps/my-app/src/app/app.scss')).toEqual(true);
    });
  });

  it('should setup jest with tsx support', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app'
      },
      appTree
    );

    expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
      `moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],`
    );
  });

  it('should setup jest without serializers', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app'
      },
      appTree
    );

    expect(tree.readContent('apps/my-app/jest.config.js')).not.toContain(
      `'jest-preset-angular/AngularSnapshotSerializer.js',`
    );
  });

  it('should setup the nrwl web build builder', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app'
      },
      appTree
    );
    const workspaceJson = readJsonInTree(tree, 'workspace.json');
    const architectConfig = workspaceJson.projects['my-app'].architect;
    expect(architectConfig.build.builder).toEqual('@nrwl/web:build');
    expect(architectConfig.build.options).toEqual({
      differentialLoading: true,
      assets: ['apps/my-app/src/favicon.ico', 'apps/my-app/src/assets'],
      index: 'apps/my-app/src/index.html',
      main: 'apps/my-app/src/main.tsx',
      outputPath: 'dist/apps/my-app',
      polyfills: 'apps/my-app/src/polyfills.ts',
      scripts: [],
      styles: ['apps/my-app/src/styles.css'],
      tsConfig: 'apps/my-app/tsconfig.app.json'
    });
    expect(architectConfig.build.configurations.production).toEqual({
      optimization: true,
      budgets: [
        {
          maximumError: '5mb',
          maximumWarning: '2mb',
          type: 'initial'
        }
      ],
      extractCss: true,
      extractLicenses: true,
      fileReplacements: [
        {
          replace: 'apps/my-app/src/environments/environment.ts',
          with: 'apps/my-app/src/environments/environment.prod.ts'
        }
      ],
      namedChunks: false,
      outputHashing: 'all',
      sourceMap: false,
      vendorChunk: false
    });
  });

  it('should setup the nrwl web dev server builder', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app'
      },
      appTree
    );
    const workspaceJson = readJsonInTree(tree, 'workspace.json');
    const architectConfig = workspaceJson.projects['my-app'].architect;
    expect(architectConfig.serve.builder).toEqual('@nrwl/web:dev-server');
    expect(architectConfig.serve.options).toEqual({
      buildTarget: 'my-app:build'
    });
    expect(architectConfig.serve.configurations.production).toEqual({
      buildTarget: 'my-app:build:production'
    });
  });

  it('should setup the tslint builder', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app'
      },
      appTree
    );
    const workspaceJson = readJsonInTree(tree, 'workspace.json');
    expect(workspaceJson.projects['my-app'].architect.lint).toEqual({
      builder: '@nrwl/linter:lint',
      options: {
        linter: 'tslint',
        exclude: ['**/node_modules/**', '!apps/my-app/**'],
        tsConfig: [
          'apps/my-app/tsconfig.app.json',
          'apps/my-app/tsconfig.spec.json'
        ]
      }
    });
  });

  describe('--unit-test-runner none', () => {
    it('should not generate test configuration', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', unitTestRunner: 'none' },
        appTree
      );
      expect(tree.exists('apps/my-app/src/app/app.spec.tsx')).toBeFalsy();
      expect(tree.exists('apps/my-app/tsconfig.spec.json')).toBeFalsy();
      expect(tree.exists('apps/my-app/jest.config.js')).toBeFalsy();
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      expect(workspaceJson.projects['my-app'].architect.test).toBeUndefined();
      expect(
        workspaceJson.projects['my-app'].architect.lint.options.tsConfig
      ).toEqual(['apps/my-app/tsconfig.app.json']);
    });
  });

  describe('--e2e-test-runner none', () => {
    it('should not generate test configuration', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', e2eTestRunner: 'none' },
        appTree
      );
      expect(tree.exists('apps/my-app-e2e')).toBeFalsy();
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      expect(workspaceJson.projects['my-app-e2e']).toBeUndefined();
    });
  });

  describe('--pascalCaseFiles', () => {
    it('should use upper case app file', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', pascalCaseFiles: true },
        appTree
      );

      expect(tree.exists('apps/my-app/src/app/App.tsx')).toBeTruthy();
      expect(tree.exists('apps/my-app/src/app/App.spec.tsx')).toBeTruthy();
      expect(tree.exists('apps/my-app/src/app/App.css')).toBeTruthy();
    });
  });

  it('should generate functional components by default', async () => {
    const tree = await runSchematic('app', { name: 'myApp' }, appTree);

    const appContent = tree.read('apps/my-app/src/app/app.tsx').toString();

    expect(appContent).not.toMatch(/extends Component/);
  });

  describe('--class-component', () => {
    it('should generate class components', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', classComponent: true },
        appTree
      );

      const appContent = tree.read('apps/my-app/src/app/app.tsx').toString();

      expect(appContent).toMatch(/extends Component/);
    });
  });

  describe('--style styled-components', () => {
    it('should use styled-components as the styled API library', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', style: 'styled-components' },
        appTree
      );

      expect(
        tree.exists('apps/my-app/src/app/app.styled-components')
      ).toBeFalsy();
      expect(tree.exists('apps/my-app/src/app/app.tsx')).toBeTruthy();

      const content = tree.read('apps/my-app/src/app/app.tsx').toString();
      expect(content).toContain('styled-component');
      expect(content).toContain('<StyledApp>');
    });

    it('should add dependencies to package.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', style: 'styled-components' },
        appTree
      );

      const packageJSON = readJsonInTree(tree, 'package.json');
      expect(packageJSON.dependencies['styled-components']).toBeDefined();
    });
  });

  describe('--style @emotion/styled', () => {
    it('should use @emotion/styled as the styled API library', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', style: '@emotion/styled' },
        appTree
      );

      expect(
        tree.exists('apps/my-app/src/app/app.@emotion/styled')
      ).toBeFalsy();
      expect(tree.exists('apps/my-app/src/app/app.tsx')).toBeTruthy();

      const content = tree.read('apps/my-app/src/app/app.tsx').toString();
      expect(content).toContain('@emotion/styled');
      expect(content).toContain('<StyledApp>');
    });

    it('should exclude styles from workspace.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', style: '@emotion/styled' },
        appTree
      );

      const workspaceJson = readJsonInTree(tree, 'workspace.json');

      expect(
        workspaceJson.projects['my-app'].architect.build.options.styles
      ).toEqual([]);
    });

    it('should add dependencies to package.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', style: '@emotion/styled' },
        appTree
      );

      const packageJSON = readJsonInTree(tree, 'package.json');
      expect(packageJSON.dependencies['@emotion/core']).toBeDefined();
      expect(packageJSON.dependencies['@emotion/styled']).toBeDefined();
    });
  });

  describe('--routing', () => {
    it('should add routes to the App component', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', routing: true },
        appTree
      );

      const mainSource = tree.read('apps/my-app/src/main.tsx').toString();

      const componentSource = tree
        .read('apps/my-app/src/app/app.tsx')
        .toString();

      expect(mainSource).toContain('react-router-dom');
      expect(mainSource).toContain('<BrowserRouter>');
      expect(mainSource).toContain('</BrowserRouter>');
      expect(componentSource).toMatch(/<Route\s*path="\/"/);
      expect(componentSource).toMatch(/<Link\s*to="\/"/);
    });
  });

  describe('--babel true', () => {
    it('should adds custom webpack config', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', babel: true },
        appTree
      );

      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(
        workspaceJson.projects['my-app'].architect.build.options.webpackConfig
      ).toEqual('@nrwl/react/plugins/babel');
    });

    it('should add required polyfills for core-js and regenerator', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', babel: true },
        appTree
      );
      const packageJSON = readJsonInTree(tree, 'package.json');
      const polyfillsSource = tree
        .read('apps/my-app/src/polyfills.ts')
        .toString();

      expect(packageJSON.devDependencies['core-js']).toBeDefined();
      expect(packageJSON.devDependencies['regenerator-runtime']).toBeDefined();
      expect(polyfillsSource).toContain('regenerator');
      expect(polyfillsSource).toContain('core-js');
    });
  });
});
