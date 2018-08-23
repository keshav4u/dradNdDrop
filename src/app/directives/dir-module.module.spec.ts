import { DirModuleModule } from './dir-module.module';

describe('DirModuleModule', () => {
  let dirModuleModule: DirModuleModule;

  beforeEach(() => {
    dirModuleModule = new DirModuleModule();
  });

  it('should create an instance', () => {
    expect(dirModuleModule).toBeTruthy();
  });
});
