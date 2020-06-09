import Scripts from '../../../../scripts';

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: 'typescript',
});

describe.each(['prod', 'dev'] as const)(
  'transpiles typescript for configured projects (externalUnprocessedModules) [%s]',
  (mode) => {
    it('integration', async () => {
      await scripts[mode](async () => {
        await page.goto(scripts.serverUrl);
        const result = await page.$eval(
          '#transpile-configured-external-typescript',
          (elm) => elm.textContent,
        );

        expect(result).toBe('External untranspiled dependency.');
      });
    });
  },
);
