
 async function getApi() {
    const username = document.getElementById('username').value;
    const userProfile = document.getElementById('user-profile');
    const repoList = document.getElementById('repo-list');

    userProfile.innerHTML = '';
    repoList.innerHTML = '';

    if (!username) {
        repoList.innerHTML = '<li>Por favor, digite um nome de usuário.</li>';
        return;
    }

    repoList.innerHTML = '<li>Carregando...</li>';

    try {
        const [userResponse, repoResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos`)
        ]);

        if (!userResponse.ok) {
            throw new Error(`Usuário não encontrado: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        const repoData = await repoResponse.json();

        userProfile.innerHTML = `
            <img src="${userData.avatar_url}" alt="${userData.name}" class="avatar" />
            <div class="user-info">
                <a href="${userData.html_url}" target="_blank" class="profile-link">
                    <h2 class="user-name">${userData.name || userData.login}</h2>
                    <p class="user-login">@${userData.login}</p>
                </a>
                <p class="user-bio">${userData.bio || ''}</p>
                <p class="repo-count">🌟 ${userData.public_repos} repositórios públicos</p> 
            </div>
        `;

        repoList.innerHTML = '';
        repoData.forEach(repo => {
            repoList.innerHTML += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
        });
    } catch (error) {
        userProfile.innerHTML = ''; 
        repoList.innerHTML = `<li>Erro ao buscar dados: ${error.message}</li>`;
    }
}