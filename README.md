# check-permission

```yaml
steps:
  - name: "check permission to repo"
    uses: "sixleaveakkm/check-permission"
    with:
      permission: "write"
      token: ${{ secrets.CI_TOKEN }}
      repos: "repo_org/repo_name,repo_org/another_name"
```
