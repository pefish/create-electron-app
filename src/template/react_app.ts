import InterfaceTemplate from "./interface_template";
import ShellHelper from '@pefish/js-helper-shell'

export default class ReactApp implements InterfaceTemplate {
  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat package.json | sed "s/template/${projectName}/g" > temp && rm -rf package.json && mv temp package.json`)
    shellHelper.execSync(`cd public && cat index.html | sed "s/template/${projectName}/g" > temp && rm -rf index.html && mv temp index.html`)
    shellHelper.execSync(`yarn`)
  }

  getTemplateRepoUrl(): string {
    return `https://github.com/pefish/create-react-app-template.git`
  }
}
