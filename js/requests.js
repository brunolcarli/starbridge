/*############################################################

                   Requests module

This module contain the http requests to necessary backend(s)
to collect the required data that will be structured into
correct formats to be displayed in the tables and charts that
this website pages makes available.

@beelzebruno (2022)

############################################################*/

///////////////////////////////////
//
//           Endpoints
//
///////////////////////////////////


// Invictus API GraphQL endpoint
const URL = 'https://invictus.brunolcarli.repl.co/graphql/';


///////////////////////////////////
//
//   General request support tools
//
///////////////////////////////////


function json(response) {
    /*Convert response into json format */
    return response.json();
}


function get_request_options(payload){
  /* Returns the request method, headers, content... */
  return {
    method: 'POST',
    headers: {
      cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
      'Content-Type': 'application/json'
    },
    body: payload
  };
}


///////////////////////////////////
//
//      Player data requests
//
///////////////////////////////////

function get_player_weekday_rel_freq(query_filter){
    /*
      Retrieve a single player weekday relative frequency.
      The query filter may be a player partial name value or player id.
      The relative frequency may preset different values if a datetime filter
      is given.
    */
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);

    const query = `player(${query_filter} ${date_range} )`;
    const payload = '{"query": "query{' + query + '{weekdayRelativeFrequency{ weekdays relativeFrequency highStd lowStd }}}"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['player'];
    })
    .catch(err => {
        console.error(err);
    });
}


