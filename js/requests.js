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
