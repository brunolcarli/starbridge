function resolve_player_resume(query_filter){
    return get_player_resume(query_filter);
}

function resolve_player_by_attribute(query_filter, attribute){
    return get_player(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let score_data = [];
        let rank_data = [];
        let dates = [];
        let scores = player['scores'];
        for (let i in scores) {
            score_data.push(scores[i][attribute]['score']);
            rank_data.push(scores[i][attribute]['rank']);
            dates.push(scores[i]['datetime']);
        }
        let data = {'score': score_data, 'rank': rank_data, 'dates': dates};
        return data;
    });
}


/////////////////////////////////////////
//
//           SCORE RESOLVERS
//
/////////////////////////////////////////


function resolve_player_total_score(query_filter){
    return resolve_player_by_attribute(query_filter, 'total');
}


function resolve_player_economy_score(query_filter){
    return resolve_player_by_attribute(query_filter, 'economy');
}


function resolve_player_research_score(query_filter){
    return resolve_player_by_attribute(query_filter, 'research');
}


function resolve_player_military_score(query_filter){
    return get_player_military_score(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let military = [];
        let military_destroyed = [];
        let military_lost = [];
        let military_built = [];
        let dates = [];
        let ships = [];

        let scores = player['scores'];
        for (let i in scores) {
            military.push(scores[i]['military']['score']);
            military_destroyed.push(scores[i]['militaryDestroyed']['score']);
            military_lost.push(scores[i]['militaryLost']['score']);
            military_built.push(scores[i]['militaryBuilt']['score']);
            ships.push(scores[i]['military']['ships']);
            dates.push(scores[i]['datetime']);
        }
        let data = {
            'military': military,
            'destroyed': military_destroyed,
            'dates': dates,
            'ships': ships,
            'lost': military_lost,
            'built': military_built
        };
        return data;
    });
}


function resolve_player_military_built_score(query_filter){
    return resolve_player_by_attribute(query_filter, 'militaryBuilt');
}


function resolve_player_military_destroyed_score(query_filter){
    return resolve_player_by_attribute(query_filter, 'militaryDestroyed');
}


function resolve_player_military_lost_score(query_filter){
    return resolve_player_by_attribute(query_filter, 'militaryLost');
}


function resolve_player_honor_score(query_filter){
    return resolve_player_by_attribute(query_filter, 'honor');
}


/////////////////////////////////////////
//
//           ACTIVITY RESOLVERS
//
/////////////////////////////////////////


function resolve_player_activities(query_filter){
    return get_player(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let total = [];
        let economy = [];
        let research = [];
        let military = [];
        let ships = [];
        let mil_built = [];  // <--  
        let mil_dest = [];  //  <--   military activity data
        let mil_lost = [];  //  <--
        let honor = [];
        let dates = [];

        let diffs = player['scoreDiff'];
        for (let i in diffs) {
            total.push(diffs[i]['total']);
            economy.push(diffs[i]['economy']);
            research.push(diffs[i]['research']);
            military.push(diffs[i]['military']);
            ships.push(diffs[i]['ships']);
            mil_built.push(diffs[i]['militaryBuilt']);
            mil_dest.push(diffs[i]['militaryDestroyed']);
            mil_lost.push(diffs[i]['militaryLost']);
            honor.push(diffs[i]['honor']);
            dates.push(diffs[i]['datetime']);
        }
        let data = {
            'total': total,
            'economy': economy,
            'research': research,
            'military': military,
            'ships': ships,
            'mil_built': mil_built,
            'mil_lost': mil_lost,
            'mil_dest': mil_dest,
            'honor': honor,
            'dates': dates}
        ;
        return data;
    });
}


function resolve_average_weekday_progress(query_filter){
    return get_player(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let activity = player['weekdayMeanActivity'];
        
        if (activity == undefined){
            return {'score': [], 'dates': []};
        }

        return {'score': activity['averageProgress'], 'dates': activity['weekdays']};
    });
}


function resolve_average_hour_progress(query_filter){
    return get_player(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let activity = player['hourMeanActivity'];
        
        if (activity == undefined){
            return {'score': [], 'dates': []};
        }

        return {'score': activity['averageProgress'], 'dates': activity['hours']};
    });
}


function resolve_average_halfhour_progress(query_filter){
    return get_player(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let activity = player['halfhourMeanActivity'];
        
        if (activity == undefined){
            return {'score': [], 'dates': []};
        }

        return {'score': activity['averageProgress'], 'dates': activity['hours']};
    });
}


function resolve_player_future_activity(query_filter){
    return get_player_future_activity(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let activity = player['activityPrediction'];
        if (activity == undefined){
            return {};
        }
        return activity;
    });
}


function resolve_score_prediction(query_filter){
    return get_player_score_prediction(query_filter).then(player => {
        if (player == undefined){
            return {};
        }
        let pred = player['scorePrediction'];
        
        if (pred == undefined){
            return {
                'predicted': [],
                'future_dates': [],
                'prev_scores': [],
                'prev_dates': [],
                'prev_preds': [],
                'prev_pred_dates': []
            };
        }

        let prev_preds = pred['lastPredictions'];

        return {
            'predicted': pred['scorePredictions'],
            'future_dates': pred['futureDates'],
            'prev_scores': pred['sampleScores'],
            'prev_dates': pred['sampleDates'],
            'prev_preds': prev_preds['predictions'],
            'prev_pred_dates': prev_preds['dates']
        };
    });
}


