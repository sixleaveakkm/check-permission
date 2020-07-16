import * as core from '@actions/core'
import * as github from '@actions/github'

const perms = ["none", "read", "write", "admin"];

(async () => {
  const repos = core.getInput('repos').split(',')
  const token = core.getInput('token');
  const targetPermission = core.getInput('permission')

  const octokit = github.getOctokit(token)
  const response = await octokit.users.getAuthenticated()
  const username = response.data.login

  for ( const rep of repos ) {
    try {
      const tuple = rep.split("/")
      const owner = tuple[0]
      const repo = tuple[1]
      const res = await octokit.repos.getCollaboratorPermissionLevel({
        owner: owner,
        repo: repo,
        username: username
      })
      const actualPerm = res.data.permission
      core.debug(`permission for ${rep} is ${actualPerm}`)
      if ( perms.indexOf(actualPerm) < perms.indexOf(targetPermission) ) {
        core.setFailed(`permission for ${rep} not fit required`)
        return
      }
    } catch (e) {
      core.setFailed(`permission for ${rep} meets an error, ${e}`)
    }
  }
})()
