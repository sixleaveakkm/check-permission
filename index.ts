import * as core from '@actions/core'
import * as github from '@actions/github'

const perms = ["none", "read", "write", "admin"];

(async () => {
  try {
    const repos = core.getInput('repos').split(',')
    const token = core.getInput('token');
    const targetPermission = core.getInput('permission')

    const octokit = github.getOctokit(token)

    let response
    try {
      response = await octokit.users.getAuthenticated()
    } catch (e) {
      core.setFailed(`authentication failed with provided token`)
      return
    }
    const username = response.data.login

    for ( const rep of repos ) {
      const tuple = rep.split("/")
      const owner = tuple[0]
      const repo = tuple[1]
      let actualPerm
      try {
        const res = await octokit.repos.getCollaboratorPermissionLevel({
          owner: owner,
          repo: repo,
          username: username
        })
        actualPerm = res.data.permission
      } catch (e) {
        actualPerm = 'none'
      }
      core.debug(`permission for ${rep} is ${actualPerm}`)
      if ( perms.indexOf(actualPerm) < perms.indexOf(targetPermission) ) {
        core.setFailed(`permission for ${rep} not fit required`)
        return
      }
    }
  } catch (e) {
    core.setFailed(`failed with error, ${JSON.stringify(e)}`)
    return
  }
})()
