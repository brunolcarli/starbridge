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

        // Add some text to the new cells:
        player_id.innerHTML = data['playerId'];
        name.innerHTML = data['name'];
        status.innerHTML = data['status'];
        rank.innerHTML = total_score['rank'];
        score.innerHTML = total_score['score'];
        planets.innerHTML = data['planets']['planet'].length;
        ally.innerHTML = player_ally;
    });
}

function reset_canvas(chart_id, div_id){
    // Resets the canvas state
    document.getElementById(chart_id).remove();
    let canvas = document.createElement(
        'canvas'
    );
    canvas.setAttribute('id', chart_id);
    canvas.setAttribute('width', '400');
    canvas.setAttribute('height', '400');
    document.getElementById(div_id).appendChild(canvas);

    return document.getElementById(chart_id).getContext('2d');
}

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


function plot_total_activity(player_name){
    return resolve_player_total_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Total activity',
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


function plot_economy_activity(player_name){
    return resolve_player_economy_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Economy activity',
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


function plot_research_activity(player_name){
    return resolve_player_research_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Research activity',
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


function plot_military_activity(player_name){
    return resolve_player_military_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military activity',
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


function plot_ships_activity(player_name){
    return resolve_player_ships_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Ships activity',
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


function plot_military_built_activity(player_name){
    return resolve_player_military_built_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military built activity',
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


function plot_military_destroyed_activity(player_name){
    return resolve_player_military_destroyed_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military destroyed activity',
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


function plot_military_lost_activity(player_name){
    return resolve_player_military_lost_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Military lost activity',
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


function plot_honor_activity(player_name){
    return resolve_player_honor_activity(player_name).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const score = dataset['score'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Honor activity',
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
    else if (value == 'TOTAL_ACTIVITY'){
        plot_total_activity(player_name);
    }
    else if (value == 'ECONOMY_ACTIVITY'){
        plot_economy_activity(player_name);
    }
    else if (value == 'RESEARCH_ACTIVITY'){
        plot_research_activity(player_name);
    }
    else if (value == 'MILITARY_ACTIVITY'){
        plot_military_activity(player_name);
    }
    else if (value == 'SHIP_ACTIVITY'){
        plot_ships_activity(player_name);
    }
    else if (value == 'MILITARY_BUILT_ACTIVITY'){
        plot_military_built_activity(player_name);
    }
    else if (value == 'MILITARY_DESTROYED_ACTIVITY'){
        plot_military_destroyed_activity(player_name);
    }
    else if (value == 'MILITARY_LOST_ACTIVITY'){
        plot_military_lost_activity(player_name);
    }
    else if (value == 'HONOR_ACTIVITY'){
        plot_honor_activity(player_name);
    }
}


function plot_player_statistics(){
    var player_name = document.getElementById('PlayerFilterInput').value;
    var chart_type = document.getElementById('chart_selection').value;
    draw_player_resume_table(player_name);
    update_dynamic_chart(player_name, chart_type);
}
