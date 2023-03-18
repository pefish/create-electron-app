import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class TsLib implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `https://github.com/pefish/create-typescript-lib-template.git`
  }

  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b main --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat package.json | sed "s/template_name/${projectName}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
    shellHelper.execSync(`cat package.json | sed "s/template_description/${desc}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
    shellHelper.execSync(`yarn`)
  }

}
