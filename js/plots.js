//////////////////////////////////////
//
//          TABLE RESUME
//
//////////////////////////////////////

function reset_player_resume_table(){
    var table = document.getElementById("player_resume_table");
    table.innerHTML = '';
    table.align = 'center';
    table.className = 'table table-dark';

    var header = table.insertRow(0);

    var player_id = header.insertCell(0);
    var name = header.insertCell(1);
    var status = header.insertCell(2);
    var rank = header.insertCell(3);
    var score = header.insertCell(4);
    var planets = header.insertCell(5);
    var ally = header.insertCell(6);

    player_id.innerHTML = 'ID';
    name.innerHTML = 'Nome';
    status.innerHTML = 'Status';
    rank.innerHTML = 'Rank';
    score.innerHTML = 'Pontos';
    planets.innerHTML = 'Planetas';
    ally.innerHTML = 'Aliança';
}


function draw_player_resume_table(player_name){
    reset_player_resume_table();
    return resolve_player_resume(player_name).then(data => {
        var table = document.getElementById("player_resume_table");
        var row = table.insertRow(table.rows.length);

        var player_id = row.insertCell(0);
        var name = row.insertCell(1);
        var status = row.insertCell(2);
        var rank = row.insertCell(3);
        var score = row.insertCell(4);
        var planets = row.insertCell(5);
        var ally = row.insertCell(6);

        // get most recent total score
        var total_score = data['scores'][data['scores'].length-1]['total'];

        // get player alliance data if exists
        var player_ally = data['alliance'];
        if (player_ally == undefined){
            player_ally = 'No Ally';
        } else {
            player_ally = `[${player_ally['tag']}] ${player_ally['name']}`;
        }

        // parse player status
        var player_status = data['status'];
        if (player_status == 'nan'){
            player_status = 'Active';
        }

        // Add some text to the new cells:
        player_id.innerHTML = data['playerId'];
        name.innerHTML = data['name'];
        status.innerHTML = player_status;
        rank.innerHTML = total_score['rank'];
        score.innerHTML = total_score['score'];
        planets.innerHTML = data['planets']['planet'].length;
        ally.innerHTML = player_ally;
    });
}


/////////////////////////////////////////
//
//           CANVAS RESET
//
/////////////////////////////////////////

function reset_canvas(chart_id, div_id){
    // Resets the canvas state
    document.getElementById(chart_id).remove();
    let canvas = document.createElement(
        'canvas'
    );
    canvas.setAttribute('id', chart_id);
    canvas.setAttribute('width', '680');
    canvas.setAttribute('height', '420');
    document.getElementById(div_id).appendChild(canvas);

    return document.getElementById(chart_id).getContext('2d');
}


/////////////////////////////////////////
//
//           SCORE PLOTS
//
/////////////////////////////////////////

