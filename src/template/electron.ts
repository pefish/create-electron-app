import InterfaceTemplate from "./interface_template";
import ShellHelper from '@pefish/js-helper-shell'

export default class Electron implements InterfaceTemplate {
  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b main --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cd client && cat package.json | sed "s/template/${projectName}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
    shellHelper.execSync(`cd client/public && cat index.html | sed "s/template/${projectName}/g" > temp.html && rm -rf index.html && mv temp.html index.html`)
    shellHelper.execSync(`cat package.json | sed "s/template/${projectName}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
    shellHelper.execSync(`cd client && yarn`)
    shellHelper.execSync(`yarn`)
    shellHelper.execSync(`cp config/sample.yaml config/prod.yaml`)
    shellHelper.execSync(`cp config/sample.yaml config/local.yaml`)
  }

  getTemplateRepoUrl(): string {
    return `https://github.com/pefish/create-electron-app-template.git`
  }
}