function get_player_halfhour_rel_freq(query_filter){
  /*
    Retrieve a single player day hours relative frequency (30min period).
    The query filter may be a player partial name value or player id.
    The relative frequency may preset different values if a datetime filter
    is given.
  */
  var date_range = document.getElementById('date_range_selection').value;
  date_range = resolve_datetime_input(date_range);

  const query = `player(${query_filter} ${date_range} )`;
  const payload = '{"query": "query{' + query + '{halfhourRelativeFrequency{ hours relativeFrequency highStd lowStd }}}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      return response['data']['player'];
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player_hour_rel_freq(query_filter){
  /*
    Retrieve a single player day hours relative frequency (1H period).
    The query filter may be a player partial name value or player id.
    The relative frequency may preset different values if a datetime filter
    is given.
  */
  var date_range = document.getElementById('date_range_selection').value;
  date_range = resolve_datetime_input(date_range);

  const query = `player(${query_filter} ${date_range} )`;
  const payload = '{"query": "query{' + query + '{hourRelativeFrequency{ hours relativeFrequency highStd lowStd }}}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      return response['data']['player'];
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player_fleet_rel_freq(query_filter){
  /*
    Retrieve a single player combat fleet composition relative frequency.
    The query filter may be a player partial name value or player id.
    The relative frequency is based on available combat reports posted on ogame
    forum at the current universe threads.
  */

  const query = `player(${query_filter} )`;
  const payload = '{"query": "query{' + query + '{fleetRelativeFrequency}}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      return response['data']['player'];
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player_military_score(query_filter){
  /*
    Retrieve a single player military score data by a partial name value or player id.
    The score may be filtered by a start datetime.
  */
  var date_range = document.getElementById('date_range_selection').value;
  date_range = resolve_datetime_input(date_range);

  const query = `player(${query_filter} ${date_range} )`;
  const payload = '{"query": "query{' + query + '{scores{ datetime military  militaryBuilt  militaryDestroyed militaryLost }}}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let player_data = response['data']['player'];
      return player_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player(query_filter){
    /*
      Retrieve a single player data by a partial name value or player id.
      The score may be filtered by a start datetime.
    */
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);

    const query = `player(${query_filter} ${date_range} )`;
    const payload = '{"query": "query{' + query + '{name playerId status planetsCount alliance { name tag } scores{ timestamp datetime total economy research  military  militaryBuilt  militaryDestroyed militaryLost honor }}}"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        let player_data = response['data']['player'];
        return player_data;
    })
    .catch(err => {
        console.error(err);
    });
}


function get_player_future_activity(query_filter){
  /*
    Retrieve a single player 24 hour activity prediction for the next 7 days.
    Player is filtered by a partial name value or player id
    The model train data is based on the past scores over the weekdays
    and day hours, so the result may change if a starting datetime is input,
    making the model fits over the dates ranged by the start datetime until now.
  */
  var date_range = document.getElementById('date_range_selection').value;
  date_range = resolve_datetime_input(date_range);

  const query = `player(${query_filter} ${date_range} )`;
  const payload = '{"query": "query{' + query + '{ activityPrediction }}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let player_data = response['data']['player'];
      return player_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player_planets(query_filter){
  /*
    Retrieve a single player planets location data. 
    The player is filtered by a partial name value or player id.
  */
  const query = `player(${query_filter})`;
  const payload = '{"query": "query{' + query + '{planets{ galaxy solarSystem position name rawCoord }}}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let player_data = response['data']['player'];
      return player_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player_resume(query_filter){
  /*
    Retrieve a single player data necessary only to fil the player resume table.
    The player is filtered by a partial name value or player id.
  */
  const query = `player(${query_filter})`;
  const payload = '{"query": "query{' + query + '{name playerId status planetsCount planets {name rawCoord} shipsCount alliance { name tag } scores{ total } combatReportsCount combatReports{ title url } }}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let player_data = response['data']['player'];
      return player_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_players_list(query_filters){
  /*
    Retrieve a list of players data.
    The players may be filtered by a rank range, from min to max rank.
    The players may be filtered by a list os possible status.
  */
  const payload = '{"query": "query{players' + query_filters + '{name playerId status planetsCount planets {name rawCoord} shipsCount rank alliance { name tag } combatReportsCount combatReports{ title url } }}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let player_data = response['data']['players'];
      return player_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player_score_prediction(query_filter){
    /*
      Retrieve a single player current and future mean score prediction data.
      Player is filtered by a partial name value or player id
      The model prediction shows 14 days in the future and retrieve the last
      prediction made tow days past.
    */
    const query = `player(${query_filter})`;
    const payload = '{"query": "query{' + query + '{name playerId status planetsCount alliance { name tag } scorePrediction{ sampleDates sampleScores futureDates scorePredictions lastPredictions { dates  predictions } } }}"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        let player_data = response['data']['player'];
        return player_data;
    })
    .catch(err => {
        console.error(err);
    });
}


///////////////////////////////////
//
//      ALLY data requests
//
///////////////////////////////////


function get_ally_resume(ally_name){
  /*
    Retrieve a single alliance data resume.
    The alliance is filtered by a partial name value.
  */
  const query = `alliance(name_Icontains: \\\"${ally_name}\\\")`;
  const payload = '{"query": "query{' + query + '{name tag logo founder{ name } foundDate members{ playerId name shipsCount rank planetsCount planets{ name rawCoord} status combatReportsCount combatReports{ title url } } playersCount planetsCount shipsCount}}"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let ally_data = response['data']['alliance'];
      return ally_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_ally_planets(ally_name){
  /*
    Retrieve a single alliance planet coords.
    The alliance is filtered by a partial name value.
  */
  const query = `alliance(name_Icontains: \\\"${ally_name}\\\")`;
  const payload = '{"query": "query{' + query + '{ planetsDistributionCoords{ galaxy solarSystem position rawCoord } } }"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let ally_data = response['data']['alliance'];
      return ally_data;
  })
  .catch(err => {
      console.error(err);
  });
}

function get_ally_planets_by_galaxy(ally_name){
  /*
    Retrieve a single alliance planet distribution by galaxy.
    The alliance is filtered by a partial name value.
  */
  const query = `alliance(name_Icontains: \\\"${ally_name}\\\")`;
  const payload = '{"query": "query{' + query + '{ planetsDistributionByGalaxy } }"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      let ally_data = response['data']['alliance'];
      return ally_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_ally_fleet_rel_freq(ally_name){
    /*
      Retrieve a single alliance fleet relative frequency.
      The alliance is filtered by a partial name value.
    */
    const query = `alliance(name_Icontains: \\\"${ally_name}\\\")`;
    const payload = '{"query": "query{' + query + '{fleetRelativeFrequency}}"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        let ally_data = response['data']['alliance'];
        return ally_data;
    })
    .catch(err => {
        console.error(err);
    });
}


///////////////////////////////////
//
//     Universe data requests
//
///////////////////////////////////


function get_universe_overview(){
    /*
      Retrieve all player planets coords, rank and status to be plotted.
    */
    const payload = '{"query": "query{ players{ status rank planets{ galaxy solarSystem position rawCoord} } }"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        let player_data = response['data']['players'];
        return player_data;
    })
    .catch(err => {
        console.error(err);
    });
}


function get_universe_fleet_relative_frequency(){
  /*
    Retrieve fleet ships relative frequency based on all universe players.
    The frequency is calculated by existing and collected combat reports.
  */
  const payload = '{"query": "query{ universeFleetRelativeFrequency }"}';
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      return response['data']['universeFleetRelativeFrequency'];
  })
  .catch(err => {
      console.error(err);
  });
}


function get_general_ranks(){
  /*
    Retrieve all players ranks.
  */
  const today = new Date();
  const start_point = new Date(today);
  start_point.setHours(start_point.getHours() - 2);
  const date_filter =  ` datetime_Gte: \\\"${start_point.toISOString()}\\\" `

  const payload = `{"query": "query{ players (status: \\\"nan\\\"  rank_Lte: 400 ${date_filter} ) { name  rank scores { total economy research military militaryBuilt militaryDestroyed militaryLost honor} }  }"}`;
  const options = get_request_options(payload);
  return fetch(URL, options)
  .then(json)
  .then(response => {
      return response['data']['players'];
  })
  .catch(err => {
      console.error(err);
  });
}
