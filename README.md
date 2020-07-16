# check-permission

```yaml
steps:
  - name: "check permission to repo"
    uses: "sixleaveakkm/check-permission"
    with:
      permission: "write"
      token: ${{ secrets.CI_TOKEN }}
      repos: ""
```

https://developer.github.com/v3/repos/collaborators/#get-repository-permissions-for-a-user
