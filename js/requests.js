function json(response) {
    return response.json()
};


function get_player(player_name){
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);

    const query = `player(name_Icontains: \\\"${player_name}\\\" ${date_range} )`;
    const payload = '{"query": "query{' + query + '{name playerId status planetsCount halfhourMeanActivity{ hours averageProgress } hourMeanActivity{ hours averageProgress } weekdayMeanActivity{ weekdays averageProgress } scoreDiff { datetime total economy research military ships militaryBuilt militaryDestroyed militaryLost honor} alliance { name tag } scores{ timestamp datetime total economy research  military  militaryBuilt  militaryDestroyed militaryLost honor }}}"}';
    const options = {
        method: 'POST',
        headers: {
          cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
          'Content-Type': 'application/json'
        },
        body: payload
      };
    return fetch("https://invictus.brunolcarli.repl.co/graphql/", options)
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
  const query = `player(name_Icontains: \\\"${player_name}\\\")`;
  const payload = '{"query": "query{' + query + '{planets{ galaxy solarSystem position name rawCoord }}}"}';
  const options = {
      method: 'POST',
      headers: {
        cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
        'Content-Type': 'application/json'
      },
      body: payload
    };
  return fetch("https://invictus.brunolcarli.repl.co/graphql/", options)
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
  const query = `player(name_Icontains: \\\"${player_name}\\\")`;
  const payload = '{"query": "query{' + query + '{name playerId status planetsCount alliance { name tag } scores{ total }}}"}';
  const options = {
      method: 'POST',
      headers: {
        cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
        'Content-Type': 'application/json'
      },
      body: payload
    };
  return fetch("https://invictus.brunolcarli.repl.co/graphql/", options)
  .then(json)
  .then(response => {
      let player_data = response['data']['player'];
      return player_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_player_score_prediction(player_name){
    const query = `player(name_Icontains: \\\"${player_name}\\\")`;
    const payload = '{"query": "query{' + query + '{name playerId status planetsCount alliance { name tag } scorePrediction{ sampleDates sampleScores futureDates scorePredictions lastPredictions { dates  predictions } } }}"}';
    const options = {
        method: 'POST',
        headers: {
          cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
          'Content-Type': 'application/json'
        },
        body: payload
      };
    return fetch("https://invictus.brunolcarli.repl.co/graphql/", options)
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
//         ALLY
//
///////////////////////////////////

function get_ally(ally_name){
  const query = `alliance(name_Icontains: \\\"${ally_name}\\\")`;
  const payload = '{"query": "query{' + query + '{name tag founder{ name } members{ name } planetsDistributionCoords{ galaxy solarSystem position rawCoord } planetsDistributionByGalaxy playersCount planetsCount shipsCount}}"}';
  const options = {
      method: 'POST',
      headers: {
        cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
        'Content-Type': 'application/json'
      },
      body: payload
    };
  return fetch("https://invictus.brunolcarli.repl.co/graphql/", options)
  .then(json)
  .then(response => {
      let ally_data = response['data']['alliance'];
      return ally_data;
  })
  .catch(err => {
      console.error(err);
  });
}


function get_universe_overview(){
  const payload = '{"query": "query{ players{ status rank planets{ galaxy solarSystem position rawCoord} } }"}';
  const options = {
      method: 'POST',
      headers: {
        cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
        'Content-Type': 'application/json'
      },
      body: payload
    };
  return fetch("https://invictus.brunolcarli.repl.co/graphql/", options)
  .then(json)
  .then(response => {
      let player_data = response['data']['players'];
      return player_data;
  })
  .catch(err => {
      console.error(err);
  });
}
