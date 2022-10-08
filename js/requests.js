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


function get_player(player_name){
    /*
      Retrieve a single player data by a partial name value.
      The score may be filtered by a start datetime.
    */
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);

    const query = `player(name_Icontains: \\\"${player_name}\\\" ${date_range} )`;
    const payload = '{"query": "query{' + query + '{name playerId status planetsCount halfhourMeanActivity{ hours averageProgress } hourMeanActivity{ hours averageProgress } weekdayMeanActivity{ weekdays averageProgress } scoreDiff { datetime total economy research military ships militaryBuilt militaryDestroyed militaryLost honor} alliance { name tag } scores{ timestamp datetime total economy research  military  militaryBuilt  militaryDestroyed militaryLost honor }}}"}';
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


function get_player_future_activity(player_name){
  /*
    Retrieve a single player 24 hour activity prediction for the next 7 days.
    Player is filtered by a partial name value
    The model train data is based on the past scores over the weekdays
    and day hours, so the result may change if a starting datetime is input,
    making the model fits over the dates ranged by the start datetime until now.
  */
  var date_range = document.getElementById('date_range_selection').value;
  date_range = resolve_datetime_input(date_range);

  const query = `player(name_Icontains: \\\"${player_name}\\\" ${date_range} )`;
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


function get_player_planets(player_name){
  /*
    Retrieve a single player planets location data. 
    The player is filtered by a partial name value.
  */
  const query = `player(name_Icontains: \\\"${player_name}\\\")`;
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


function get_player_resume(player_name){
  /*
    Retrieve a single player data necessary only to fil the player resume table.
    The player is filtered by a partial name value.
  */
  const query = `player(name_Icontains: \\\"${player_name}\\\")`;
  const payload = '{"query": "query{' + query + '{name playerId status planetsCount shipsCount alliance { name tag } scores{ total } combatReportsCount combatReports{ title url } }}"}';
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
  const payload = '{"query": "query{players' + query_filters + '{name status planetsCount shipsCount rank alliance { name tag } combatReportsCount combatReports{ title url } }}"}';
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


function get_player_score_prediction(player_name){
    /*
      Retrieve a single player current and future mean score prediction data.
      Player is filtered by a partial name value
      The model prediction shows 14 days in the future and retrieve the last
      prediction made tow days past.
    */
    const query = `player(name_Icontains: \\\"${player_name}\\\")`;
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


function get_ally(ally_name){
    /*
      Retrieve a single alliance data.
      The alliance is filtered by a partial name value.
    */
    const query = `alliance(name_Icontains: \\\"${ally_name}\\\")`;
    const payload = '{"query": "query{' + query + '{name tag founder{ name } members{ name shipsCount rank planetsCount } planetsDistributionCoords{ galaxy solarSystem position rawCoord } planetsDistributionByGalaxy playersCount planetsCount shipsCount}}"}';
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
