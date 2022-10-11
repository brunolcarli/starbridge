//////////////////////////////////////
//
//          TABLE RESUME
//
//////////////////////////////////////

function reset_players_list(){
    var table = document.getElementById("player_list_table");
    table.innerHTML = '';
    table.align = 'center';
    table.className = 'table table-dark';

    var header = table.insertRow(0);

    var player_id = header.insertCell(0);
    var name = header.insertCell(1);
    var status = header.insertCell(2);
    var planets = header.insertCell(3);
    var rank = header.insertCell(4);
    var ally = header.insertCell(5);
    var ships = header.insertCell(6);
    var combat_reports = header.insertCell(7);

    player_id.innerHTML = 'ID';
    name.innerHTML = 'Nome';
    status.innerHTML = 'Status';
    rank.innerHTML = 'Rank';
    planets.innerHTML = 'Planetas';
    ally.innerHTML = 'Aliança';
    ships.innerHTML = 'Naves';
    combat_reports.innerHTML = 'Relatórios de Combate';

}


function draw_players_list(){
    reset_players_list();
    return list_players().then(data => {
        var table = document.getElementById("player_list_table");
        for (let i in data){
            var row = table.insertRow(table.rows.length);
            var player_ally = data[i][['alliance']];
            var player_status = data[i][['status']];

            if (!player_ally){
                player_ally = 'No Ally';
            }
            else {
                player_ally = `[${player_ally['tag']}] ${player_ally['name']}`;
            }

            if (player_status == 'a'){
                player_status = 'Game Admin';
            }
            else if (player_status == 'nan') {
                player_status = 'Ativo';
            }

            var reports_count = data[i]['combatReportsCount'];
            var reports = data[i]['combatReports'];
            

            if (reports_count > 0){
                var report_select = '<div class="dropdown">';
                report_select += '<button class="btn dropdown-toggle" type="button" data-toggle="dropdown"> ';
                report_select += `${reports_count}<span class="caret"></span></button>`;
                report_select += '<ul class="dropdown-menu">';
  
                for (let j in reports){
                    var url = reports[j]['url'];
                    var title = reports[j]['title'];
                    report_select += `<li><hr /><a href="${url}" target="_blank"> - ${title}</a></li>`;
                }
                report_select += '</ul></div>';
            } else {
                var report_select = `${reports_count}`;
            }

            var player_id = row.insertCell(0);
            var name = row.insertCell(1);
            var status = row.insertCell(2);
            var planets = row.insertCell(3);
            var rank = row.insertCell(4);
            var ally = row.insertCell(5);
            var ships = row.insertCell(6);
            var combat_reports = row.insertCell(7);

            player_id.innerHTML = data[i]['playerId'];
            name.innerHTML = data[i]['name'];
            status.innerHTML = player_status;
            rank.innerHTML = data[i]['rank'];
            planets.innerHTML = data[i]['planetsCount'];
            ally.innerHTML = player_ally;
            ships.innerHTML = data[i]['shipsCount'];
            combat_reports.innerHTML = report_select;
        }
    });
}


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
    var ships = header.insertCell(7);
    var combat_reports = header.insertCell(8);

    player_id.innerHTML = 'ID';
    name.innerHTML = 'Nome';
    status.innerHTML = 'Status';
    rank.innerHTML = 'Rank';
    score.innerHTML = 'Pontos';
    planets.innerHTML = 'Planetas';
    ally.innerHTML = 'Aliança';
    ships.innerHTML = 'Naves';
    combat_reports.innerHTML = 'Relatórios de Combate';
}


