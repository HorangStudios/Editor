var stargazer = []
fetch("https://api.github.com/repos/HorangStudios/Editor/stargazers")
    .then(response => response.json())
    .then(data => {
        const stargazers = data.map(stargazer => stargazer.login);
        stargazer = stargazers
    });


function showabout() {
    window.alert(
        'Horang Hill Editor Beta 3\n' +
        '\u00A9 2023 Horang Studios\n\n' +
        "Special Thanks to: " +
        JSON.stringify(stargazer, null , 2)
    )
}