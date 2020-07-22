# check-permission
**Cross-Repository Permission Check**

The action checks if given github token has permission to other repos.
 
```yaml
steps:
  - name: "check permission to repo"
    uses: "sixleaveakkm/check-permission@0.5"
    with:
      permission: "write"
      token: ${{ secrets.CI_TOKEN }}
      repos: "repo_org/repo_name,repo_org/another_name"
```

### Parameters
#### permission  
possible permission are `admin`, `write`, `read`, and `none`  
[1](https://developer.github.com/v3/repos/collaborators/#get-repository-permissions-for-a-user)

#### token
github token you provided, **STRONGLY RECOMMEND USE SECRET**

#### repos
Comma separated repositories list, each is constructed by 
repository organization or user name with '/' following with repository name  
