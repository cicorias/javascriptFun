

## Definately Typed

### Install the tsd cli
npm install -g tsd


### initialize the tsd references
tsd init

this will create the 'typings' and a tsd.json file


### Edit the tsd.json file


### Install tsd for the packages that are there

```
tsd install packageName --save 

```


### Find TSD 

## Definately Typed References:
https://github.com/DefinitelyTyped/tsd

packages:
http://definitelytyped.org/tsd/ 


## Recomendations

put your source in a /app folder

update the tsd.json to put the 'typings' under /app - eg. /app/typings

## Task generation - this will build and auto-compile with changes.
(of course babel is needed so `npm install babel` before)

### Tasks definiation file `tasks.json`

Place this file for VS Code in ./.vscode path of your project (formerly it was ./.settings but changed in 0.8.0 of VS Code).

```
{
    "version": "0.1.0",
    "command": "${workspaceRoot}/node_modules/.bin/babel",
    "isShellCommand": true,
    "tasks": [
        {
            "args": ["app", "--out-dir", "lib", "-w", "--source-maps"],
            "taskName": "watch",
            "suppressTaskName": true,
            "isBuildCommand": true,
            "isWatching": true
        }
    ]
}
```

### Launch settings
The settings for the launch should be the babel transpiled version in ./lib/index.js in this example.

also, since 'maps' are generated, you can enable the setting `"sourceMaps": true` along with the 



## Definately Typed
http://definitelytyped.org/
