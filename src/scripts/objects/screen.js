const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
            <img src="${user.avatarUrl}" alt="User's profile picture" />
            <div class="data">
                <h1>${user.name ?? "There's no name registered 😥"}</h1>
                <p>${user.bio ?? "There's no bio registered 😥"}</p>
                <p>Followers: ${user.followers}</p>
                <p>Following: ${user.following}</p>
            </div>
        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            if(repo.language === null){
                repositoriesItens += `<li><a href="${repo.html_url}" target="_blank"><span class="repo-name">${repo.name}</span>
                                                                    <ul class="repo-infos">
                                                                        <li class="repo-info">🔱${repo.forks}</li>
                                                                        <li class="repo-info">⭐${repo.stargazers_count}</li>
                                                                        <li class="repo-info">👓${repo.watchers}</li>
                                                                    </ul>
                                                                </a></li>`
            } else {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank"><span class="repo-name">${repo.name}</span>
                                                                    <ul class="repo-infos">
                                                                        <li class="repo-info">🔱${repo.forks}</li>
                                                                        <li class="repo-info">⭐${repo.stargazers_count}</li>
                                                                        <li class="repo-info">👓${repo.watchers}</li>
                                                                        <li class="repo-info">⌨${repo.language}</li>
                                                                    </ul>
                                                                </a></li>`
            }})

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositories</h2>
                                            <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventsItems = ''
        user.events.forEach(event => {
            if (event.type === "CreateEvent") {
                eventsItems += `<li>${event.repo.name}<span class="event-message"> - No commit message.</span></li>`
            } else if (event.type === "PushEvent") {
                eventsItems += `<li>${event.repo.name}<span class="event-message"> - ${event.payload.commits[0].message}</span></li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Events</h2>
                                                <ul>${eventsItems}</ul>
                                               </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>User not found</h3>"
    }
}

export { screen }