function plot_total_score(player_name){
    return resolve_player_total_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Total Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


function plot_economy_score(player_name){
    return resolve_player_economy_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Economy Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


function plot_research_score(player_name){
    return resolve_player_research_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Research Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


function plot_military_score(player_name){
    return resolve_player_military_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


function plot_ship_score(player_name){
    return resolve_player_military_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const ships = dataset['ships'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Ship count',
                    data: ships,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


function plot_military_built_score(player_name){
    return resolve_player_military_built_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military Built Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


function plot_military_destroyed_score(player_name){
    return resolve_player_military_destroyed_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military Destroyed Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


function plot_military_lost_score(player_name){
    return resolve_player_military_lost_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military Lost Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
        return chart;
    })
}


function plot_honor_score(player_name){
    return resolve_player_honor_score(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Honor Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


///////////////////////////////////////////////
//
//           ACTIVITY PLOTS
//
///////////////////////////////////////////////

function plot_average_weekday_progress(player_name){
    return resolve_average_weekday_progress(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['dates'],
                datasets: [{
                label: 'Média de progresso por dia da semana',
                data: dataset['score'],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_average_hour_progress(player_name){
    return resolve_average_hour_progress(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['dates'],
                datasets: [{
                label: 'Média de progresso por hora do dia (Período de 1H)',
                data: dataset['score'],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_average_halfhour_progress(player_name){
    return resolve_average_halfhour_progress(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['dates'],
                datasets: [{
                label: 'Média de progresso por hora do dia (Período 30min)',
                data: dataset['score'],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_activity(player_name){
    return resolve_player_activities(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const mixedChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: dataset['dates'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Total (bar)',
                        data: dataset['total'],
                        fill: true,
                        barPercentage: 0.8,
                        barThickness: 2,
                        maxBarThickness: 3,
                        minBarLength: 2,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgb(54, 162, 235)',
                        ],
                        borderWidth: 1
                    },
                    {
                        type: 'bar',
                        label: 'Economy (bar)',
                        data: dataset['economy'],
                        fill: true,
                        barPercentage: 0.8,
                        barThickness: 2,
                        maxBarThickness: 3,
                        minBarLength: 2,
                        backgroundColor: [
                            'rgba(255, 199, 162, 0.2)',
                        ],
                        borderColor: [
                            'rgb(154, 162, 235)',
                        ],
                        borderWidth: 1
                    },
                    {
                        type: 'bar',
                        label: 'Research (bar)',
                        data: dataset['research'],
                        fill: true,
                        barPercentage: 0.8,
                        barThickness: 2,
                        maxBarThickness: 3,
                        minBarLength: 2,
                        backgroundColor: [
                            'rgba(255, 159, 14, 0.2)',
                        ],
                        borderColor: [
                            'rgb(54, 62, 235)',
                        ],
                        borderWidth: 1
                    },
                    {
                        type: 'bar',
                        label: 'Military (bar)',
                        data: dataset['military'],
                        fill: true,
                        barPercentage: 0.8,
                        barThickness: 2,
                        maxBarThickness: 3,
                        minBarLength: 2,
                        backgroundColor: [
                            'rgba(55, 15, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgb(201, 203, 7)'
                        ],
                        borderWidth: 1
                    },
                    {
                        type: 'line',
                        label: 'Economy activity',
                        data: dataset['economy'],
                        fill: false,
                        borderColor: 'rgb(75, 52, 99)',
                        tension: 0.1
                    },
                    {
                        type: 'line',
                        label: 'Research activity',
                        data: dataset['research'],
                        fill: false,
                        borderColor: 'rgb(200, 52, 129)',
                        tension: 0.1
                    },
                    {
                        type: 'line',
                        label: 'Military activity',
                        data: dataset['military'],
                        fill: false,
                        borderColor: 'rgb(57, 25, 99)',
                        tension: 0.1
                    },
                    {
                        label: 'Fleet count activity',
                        data: dataset['ships'],
                        fill: false,
                        borderColor: 'rgb(65, 252, 190)',
                        tension: 0.1
                    },
                    {
                        type: 'line',
                        label: 'Military built activity',
                        data: dataset['mil_built'],
                        fill: false,
                        borderColor: 'rgb(255, 52, 200)',
                        tension: 0.1
                    },
                    {
                        type: 'line',
                        label: 'Military destroyed activity',
                        data: dataset['mil_dest'],
                        fill: false,
                        borderColor: 'rgb(100, 52, 199)',
                        tension: 0.1
                    },
                    {
                        type: 'line',
                        label: 'Military Lost activity',
                        data: dataset['mil_lost'],
                        fill: false,
                        borderColor: 'rgb(75, 152, 199)',
                        tension: 0.1
                    },
                    {
                        type: 'line',
                        label: 'Honor activity',
                        data: dataset['honor'],
                        fill: false,
                        borderColor: 'rgb(175, 152, 199)',
                        tension: 0.1
                    },
                    {
                        type: 'line',
                        label: 'Total activity',
                        data: dataset['total'],
                        fill: false,
                        borderColor: 'rgb(175, 92, 99)',
                        tension: 0.1
                    },
                ]
            },
            options: {
                responsive: true
            }
        });
        return mixedChart;
    })
}


//////////////////////////////////////////////
//
//         Machine Learning Predictions
//
//////////////////////////////////////////////


function plot_score_prediction(player_name){
    return resolve_score_prediction(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let predicted = dataset['predicted'];
        let future_dates = dataset['future_dates'];
        let prev_scores = dataset['prev_scores'];
        let prev_dates = dataset['prev_dates'];

        let filler = new Array(prev_scores.length-1).fill(null);
        predicted = filler.concat(predicted);
        let date_labels = prev_dates.concat(future_dates);

        const data = {
            labels: date_labels,
            datasets: [
                {
                    label: 'Pontuação atual',
                    data: prev_scores,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                {
                    label: 'Pontuação Prevista',
                    data: predicted,
                    fill: false,
                    borderColor: 'rgb(175, 192, 12)',
                    tension: 0.1
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    })
}


//////////////////////////////////////////////
//
//           Dynamic Chart handler
//
//////////////////////////////////////////////


function update_dynamic_chart(player_name, value){
    if (value == 'TOTAL_SCORE'){
        plot_total_score(player_name);
    }
    else if (value == 'ECONOMY_SCORE'){
        plot_economy_score(player_name);
    }
    else if (value == 'RESEARCH_SCORE'){
        plot_research_score(player_name);
    }
    else if (value == 'MILITARY_SCORE'){
        plot_military_score(player_name);
    }
    else if (value == 'SHIP_COUNT'){
        plot_ship_score(player_name);
    }
    else if (value == 'MILITARY_BUILT_SCORE'){
        plot_military_built_score(player_name);
    }
    else if (value == 'MILITARY_DESTROYED_SCORE'){
        plot_military_destroyed_score(player_name);
    }
    else if (value == 'MILITARY_LOST_SCORE'){
        plot_military_lost_score(player_name);
    }
    else if (value == 'HONOR_SCORE'){
        plot_honor_score(player_name);
    }
    else if (value == 'PLAYER_ACTIVITY'){
        plot_activity(player_name);
    }
    else if (value == 'WEEKDAY_ACTIVITY'){
        plot_average_weekday_progress(player_name);
    }
    else if (value == 'HOUR_ACTIVITY'){
        plot_average_hour_progress(player_name);
    }
    else if (value == 'HALFHOUR_ACTIVITY'){
        plot_average_halfhour_progress(player_name);
    }
    else if (value == 'SCORE_PREDICTION'){
        plot_score_prediction(player_name);
    }
}


function plot_player_statistics(){
    var player_name = document.getElementById('PlayerFilterInput').value;
    var chart_type = document.getElementById('chart_selection').value;
    draw_player_resume_table(player_name);
    update_dynamic_chart(player_name, chart_type);
}
