export function fetchMembers(){
    return fetch("https://api.github.com/orgs/emberjs/members").then((response) => {
        if(response.status >= 400){
            return Promise.reject("There was a problem with loading the members.")
        }
        return response.json();
    });
}

export function fetchMember(login){
    return fetch(`https://api.github.com/users/${login}`).then((response) => {
        if(response.status >= 400){
            return Promise.reject("There was a problem with loading the specified member.")
        }
        return response.json();
    });
}

export function fetchRepos(login){
    
    return fetch(`https://api.github.com/users/${login}/repos`).then((response) => {
        if(response.status >= 400){
            return Promise.reject("There was a problem with loading the specified member.")
        }
        return response.json();
    });

}

export function fetchFavorites(){
    return fetch("/api/members").then((response) => {
        if(response.status >= 400){
            return Promise.reject("There was a problem with loading the members.")
        }
        return response.json();
    });
}

export function addFavorite(obj){
    return fetch("/api/members", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.json();
    });
}

export function removeFavorite(id){
    return fetch(`/api/members/${id}`, {
        method: "DELETE",
    });
}