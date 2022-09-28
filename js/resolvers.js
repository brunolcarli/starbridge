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


/////////////////////////////////////////
//
//           SCORE RESOLVERS
//
/////////////////////////////////////////


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


/////////////////////////////////////////
//
//           ACTIVITY RESOLVERS
//
/////////////////////////////////////////


function resolve_player_activities(player_name){
    return get_player(player_name).then(player => {
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


function resolve_score_prediction(player_name){
    return get_player_score_prediction(player_name).then(player => {
        if (player == undefined){
            return {};
        }
        let pred = player['scorePrediction'];
        
        if (pred == undefined){
            return {'predicted': [], 'future_dates': [], 'prev_scores': [], 'prev_dates': []};
        }

        return {
            'predicted': pred['scorePredictions'],
            'future_dates': pred['futureDates'],
            'prev_scores': pred['sampleScores'],
            'prev_dates': pred['sampleDates']
        };
    });
}
