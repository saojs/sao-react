const path = require('path')
const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new React app',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'description',
        message: 'How would you descripe the new project',
        default: `my ${superb()} React app`
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your email?',
        default: this.gitUser.email,
        store: true
      },
      {
        name: 'website',
        message: 'The URL of your website',
        default({ username }) {
          return `github.com/${username}`
        },
        store: true
      }
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        '_package.json': 'package.json'
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()

    const logCd = () => {
      if (this.outDir !== process.cwd()) {
        console.log(`${this.chalk.bold('cd')} ${this.chalk.cyan(path.relative(process.cwd(), this.outDir))}`)
      }
    }

    this.logger.tip(`To start dev server, run following commands:`)
    logCd()
    console.log(`${this.chalk.bold(this.npmClient)} ${this.chalk.cyan('run dev')}`)

    this.logger.tip(`To build for production, run following commands:`)
    logCd()
    console.log(`${this.chalk.bold(this.npmClient)} ${this.chalk.cyan('run build')}`)
  }
}
