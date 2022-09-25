function json(response) {
    return response.json()
};


function get_player(player_name){
    const query = `players(name_Icontains: \\\"${player_name}\\\")`;
    const payload = '{"query": "query{' + query + '{name playerId status planets halfhourMeanActivity{ hours averageProgress } hourMeanActivity{ hours averageProgress } weekdayMeanActivity{ weekdays averageProgress } scoreDiff { datetime total economy research military ships militaryBuilt militaryDestroyed militaryLost honor} alliance { name tag } scores{ timestamp datetime total economy research  military  militaryBuilt  militaryDestroyed militaryLost honor }}}"}';
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
        let player_data = response['data']['players'].values().next().value;
        console.log(player_data);
        return player_data;
    })
    .catch(err => {
        console.error(err);
    });
}
