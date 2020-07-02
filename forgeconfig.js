module.exports = {
    packagerConfig: {},
    makers: [
        {
            "name": "@electron-forge/maker-squirrel",
            "config": {
                "name": "CurseForgeStatsViewer",
                "loadingGif": "installer.gif",
                "setupExe": "CFStatsInstaller.exe"
            }
        },
        {
            "name": "@electron-forge/maker-zip",
            "platforms": [
                "darwin"
            ]
        },
        {
            "name": "@electron-forge/maker-deb",
            "config": {}
        },
        {
            "name": "@electron-forge/maker-rpm",
            "config": {}
        }
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                  owner: 'Geek202',
                  name: 'CurseStatsView'
                },
                prerelease: false
              }
        }
    ]
}
