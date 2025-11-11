
 async function getApi() {
    const username = document.getElementById('username').value;
    const repoList = document.getElementById('repo-list');

    repoList.innerHTML = '';

    if (!username) {
        repoList.innerHTML = '<li>Please, enter a username.</li>';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`User not found: ${response.status}`);
        }
        const data = await response.json();

        data.forEach(repo => {
            repoList.innerHTML += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
        });
    } catch (error) {
        repoList.innerHTML = `<li>Error when fetching repositories: ${error.message}</li>`;
    }
}