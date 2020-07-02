const Chart = require('chart.js');

var dlChart = document.getElementById('totalDlChart');
dlChart.style.display = "none";
var ctx = dlChart.getContext('2d');

var totalDlChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Total Downloads',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var dailyChart = document.getElementById("dailyDlChart");
dailyChart.style.display = "none";
ctx = dailyChart.getContext('2d');

var input = document.getElementById("fIn");

var dailyDlChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Daily Downloads',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointRadius: 1
        }, {
            label: 'Daily Unique Downloads',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            pointRadius: 1
        }, {
            label: 'Daily Twitch Downloads',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 1
        }, {
            label: 'Daily CurseForge Downloads',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            pointRadius: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const readFile = function(file, cb) {
    file.text().then(function(text) {
        var timestamps = [];
        var totalDownloads = [];
        var dailyDownloads = [];
        var uniqueDownloads = [];
        var twitchDownloads = [];
        var cfDownloads = [];

        var lines = text.split('\n');
        var skipped = false;
        
        for (ln in lines) {
            if (!skipped) {
                skipped = true;
                if (!(lines[ln] === "Date,Project ID,Name,Points,Historical Download,Daily Download,Daily Unique Download,Daily Twitch App Download,Daily Curse Forge Download")) {
                    dlChart.style.display = "none";
                    dailyChart.style.display = "none";
                    document.getElementById("id01").style.display = "block";
                    input.value = "";
                }
                continue;
            }
            var line = lines[ln].split(",");
            timestamps.push(line[0]);
            totalDownloads.push(parseInt(line[4], 10));
            dailyDownloads.push(parseInt(line[5], 10));
            uniqueDownloads.push(parseInt(line[6], 10));
            twitchDownloads.push(parseInt(line[7], 10));
            cfDownloads.push(parseInt(line[8], 10));
        }
        cb(timestamps, totalDownloads, dailyDownloads, uniqueDownloads, twitchDownloads, cfDownloads);
    });
}

function removeAllData(chart) {
    var len = chart.data.labels.length;
    for (let i = 0; i < len; i++) {
        chart.data.labels.pop();
    }
    chart.data.datasets.forEach((dataset) => {
        var len = dataset.data.length;
        for (let i = 0; i < len; i++) {
            dataset.data.pop();
        }
    });
    chart.update();
}

const onFileSelected = function() {
    if ('files' in input) {
        if (input.files.length === 0) {
            dlChart.style.display = "none";
            dailyChart.style.display = "none";
        } else {
            dlChart.style.display = "block";
            dailyChart.style.display = "block";
            readFile(input.files[0], function(timestamps, totalDownloads, dailyDownloads, uniqueDownloads, twitchDownloads, cfDownloads) {
                removeAllData(totalDlChart);
                removeAllData(dailyDlChart);
                timestamps.forEach((lbl) => {
                    totalDlChart.data.labels.push(lbl);
                    dailyDlChart.data.labels.push(lbl);
                });
                
                totalDownloads.forEach((val) => {
                    totalDlChart.data.datasets[0].data.push(val);
                });

                dailyDownloads.forEach((val) => {
                    dailyDlChart.data.datasets[0].data.push(val);
                });

                uniqueDownloads.forEach((val) => {
                    dailyDlChart.data.datasets[1].data.push(val);
                });

                twitchDownloads.forEach((val) => {
                    dailyDlChart.data.datasets[2].data.push(val);
                })
                
                cfDownloads.forEach((val) => {
                    dailyDlChart.data.datasets[3].data.push(val);
                })

                totalDlChart.update();
                dailyDlChart.update();
            });
        }
    }
}