///////////////////////////////
//
//   Miscellaneous Tools
//
///////////////////////////////


function resolve_datetime_input(range){
    if (range == 'ALL'){
        return '';
    }

    const today = new Date();
    const start_point = new Date(today);

    if (range == '0'){
        start_point.setHours(0, 0, 0);
    }
    else if (range == 'L24'){
        start_point.setHours(start_point.getHours() - 24);
    }
    else {
        start_point.setDate(start_point.getDate() - range);
    }

    return ` datetime_Gte: \\\"${start_point.toISOString()}\\\" `;
}


function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


///////////////////////////////
//
//   Listing table resolvers
//
///////////////////////////////


function list_players(){
    // Status filters
    var status_list = '';
    var input_elements = document.getElementsByClassName('form-check-input');
    for(var i=0; input_elements[i]; ++i){
        if(input_elements[i].checked){
            checkbox_value = ` \\\"${input_elements[i].value}\\\" `;
            status_list += checkbox_value;
        }
    }
    if (Boolean(status_list)){
        status_list = ` status_In: [ ${status_list} ] `;
    }
    
    // Rank filters
    var min_rank = document.getElementById('MinRankInput').value;
    var max_rank = document.getElementById('MaxRankInput').value;

    if (Boolean(min_rank)){
        if (min_rank < 1){
            alert('Rank deve ser maior que 1!');
            return;
        }
        min_rank = ` rank_Gte: ${min_rank} `;
    }

    if (Boolean(max_rank)){
        if (max_rank < 1){
            alert('Rank deve ser maior que 1!');
            return;
        }
        max_rank = ` rank_Lte: ${max_rank} `;
    }

    var query_filter = `${min_rank}${max_rank}${status_list}`;
    if (Boolean(query_filter)){
        query_filter = `( ${query_filter} )`;
    }
    return get_players_list(query_filter);
}


function resolve_send_player_fleet_player_selection(){
    return get_players_name_id().then(players => {
        let player_selection_div = document.getElementById('send_player_fleet_select_player');
        let player_selection_html = '<div style="text-align: center">';
        player_selection_html += '<label for="player_selection">Selecione um jogador:</label>';
        player_selection_html += '<input type="text" list="FleetRecordPlayerInput" id="PlayerSelector" placeholder="Nome do jogador">';
        player_selection_html += '<datalist name="player_selection" id="FleetRecordPlayerInput">';
        // Fills player selection list
        for (let i in players){
            player_selection_html += `<option value="${players[i]['playerId']}">${players[i]['name']}</option>`;
        }
        player_selection_html += '</datalist></div><br />';
        player_selection_div.innerHTML = player_selection_html;
    });
}


function resolve_player_fleet_record(){
    var player_id = $('#PlayerSelector').val();
    // Validate player input
    if (!player_id){
        alert('Necessário escolher um jogador!');
        return
    }
    var inputed = $("#FleetRecordPlayerInput").find("option[value='" + player_id + "']");
    if (inputed == null || inputed.length <= 0){
        alert('Jogador inválido!');
        return
    }

    var galaxy = document.getElementById('FleetRecordGalaxyInput').value;
    var solar_system = document.getElementById('FleetRecordSolarSystemInput').value;
    var position = document.getElementById('FleetRecordPositionInput').value;
    var credentials = JSON.parse(localStorage.getItem('USER_TOKEN'));

    const fleet_input_ids = [
        'LIGHT_FIGHTER',
        'HEAVY_FIGHTER',
        'CRUISER',
        'BATTLESHIP',
        'BATTLECRUISER',
        'BOMBER',
        'DESTROYER',
        'DEATHSTAR',
        'REAPER',
        'PATHFINDER',
        'SMALL_CARGO',
        'LARGE_CARGO',
        'COLONY_SHIP',
        'RECYCLER',
        'ESPIONAGE_PROBE'
    ];
    var fleet = '';

    // parse planet coord
    if (!galaxy || !solar_system || !position){
        alert('As coordenadas do planeta estão incompletas!');
        return
    }
    else if (galaxy < 1 || solar_system < 1 || position < 1 || galaxy > 5 || solar_system > 499 || position > 15){
        alert('Coordenadas inválidas!');
        return
    }
    else {
        var coords = `${galaxy}:${solar_system}:${position}`;
    }

    // parse fleet
    for (let i in fleet_input_ids){
        var ship = document.getElementById(fleet_input_ids[i]).value;
        if (!ship || ship == 0){continue};
        if (ship < 0){
            alert('Número de naves não pode ser negativo');
            return
        }
        fleet += `${fleet_input_ids[i]}: ${parseInt(ship)} `;
    }
    if (!fleet){
        alert('Obrigatório prencher alguma frota');
        return
    }
    else{
        fleet = `{${fleet}}`;
    }

    var input_data = `{ playerId: ${parseInt(player_id)} `;
    input_data += `coord: \\\"${coords}\\\" `;
    input_data += `username: \\\"${credentials['username']}\\\" `;
    input_data += `fleet: ${fleet} }`

    var authorization = `Bearer ${credentials['token']}`;

    create_fleet_record_mutation(input_data, authorization).then(response => {
        if (!response){
            alert('Falha ao salvar os dados. Recarregue a página e tente novamente!');
            return
        }
        alert('Registro: ' + JSON.stringify(response));
        window.location.href = 'send.html';
    });
}
