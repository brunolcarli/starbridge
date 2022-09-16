function plot_total_score(player_name){
    return resolve_player_total_score(player_name).then(dataset => {
        const ctx = document.getElementById('TotalScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
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
    document.getElementById("total_score_chart_label").innerHTML += "<h5 id=\"total_score_chart_label\">Total</h5>";
    return chart;
    })
}


function plot_economy_score(player_name){
    return resolve_player_economy_score(player_name).then(dataset => {
        const ctx = document.getElementById('EconomyScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
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
    document.getElementById("economy_score_chart_label").innerHTML += "<h5 id=\"economy_score_chart_label\">Economia</h5>";
    return chart;
    })
}


function plot_research_score(player_name){
    return resolve_player_research_score(player_name).then(dataset => {
        const ctx = document.getElementById('ResearchScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
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
    document.getElementById("research_score_chart_label").innerHTML += "<h5 id=\"research_score_chart_label\">Pesquisa</h5>";
    return chart;
    })
}


function plot_military_score(player_name){
    return resolve_player_military_score(player_name).then(dataset => {
        const ctx = document.getElementById('MilitaryScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Ships',
                    data: ships,
                    fill: false,
                    borderColor: 'rgb(75, 152, 122)',
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
    document.getElementById("military_score_chart_label").innerHTML += "<h5 id=\"military_score_chart_label\">Militar</h5>";
    return chart;
    })
}


function plot_military_built_score(player_name){
    return resolve_player_military_built_score(player_name).then(dataset => {
        const ctx = document.getElementById('MilitaryBuiltScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
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
    document.getElementById("military_built_score_chart_label").innerHTML += "<h5 id=\"military_built_score_chart_label\">Militares construídos</h5>";
    return chart;
    })
}


function plot_military_destroyed_score(player_name){
    return resolve_player_military_destroyed_score(player_name).then(dataset => {
        const ctx = document.getElementById('MilitaryDestroyedScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
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
    document.getElementById("military_destroyed_score_chart_label").innerHTML += "<h5 id=\"military_destroyed_score_chart_label\">Militares destruídos</h5>";
    return chart;
    })
}


function plot_military_lost_score(player_name){
    return resolve_player_military_lost_score(player_name).then(dataset => {
        const ctx = document.getElementById('MilitaryLostScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
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
        document.getElementById("military_lost_score_chart_label").innerHTML += "<h5 id=\"military_lost_score_chart_label\">Militares perdidos</h5>";
    return chart;
    })
}


function plot_honor_score(player_name){
    return resolve_player_honor_score(player_name).then(dataset => {
        const ctx = document.getElementById('HonorScoreChart').getContext('2d');
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
                {
                    label: 'Rank',
                    data: rank,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
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
    document.getElementById("honor_score_chart_label").innerHTML += "<h5 id=\"honor_score_chart_label\">Honra</h5>";
    return chart;
    })
}

function plot_player_statistics(){
    var player_name = document.getElementById('PlayerFilterInput').value;
    plot_total_score(player_name);
    plot_economy_score(player_name);
    plot_research_score(player_name);
    plot_military_score(player_name);
    plot_military_built_score(player_name);
    plot_military_destroyed_score(player_name);
    plot_military_lost_score(player_name);
    plot_honor_score(player_name);
}