function draw_player_resume_table(query_filter){
    reset_player_resume_table();
    return resolve_player_resume(query_filter).then(data => {
        var table = document.getElementById("player_resume_table");
        var row = table.insertRow(table.rows.length);

        var player_id = row.insertCell(0);
        var name = row.insertCell(1);
        var status = row.insertCell(2);
        var rank = row.insertCell(3);
        var score = row.insertCell(4);
        var planets = row.insertCell(5);
        var ally = row.insertCell(6);
        var ships = row.insertCell(7);
        var combat_reports = row.insertCell(8);

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

        // get player combat reports
        var reports_count = data['combatReportsCount'];
        var reports = data['combatReports'];
        

        if (reports_count > 0){
            var report_select = '<div class="dropdown">';
            report_select += '<button class="btn dropdown-toggle" type="button" data-toggle="dropdown"> ';
            report_select += `${reports_count}<span class="caret"></span></button>`;
            report_select += '<ul class="dropdown-menu">';

            for (let j in reports){
                var url = reports[j]['url'];
                var title = reports[j]['title'];
                report_select += `<li><hr /><a href="${url}" target="_blank"> - ${title}</a></li>`;
            }
            report_select += '</ul></div>';
        } else {
            var report_select = `${reports_count}`;
        }

        player_id.innerHTML = data['playerId'];
        name.innerHTML = data['name'];
        status.innerHTML = player_status;
        rank.innerHTML = total_score['rank'];
        score.innerHTML = total_score['score'];
        planets.innerHTML = data['planetsCount'];
        ally.innerHTML = player_ally;
        ships.innerHTML = data['shipsCount'];
        combat_reports.innerHTML = report_select;
    });
}


function reset_ally_resume_table(){
    var table = document.getElementById("ally_resume_table");
    var ally_logo = document.getElementById('AllyLogo');

    ally_logo.innerHTML = '<img src="" align="center" width="150">';

    table.innerHTML = '';
    table.align = 'center';
    table.className = 'table table-secondary';

    var header = table.insertRow(0);

    var name = header.insertCell(0);
    var tag = header.insertCell(1);
    var players_count = header.insertCell(2);
    var planets_count = header.insertCell(3);
    var ships_count = header.insertCell(4);
    var founder = header.insertCell(5);

    name.innerHTML = '<b><u>Nome</u></b>';
    tag.innerHTML = '<b><u>TAG</u></b>';
    players_count.innerHTML = '<b><u>Membros</u></b>';
    planets_count.innerHTML = '<b><u>Planetas</u></b>';
    ships_count.innerHTML = '<b><u>Naves</u></b>';
    founder.innerHTML = '<b><u>Fundador</u></b>';
}


