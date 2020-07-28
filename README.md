# check-permission
**Cross-Repository Permission Check**

The action checks if given github token has permission to other repos.

Add following to your workflow
```yaml
steps:
  - name: "check permission to repo"
    uses: "sixleaveakkm/check-permission@0.5"
    with:
      permission: "write"
      token: ${{ secrets.CI_TOKEN }}
      repos: "repo_org/repo_name,repo_org/another_name"
```

If you want to automatically create repository string, you may try something like this
```yaml
steps:
    - name: export repos
      id: repo_list
      run: |
        echo ::set-output name=REPO_LIST::${code print comma_separated_repo_list}
    
    - name: check permission
      uses: sixleaveakkm/check-permission@0.5
      with:
        permission: "admin"
        token: ${{ secrets.CI_TOKEN }}
        repos: ${{ steps.repo_list.outputs.REPO_LIST }}

```

## Parameters
### permission  
possible permission are `admin`, `write`, `read`, and `none`  [doc](https://developer.github.com/v3/repos/collaborators/#get-repository-permissions-for-a-user)

### token
github token you provided, **STRONGLY RECOMMEND USE SECRET**

### repos
Comma separated repositories list, each is constructed by 
repository organization or user name with '/' following with repository name  


## How to build
For anyone wants to contribute:

This action uses typescript and @zeit/ncc to build code.  
Modify `index.ts` file and run `yarn deploy`.
