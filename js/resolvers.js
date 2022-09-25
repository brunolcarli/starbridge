function resolve_player_resume(player_name){
    return get_player(player_name);
}

function resolve_player_by_attribute(player_name, attribute){
    return get_player(player_name).then(player => {
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

function resolve_player_total_score(player_name){
    return resolve_player_by_attribute(player_name, 'total');
}


function resolve_player_economy_score(player_name){
    return resolve_player_by_attribute(player_name, 'economy');
}


function resolve_player_research_score(player_name){
    return resolve_player_by_attribute(player_name, 'research');
}


function resolve_player_military_score(player_name){
    return get_player(player_name).then(player => {
        if (player == undefined){
            return {};
        }
        let score_data = [];
        let rank_data = [];
        let dates = [];
        let ships = [];

        let scores = player['scores'];
        for (let i in scores) {
            score_data.push(scores[i]['military']['score']);
            rank_data.push(scores[i]['military']['rank']);
            ships.push(scores[i]['military']['ships']);
            dates.push(scores[i]['datetime']);
        }
        let data = {'score': score_data, 'rank': rank_data, 'dates': dates, 'ships': ships};
        return data;
    });
}


function resolve_player_military_built_score(player_name){
    return resolve_player_by_attribute(player_name, 'militaryBuilt');
}


function resolve_player_military_destroyed_score(player_name){
    return resolve_player_by_attribute(player_name, 'militaryDestroyed');
}


function resolve_player_military_lost_score(player_name){
    return resolve_player_by_attribute(player_name, 'militaryLost');
}

function resolve_player_honor_score(player_name){
    return resolve_player_by_attribute(player_name, 'honor');
}


function resolve_player_activity(player_name, activity){
    return get_player(player_name).then(player => {
        if (player == undefined){
            return {};
        }
        let score_data = [];
        let dates = [];

        let diffs = player['scoreDiff'];
        for (let i in diffs) {
            score_data.push(diffs[i][activity]);
            dates.push(diffs[i]['datetime']);
        }
        let data = {'score': score_data, 'dates': dates};
        return data;
    });
}


function resolve_player_total_activity(player_name){
    return resolve_player_activity(player_name, 'total');
}


function resolve_player_economy_activity(player_name){
    return resolve_player_activity(player_name, 'economy');
}


function resolve_player_research_activity(player_name){
    return resolve_player_activity(player_name, 'research');
}


function resolve_player_military_activity(player_name){
    return resolve_player_activity(player_name, 'military');
}


function resolve_player_ships_activity(player_name){
    return resolve_player_activity(player_name, 'ships');
}


function resolve_player_military_built_activity(player_name){
    return resolve_player_activity(player_name, 'militaryBuilt');
}


function resolve_player_military_destroyed_activity(player_name){
    return resolve_player_activity(player_name, 'militaryDestroyed');
}


function resolve_player_military_lost_activity(player_name){
    return resolve_player_activity(player_name, 'militaryLost');
}


function resolve_player_honor_activity(player_name){
    return resolve_player_activity(player_name, 'honor');
}


function resolve_average_weekday_progress(player_name){
    return get_player(player_name).then(player => {
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


function resolve_average_hour_progress(player_name){
    return get_player(player_name).then(player => {
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


function resolve_average_halfhour_progress(player_name){
    return get_player(player_name).then(player => {
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
