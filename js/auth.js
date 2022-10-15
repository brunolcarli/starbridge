
function refresh_session(username, token){
    localStorage.setItem(
        'USER_TOKEN',
        JSON.stringify({username: username, token: token})
    );
}


function is_logged(){
    var user_data = JSON.parse(localStorage.getItem('USER_TOKEN'));
    if (!user_data){
        alert('Sessão expirada! Faça login no sistema para continuar nesta página.');
        localStorage.clear();
        window.location.href = '../index.html';
        return
    }
    refresh_user_token(user_data['token']).then(response => {
        refresh_session(user_data['username'], response['token']);
    });
    resolve_send_player_fleet_player_selection();
}


function log_in(){
    let username = document.getElementById('username_login_input').value;
    let password = document.getElementById('password_login_input').value;
    return login_mutation(username, password).then(data => {
        let token = data['token'];
        if (!token){
            alert('Usuário ou senha incorretos!');
            localStorage.clear();
            window.location.href = 'index.html';
            return
        }
        refresh_session(username, token);
        alert(`Login autenticado com sucesso para usuário ${username}`);
        window.location.href = 'index.html';
    });
}