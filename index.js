const y2 = require("y2mate-api");
y2.GetVideo("https://www.youtube.com/watch?v=n__TMh4D4Do")
    .then(data => {
        console.log(data)
    })