function draw_ally_resume_table(ally_name){
    reset_ally_resume_table();
    return get_ally(ally_name).then(data => {
        var table = document.getElementById("ally_resume_table");

        var logo = data['logo'];
        if (logo != 'nan'){
            var ally_logo = document.getElementById('AllyLogo');
            ally_logo.innerHTML = `<img src="${logo}" align="center" width="150">`;
        }
        
        
        var row = table.insertRow(table.rows.length);

        var name = row.insertCell(0);
        var tag = row.insertCell(1);
        var players_count = row.insertCell(2);
        var planets_count = row.insertCell(3);
        var ships_count = row.insertCell(4);
        var founder = row.insertCell(5);

        // Add some text to the new cells:
        name.innerHTML = data['name'];
        tag.innerHTML = data['tag'];
        players_count.innerHTML = data['playersCount'];
        planets_count.innerHTML = data['planetsCount'];
        ships_count.innerHTML = data['shipsCount'];
        founder.innerHTML = data['founder']['name'];
        
        var temp = null;
        row = table.insertRow(table.rows.length);
        row.className = 'table-dark';
        temp = row.insertCell(0);
        temp.innerHTML = '<b><u>Membro</u></b>';
        temp = row.insertCell(1);
        temp.innerHTML = '<b><u>ID</u></b>';
        temp = row.insertCell(2);
        temp.innerHTML = '<b>Status</b>';
        temp = row.insertCell(3);
        temp.innerHTML = '<b><u>Planetas</u></b>';
        temp = row.insertCell(4);
        temp.innerHTML = '<b><u>Naves</u></b>';
        temp = row.insertCell(5);
        temp.innerHTML = '<b><u>Rank</u></b>';

        var members = data['members'];
        for (let i in members){
            var player_status = members[i]['status'];
            if (player_status == 'nan'){
                player_status = 'Active';
            }
            row = table.insertRow(table.rows.length);
            temp = row.insertCell(0);
            temp.innerHTML = members[i]['name'];
            temp = row.insertCell(1);
            temp.innerHTML =  members[i]['playerId'];
            temp = row.insertCell(2);
            temp.innerHTML = player_status;
            temp = row.insertCell(3);
            temp.innerHTML = members[i]['planetsCount'];
            temp = row.insertCell(4);
            temp.innerHTML = members[i]['shipsCount'];
            temp = row.insertCell(5);
            temp.innerHTML = members[i]['rank'];
        }

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

function plot_total_score(query_filter){
    return resolve_player_total_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_economy_score(query_filter){
    return resolve_player_economy_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_research_score(query_filter){
    return resolve_player_research_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_military_score(query_filter){
    return resolve_player_military_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_ship_score(query_filter){
    return resolve_player_military_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_military_built_score(query_filter){
    return resolve_player_military_built_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_military_destroyed_score(query_filter){
    return resolve_player_military_destroyed_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_military_lost_score(query_filter){
    return resolve_player_military_lost_score(query_filter).then(dataset => {
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
                    tension: 0.5
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


function plot_honor_score(query_filter){
    return resolve_player_honor_score(query_filter).then(dataset => {
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
                    tension: 0.5
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

function plot_player_weekday_relative_freq(query_filter){
    return get_player_weekday_rel_freq(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['weekdayRelativeFrequency']['weekdays'],
                datasets: [
                    {
                        label: 'Fr %',
                        data: dataset['weekdayRelativeFrequency']['relativeFrequency'],
                        backgroundColor: ['rgb(36, 252, 3, 0.2)'],
                        borderColor: ['rgb(255, 159, 64)'],
                        borderWidth: 1
                    },
                    {
                        label: 'STD +',
                        data: dataset['weekdayRelativeFrequency']['highStd'],
                        backgroundColor: ['rgba(252, 3, 3, 0.2)'],
                        borderColor: ['rgb(255, 99, 132)'],
                        borderWidth: 1
                    },
                    {
                        label: 'STD -',
                        data: dataset['weekdayRelativeFrequency']['lowStd'],
                        backgroundColor: ['rgba(3, 211, 252, 0.2)'],
                        borderColor: ['rgb(1, 199, 142)'],
                        borderWidth: 1
                        },
                    {
                        label: 'Frequência relativa por dia da semana (Linha)',
                        data: dataset['weekdayRelativeFrequency']['relativeFrequency'],
                        fill: false,
                        borderColor: 'rgb(36, 252, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão + (High)',
                        data: dataset['weekdayRelativeFrequency']['highStd'],
                        fill: false,
                        borderColor: 'rgb(252, 3, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão - (Low)',
                        data: dataset['weekdayRelativeFrequency']['lowStd'],
                        fill: false,
                        borderColor: 'rgb(3, 211, 252)',
                        tension: 0.5,
                        type: 'line'
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_player_hour_relative_freq(query_filter){
    return get_player_hour_rel_freq(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['hourRelativeFrequency']['hours'],
                datasets: [
                    {
                        label: 'Fr %',
                        data: dataset['hourRelativeFrequency']['relativeFrequency'],
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
                    },
                    {
                        label: 'Frequência relativa (%) hora do dia (Período 1H) [Linha]',
                        data: dataset['hourRelativeFrequency']['relativeFrequency'],
                        fill: false,
                        borderColor: 'rgb(36, 252, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão + (High)',
                        data: dataset['hourRelativeFrequency']['highStd'],
                        fill: false,
                        borderColor: 'rgb(252, 3, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão - (Low)',
                        data: dataset['hourRelativeFrequency']['lowStd'],
                        fill: false,
                        borderColor: 'rgb(3, 211, 252)',
                        tension: 0.5,
                        type: 'line'
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_player_halfhour_relative_freq(query_filter){
    return get_player_halfhour_rel_freq(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['halfhourRelativeFrequency']['hours'],
                datasets: [
                    {
                        label: 'Fr %',
                        data: dataset['halfhourRelativeFrequency']['relativeFrequency'],
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
                    },
                    {
                        label: 'Frequência relativa (%) hora do dia (Período 30min) [Linha]',
                        data: dataset['halfhourRelativeFrequency']['relativeFrequency'],
                        fill: false,
                        borderColor: 'rgb(36, 252, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão + (High)',
                        data: dataset['halfhourRelativeFrequency']['highStd'],
                        fill: false,
                        borderColor: 'rgb(252, 3, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão - (Low)',
                        data: dataset['halfhourRelativeFrequency']['lowStd'],
                        fill: false,
                        borderColor: 'rgb(3, 211, 252)',
                        tension: 0.5,
                        type: 'line'
                    },
                ]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_activity(query_filter){
    return resolve_player_activities(query_filter).then(dataset => {
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
                        tension: 0.5
                    },
                    {
                        type: 'line',
                        label: 'Research activity',
                        data: dataset['research'],
                        fill: false,
                        borderColor: 'rgb(200, 52, 129)',
                        tension: 0.5
                    },
                    {
                        type: 'line',
                        label: 'Military activity',
                        data: dataset['military'],
                        fill: false,
                        borderColor: 'rgb(57, 25, 99)',
                        tension: 0.5
                    },
                    {
                        label: 'Fleet count activity',
                        data: dataset['ships'],
                        fill: false,
                        borderColor: 'rgb(65, 252, 190)',
                        tension: 0.5
                    },
                    {
                        type: 'line',
                        label: 'Military built activity',
                        data: dataset['mil_built'],
                        fill: false,
                        borderColor: 'rgb(255, 52, 200)',
                        tension: 0.5
                    },
                    {
                        type: 'line',
                        label: 'Military destroyed activity',
                        data: dataset['mil_dest'],
                        fill: false,
                        borderColor: 'rgb(100, 52, 199)',
                        tension: 0.5
                    },
                    {
                        type: 'line',
                        label: 'Military Lost activity',
                        data: dataset['mil_lost'],
                        fill: false,
                        borderColor: 'rgb(75, 152, 199)',
                        tension: 0.5
                    },
                    {
                        type: 'line',
                        label: 'Honor activity',
                        data: dataset['honor'],
                        fill: false,
                        borderColor: 'rgb(175, 152, 199)',
                        tension: 0.5
                    },
                    {
                        type: 'line',
                        label: 'Total activity',
                        data: dataset['total'],
                        fill: false,
                        borderColor: 'rgb(175, 92, 99)',
                        tension: 0.5
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


function plot_score_prediction(query_filter){
    return resolve_score_prediction(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let predicted = dataset['predicted'];
        let future_dates = dataset['future_dates'];
        let prev_scores = dataset['prev_scores'];
        let prev_dates = dataset['prev_dates'];
        let prev_preds = dataset['prev_preds'];
        let prev_pred_dates = dataset['prev_pred_dates'];

        // Fill blank spaces to fit prediction in the correct chart position
        let filler = new Array(prev_scores.length-1).fill(null);
        predicted = filler.concat(predicted);

        // fill blank spaces to fit previous prediction in the correct chart position
        filler = new Array(prev_dates.indexOf(prev_pred_dates[0])).fill(null);
        prev_preds = filler.concat(prev_preds);

        let date_labels = prev_dates.concat(future_dates);

        const data = {
            labels: date_labels,
            datasets: [
                {
                    label: 'Pontuação média atual',
                    data: prev_scores,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                },
                {
                    label: 'Última média prevista',
                    data: prev_preds,
                    fill: false,
                    borderColor: 'rgb(75, 192, 199)',
                    tension: 0.5,
                    type: 'scatter'
                },
                {
                    label: 'Pontuação média Prevista',
                    data: predicted,
                    fill: false,
                    borderColor: 'rgb(175, 192, 12)',
                    tension: 0.5
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


function plot_player_future_activity(query_filter){
    return resolve_player_future_activity(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');

        const weekdays = Object.keys(dataset);
        let data = {
            labels: Array.from({length: 24}, (_, i) => i),
            datasets: []
        };
        let plot_data = null;
        let weekday = null;

        for (let i in weekdays){
            weekday = weekdays[i];
            plot_data = {
                label: weekday,
                data: dataset[weekday],
                type: 'line',
                borderColor: `rgb(${randint(1, 255)}, ${randint(1, 255)}, ${randint(1, 255)})`,
                tension: 0.5
            };
            data['datasets'].push(plot_data);
        }

        const chart = new Chart(ctx, {
            data: data,
            options: {
                responsive: false,
                scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Indice de atividade'
                      }
                    },
                    x: {
                        title: {
                          display: true,
                          text: 'Hora do dia'
                        }
                      }
                  }
            }
        });
    return chart;
    })
}


//////

function plot_player_planets(query_filter){
    return get_player_planets(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const planets = dataset['planets'];
        const solar_systems = [];
        const galaxy_pos = [];
        const planet_names = [];
        let temp = null;
        let position = null;

        for (let i in planets){
            solar_systems.push(planets[i]['solarSystem']);
            position = `${planets[i]['position']}`;
            temp = `${planets[i]['galaxy']}.${position}`;
            galaxy_pos.push({y: parseFloat(temp).toFixed(2), x: planets[i]['solarSystem']});
            planet_names.push({name: planets[i]['name'], coord: planets[i]['rawCoord']});
        }

        const data = {
            labels: solar_systems,
            datasets: [
                {
                    label: 'Coord',
                    labels: planet_names,
                    data: galaxy_pos,
                    type: 'scatter',
                    borderColor: 'rgb(175, 92, 122)',
                }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                responsive: false,
                scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Galaxy'
                      }
                    },
                    x: {
                        title: {
                          display: true,
                          text: 'Solar System'
                        }
                      }
                  },
                  plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(ctx) {
                                // console.log(ctx);
                                let name = ctx.dataset.labels[ctx.dataIndex]['name'];
                                let coord = ctx.dataset.labels[ctx.dataIndex]['coord'];
                                return name + ' [' + coord + ']';
                            }
                        }
                    }
                }
            }
        });
    return chart;
    })
}


//////////////////////////////////////////////
//
//           Alliance plots
//
//////////////////////////////////////////////

function plot_ally_planets(ally_name){
    return get_ally(ally_name).then(dataset => {
        const ctx = reset_canvas('AllyChart', 'ally_chart');
        const planets = dataset['planetsDistributionCoords'];
        const solar_systems = [];
        const galaxy_pos = [];
        let temp = null;
        let position = null;
        let raw_coords = [];

        for (let i in planets){
            solar_systems.push(planets[i]['solarSystem']);
            position = `${planets[i]['position']}`;

            temp = `${planets[i]['galaxy']}.${position}`;
            galaxy_pos.push({y: parseFloat(temp).toFixed(2), x: planets[i]['solarSystem']});
            raw_coords.push(planets[i]['rawCoord']);
        }

        const data = {
            labels: solar_systems,
            datasets: [
                {
                    label: 'Coord',
                    labels: raw_coords,
                    data: galaxy_pos,
                    type: 'scatter',
                    borderColor: 'rgb(175, 92, 122)',
                }
            ]
            };
        const chart = new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                responsive: false,
                scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Galaxy'
                      }
                    },
                    x: {
                        title: {
                          display: true,
                          text: 'Solar System'
                        }
                      }
                  } ,
                  plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(ctx) {
                                let coord = ctx.dataset.labels[ctx.dataIndex];
                                return '[' + coord + ']';
                            }
                        }
                    }
                }   
            }
        });
    return chart;
    })
}


function plot_ally_galaxy_distribution(query_filter){
    return get_ally(query_filter).then(dataset => {
        const ctx = reset_canvas('AllyChart', 'ally_chart');

        const distribution = dataset['planetsDistributionByGalaxy'];
        const galaxies = [1, 2, 3, 4, 5];
        const count = [
            distribution['1'],
            distribution['2'],
            distribution['3'],
            distribution['4'],
            distribution['5'],
        ];

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: galaxies,
                datasets: [
                    {
                        label: 'Planetas por galáxia',
                        data: count,
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
                    },
                ]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'N˚ de planetas'
                      }
                    },
                    x: {
                        title: {
                          display: true,
                          text: 'Galáxia'
                        }
                      }
                  } 
            }
        });
        return chart;
    });
}




//////////////////////////////////////////////
//
//           Dynamic Chart handler
//
//////////////////////////////////////////////


function update_dynamic_chart(query_filter, value){

    const valid_options = {
        TOTAL_SCORE: plot_total_score,
        ECONOMY_SCORE: plot_economy_score,
        RESEARCH_SCORE: plot_research_score,
        MILITARY_SCORE: plot_military_score,
        SHIP_COUNT: plot_ship_score,
        MILITARY_BUILT_SCORE: plot_military_built_score,
        MILITARY_DESTROYED_SCORE: plot_military_destroyed_score,
        MILITARY_LOST_SCORE: plot_military_lost_score,
        HONOR_SCORE: plot_honor_score,
        PLAYER_ACTIVITY: plot_activity,
        WEEKDAY_REL_FREQ: plot_player_weekday_relative_freq,
        HOUR_REL_FREQ: plot_player_hour_relative_freq,
        HALFHOUR_REL_FREQ: plot_player_halfhour_relative_freq,
        SCORE_PREDICTION: plot_score_prediction,
        PLANETS: plot_player_planets,
        ACTIVITY_PREDICTION: plot_player_future_activity
    };
    valid_options[value](query_filter);
}


function plot_player_statistics(){
    var filter_name = document.querySelector('input[class="chart_filter"]:checked').value;
    var filter_value = document.getElementById('PlayerFilterInput').value;
    var chart_type = document.getElementById('chart_selection').value;

    if (!filter_value){
        alert('Necessário informar o filtro do jogador!');
        return;
    }

    if (filter_name == 'name_Icontains'){
        var query_filter = ` ${filter_name}: \\\"${filter_value}\\\" `;
    }
    else {
        var query_filter = ` ${filter_name}: ${filter_value} `;
    }
    draw_player_resume_table(query_filter);
    update_dynamic_chart(query_filter, chart_type);
}


function update_ally_chart(ally_name, value){
    if (value == 'PLANETS'){
        plot_ally_planets(ally_name);
    }
    else if (value == 'GALAXY_DISTRIBUTION'){
        plot_ally_galaxy_distribution(ally_name);
    }
}



function plot_ally_statistics(){
    var ally_name = document.getElementById('AllyFilterInput').value;
    var chart_type = document.getElementById('ally_chart_selection').value;


    if (!ally_name){
        alert('Necessário informar o nome da aliança!');
        return;
    }
    draw_ally_resume_table(ally_name);
    update_ally_chart(ally_name, chart_type);
}


function plot_universe_overview(){
    return get_universe_overview().then(dataset => {
        const ctx = reset_canvas('UniverseOverviewChart', 'universe_overview_chart');

        let collection = {
            top100: [],
            top200: [],
            top300: [],
            rest: [],
            inatives: [],
        };

        let rank = null;
        let status = null;
        let key = null;
        let planets = null;
        let temp = null;
        let position = null;

        for (let i in dataset){
            rank = dataset[i]['rank'];
            planets = dataset[i]['planets'];
            if (rank == null || planets == null){continue}

            status = dataset[i]['status'];
            if (status == 'i' || status == 'I'){
                key = 'inatives';
            }
            else if (rank <= 100) {
                key = 'top100';
            }
            else if (rank > 100 && rank <= 200) {
                key = 'top200';
            }
            else if (rank > 200 && rank <= 300) {
                key = 'top300';
            }
            else{
                key = 'rest';
            }

            for (let j in planets){
                position = `${planets[j]['position']}`;
                temp = `${planets[j]['galaxy']}.${position}`;
                collection[key].push(
                    {y: parseFloat(temp).toFixed(2), x: planets[j]['solarSystem']}
                );
            }
        }

        const data = {
            labels: Array.from({length: 499}, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Top 100',
                    data: collection['top100'],
                    type: 'scatter',
                    borderColor: 'rgb(242, 27, 12)',
                },
                {
                    label: 'Top 200',
                    data: collection['top200'],
                    type: 'scatter',
                    borderColor: 'rgb(242, 131, 12)',
                },
                {
                    label: 'Top 300',
                    data: collection['top300'],
                    type: 'scatter',
                    borderColor: 'rgb(242, 211, 12)',
                },
                {
                    label: 'Rank > 400',
                    data: collection['rest'],
                    type: 'scatter',
                    borderColor: 'rgb(12, 242, 100)',
                },
                {
                    label: 'Inativos',
                    data: collection['inatives'],
                    type: 'scatter',
                    borderColor: 'rgb(111, 112, 112)',
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                responsive: false,
                scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Galaxy'
                      }
                    },
                    x: {
                        title: {
                          display: true,
                          text: 'Solar System'
                        }
                      }
                  } , 
            }
        });
        return chart;
    })
}
