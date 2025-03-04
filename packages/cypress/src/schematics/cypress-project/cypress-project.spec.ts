import { Tree } from '@angular-devkit/schematics';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { runSchematic } from '../../utils/testing';
import { readJsonInTree } from '@nrwl/workspace';
import { join, normalize } from '@angular-devkit/core';

describe('schematic:cypress-project', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = Tree.empty();
    appTree = createEmptyWorkspace(appTree);
  });

  describe('Cypress Project', () => {
    it('should generate files', async () => {
      const tree = await runSchematic(
        'cypress-project',
        { name: 'my-app-e2e', project: 'my-app' },
        appTree
      );

      expect(tree.exists('apps/my-app-e2e/cypress.json')).toBeTruthy();
      expect(tree.exists('apps/my-app-e2e/tsconfig.e2e.json')).toBeTruthy();

      expect(
        tree.exists('apps/my-app-e2e/src/fixtures/example.json')
      ).toBeTruthy();
      expect(
        tree.exists('apps/my-app-e2e/src/integration/app.spec.ts')
      ).toBeTruthy();
      expect(tree.exists('apps/my-app-e2e/src/plugins/index.js')).toBeTruthy();
      expect(tree.exists('apps/my-app-e2e/src/support/app.po.ts')).toBeTruthy();
      expect(
        tree.exists('apps/my-app-e2e/src/support/commands.ts')
      ).toBeTruthy();
      expect(tree.exists('apps/my-app-e2e/src/support/index.ts')).toBeTruthy();
    });

    it('should add update `workspace.json` file', async () => {
      const tree = await runSchematic(
        'cypress-project',
        { name: 'my-app-e2e', project: 'my-app' },
        appTree
      );
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      const project = workspaceJson.projects['my-app-e2e'];

      expect(project.root).toEqual('apps/my-app-e2e');

      expect(project.architect.lint).toEqual({
        builder: '@nrwl/linter:lint',
        options: {
          linter: 'tslint',
          tsConfig: ['apps/my-app-e2e/tsconfig.e2e.json'],
          exclude: ['**/node_modules/**', '!apps/my-app-e2e/**']
        }
      });
      expect(project.architect.e2e).toEqual({
        builder: '@nrwl/cypress:cypress',
        options: {
          cypressConfig: 'apps/my-app-e2e/cypress.json',
          devServerTarget: 'my-app:serve',
          tsConfig: 'apps/my-app-e2e/tsconfig.e2e.json'
        },
        configurations: {
          production: {
            devServerTarget: 'my-app:serve:production'
          }
        }
      });
    });

    it('should set right path names in `cypress.json`', async () => {
      const tree = await runSchematic(
        'cypress-project',
        { name: 'my-app-e2e', project: 'my-app' },
        appTree
      );
      const cypressJson = readJsonInTree(tree, 'apps/my-app-e2e/cypress.json');

      expect(cypressJson).toEqual({
        fileServerFolder: '.',
        fixturesFolder: './src/fixtures',
        integrationFolder: './src/integration',
        pluginsFile: './src/plugins/index',
        supportFile: false,
        video: true,
        videosFolder: '../../dist/cypress/apps/my-app-e2e/videos',
        screenshotsFolder: '../../dist/cypress/apps/my-app-e2e/screenshots',
        chromeWebSecurity: false
      });
    });

    it('should set right path names in `tsconfig.e2e.json`', async () => {
      const tree = await runSchematic(
        'cypress-project',
        { name: 'my-app-e2e', project: 'my-app' },
        appTree
      );
      const tsconfigJson = readJsonInTree(
        tree,
        'apps/my-app-e2e/tsconfig.e2e.json'
      );

      expect(tsconfigJson.extends).toEqual('./tsconfig.json');
      expect(tsconfigJson.compilerOptions.outDir).toEqual('../../dist/out-tsc');
    });

    describe('nested', () => {
      it('should update workspace.json', async () => {
        const tree = await runSchematic(
          'cypress-project',
          { name: 'my-app-e2e', project: 'my-dir-my-app', directory: 'my-dir' },
          appTree
        );
        const projectConfig = readJsonInTree(tree, 'workspace.json').projects[
          'my-dir-my-app-e2e'
        ];

        expect(projectConfig).toBeDefined();
        expect(projectConfig.architect.lint).toEqual({
          builder: '@nrwl/linter:lint',
          options: {
            linter: 'tslint',
            tsConfig: ['apps/my-dir/my-app-e2e/tsconfig.e2e.json'],
            exclude: ['**/node_modules/**', '!apps/my-dir/my-app-e2e/**']
          }
        });

        expect(projectConfig.architect.e2e).toEqual({
          builder: '@nrwl/cypress:cypress',
          options: {
            cypressConfig: 'apps/my-dir/my-app-e2e/cypress.json',
            devServerTarget: 'my-dir-my-app:serve',
            tsConfig: 'apps/my-dir/my-app-e2e/tsconfig.e2e.json'
          },
          configurations: {
            production: {
              devServerTarget: 'my-dir-my-app:serve:production'
            }
          }
        });
      });

      it('should set right path names in `cypress.json`', async () => {
        const tree = await runSchematic(
          'cypress-project',
          { name: 'my-app-e2e', project: 'my-dir-my-app', directory: 'my-dir' },
          appTree
        );
        const cypressJson = readJsonInTree(
          tree,
          'apps/my-dir/my-app-e2e/cypress.json'
        );

        expect(cypressJson).toEqual({
          fileServerFolder: '.',
          fixturesFolder: './src/fixtures',
          integrationFolder: './src/integration',
          pluginsFile: './src/plugins/index',
          supportFile: false,
          video: true,
          videosFolder: '../../../dist/cypress/apps/my-dir/my-app-e2e/videos',
          screenshotsFolder:
            '../../../dist/cypress/apps/my-dir/my-app-e2e/screenshots',
          chromeWebSecurity: false
        });
      });

      it('should set right path names in `tsconfig.e2e.json`', async () => {
        const tree = await runSchematic(
          'cypress-project',
          { name: 'my-app-e2e', project: 'my-dir-my-app', directory: 'my-dir' },
          appTree
        );
        const tsconfigJson = readJsonInTree(
          tree,
          'apps/my-dir/my-app-e2e/tsconfig.e2e.json'
        );

        expect(tsconfigJson.compilerOptions.outDir).toEqual(
          '../../../dist/out-tsc'
        );
      });
    });
  });
});
