curl --request POST \
  --url http://localhost:3003/api/blogs \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"title": "first blog posting","author": "Mr. Gold","url": "http://reasonable.com","likes": 100}'
