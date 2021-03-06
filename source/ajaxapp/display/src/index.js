function getUserInfo(userId) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://api.github.com/users/${userId}`);
    request.addEventListener("load", (event) => {
        if (event.target.status !== 200) {
            console.log(`${event.target.status}: ${event.target.statusText}`);
            return;
        }

        const userInfo = JSON.parse(event.target.responseText);

        const view = escapeHTML`
        <h4>${userInfo.name} (@${userInfo.login})</h4>
        <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
        <dl>
            <dt>Location</dt>
            <dd>${userInfo.location}</dd>
            <dt>Repositries</dt>
            <dd>${userInfo.public_repos}</dd>
        </dl>
        `;

        const result = document.getElementById("result");
        result.innerHTML = view;
    });
    request.addEventListener("error", () => {
        console.error("Network Error");
    });
    request.send();
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.map((part, i) => {
        const value = values[i];
        if (value) {
            if (typeof value === "string") {
                return part + escapeSpecialChars(value);
            } else {
                return part + String(value);
            }
        } else {
            return part;
        }
    }).join("");
}
