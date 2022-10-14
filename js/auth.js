

function is_logged(){
    const user_data = localStorage.getItem('USER_TOKEN');
    if (!user_data){
        alert('Not logged in! Please log in to continue.');
        window.location.href = '../index.html';
    }
}


function log_in(){
    let username = document.getElementById('username_login_input').value;
    let password = document.getElementById('password_login_input').value;
    return login_mutation(username, password).then(data => {
        let token = data['token'];
        if (!token){
            alert('Usuário ou senha incorretos!');
            return
        }
        localStorage.setItem('USER_TOKEN', {username: username, token: token});
        alert(`Login autenticado com sucesso para usuário ${username}`);
    });
}