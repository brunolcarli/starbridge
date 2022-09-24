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
    let chart_id = 'TotalScoreChart';

    return resolve_player_total_score(player_name).then(dataset => {
        const ctx = reset_canvas(chart_id, 'total_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    document.getElementById("total_score_chart_label").innerHTML = "<h5 id=\"total_score_chart_label\">Total</h5>";
    return chart;
    })
}


function plot_economy_score(player_name){
    return resolve_player_economy_score(player_name).then(dataset => {
        const ctx = reset_canvas('EconomyScoreChart', 'economy_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    document.getElementById("economy_score_chart_label").innerHTML = "<h5 id=\"economy_score_chart_label\">Economia</h5>";
    return chart;
    })
}


function plot_research_score(player_name){
    return resolve_player_research_score(player_name).then(dataset => {
        const ctx = reset_canvas('ResearchScoreChart', 'research_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    document.getElementById("research_score_chart_label").innerHTML = "<h5 id=\"research_score_chart_label\">Pesquisa</h5>";
    return chart;
    })
}


function plot_military_score(player_name){
    return resolve_player_military_score(player_name).then(dataset => {
        const ctx = reset_canvas('MilitaryScoreChart', 'military_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const ships = dataset['ships'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // },
                // {
                //     label: 'Ships',
                //     data: ships,
                //     fill: false,
                //     borderColor: 'rgb(75, 152, 122)',
                //     tension: 0.1
                // }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    document.getElementById("military_score_chart_label").innerHTML = "<h5 id=\"military_score_chart_label\">Militar</h5>";
    return chart;
    })
}


function plot_military_built_score(player_name){
    return resolve_player_military_built_score(player_name).then(dataset => {
        const ctx = reset_canvas('MilitaryBuiltScoreChart', 'military_built_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    document.getElementById("military_built_score_chart_label").innerHTML = "<h5 id=\"military_built_score_chart_label\">Militares construídos</h5>";
    return chart;
    })
}


function plot_military_destroyed_score(player_name){
    return resolve_player_military_destroyed_score(player_name).then(dataset => {
        const ctx = reset_canvas('MilitaryDestroyedScoreChart', 'military_destroyed_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    document.getElementById("military_destroyed_score_chart_label").innerHTML = "<h5 id=\"military_destroyed_score_chart_label\">Militares destruídos</h5>";
    return chart;
    })
}


function plot_military_lost_score(player_name){
    return resolve_player_military_lost_score(player_name).then(dataset => {
        const ctx = reset_canvas('MilitaryLostScoreChart', 'military_lost_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
        document.getElementById("military_lost_score_chart_label").innerHTML = "<h5 id=\"military_lost_score_chart_label\">Militares perdidos</h5>";
        return chart;
    })
}


function plot_honor_score(player_name){
    return resolve_player_honor_score(player_name).then(dataset => {
        const ctx = reset_canvas('HonorScoreChart', 'honor_score_chart');
        const score = dataset['score'];
        const rank = dataset['rank'];
        const dates = dataset['dates'];

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Score',
                    data: score,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.1
                },
                // {
                //     label: 'Rank',
                //     data: rank,
                //     fill: false,
                //     borderColor: 'rgb(75, 192, 192)',
                //     tension: 0.1
                // }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    document.getElementById("honor_score_chart_label").innerHTML = "<h5 id=\"honor_score_chart_label\">Honra</h5>";
    return chart;
    })
}

function plot_player_statistics(){
    var player_name = document.getElementById('PlayerFilterInput').value;
    draw_player_resume_table(player_name);
    plot_total_score(player_name);
    plot_economy_score(player_name);
    plot_research_score(player_name);
    plot_military_score(player_name);
    plot_military_built_score(player_name);
    plot_military_destroyed_score(player_name);
    plot_military_lost_score(player_name);
    plot_honor_score(player_name);
}
