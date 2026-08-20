/* ==============================
TICKER
============================== */

document.querySelectorAll(".ticker-track").forEach(track => {

    // Duplicate ONCE only
    [...track.children].forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

});


/* ==============================
PAUSE TICKERS OFFSCREEN
============================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        const track = entry.target.querySelector(".ticker-track");

        if (!track) return;

        track.style.animationPlayState =
            entry.isIntersecting ? "running" : "paused";

    });

}, {
    threshold: 0.1
});


document.querySelectorAll(".ticker").forEach(ticker => {
    observer.observe(ticker);
});
/* ==============================
WORLD MAP BACKGROUND
============================== */

const section = document.querySelector(".stats");
const canvas = section.querySelector("#stats-grid");
const ctx = canvas.getContext("2d");

let mouse = {
    x: -9999,
    y: -9999
};

let animationTime = 0;


/* ==============================
DETAILED WORLD MAP
============================== */

const continents = [

    /* ==============================
       NORTH AMERICA
    ============================== */

    [
        [7, 27],
        [9, 23],
        [13, 20],
        [17, 18],
        [21, 19],
        [25, 22],
        [27, 26],
        [29, 30],
        [27, 34],
        [24, 37],
        [22, 40],
        [21, 44],
        [19, 47],
        [16, 46],
        [14, 43],
        [12, 41],
        [10, 38],
        [8, 37],
        [7, 34],
        [6, 31]
    ],


    /* ==============================
       GREENLAND
    ============================== */

    [
        [30, 11],
        [35, 8],
        [40, 10],
        [42, 15],
        [39, 20],
        [34, 21],
        [30, 18],
        [28, 14]
    ],


    /* ==============================
       SOUTH AMERICA
    ============================== */

    [
        [28, 48],
        [31, 50],
        [34, 54],
        [35, 59],
        [34, 64],
        [32, 69],
        [30, 74],
        [28, 80],
        [26, 84],
        [24, 80],
        [25, 75],
        [25, 69],
        [24, 63],
        [23, 58],
        [25, 53]
    ],


    /* ==============================
       EUROPE
    ============================== */

    [
        [44, 27],
        [47, 24],
        [50, 23],
        [53, 24],
        [55, 22],
        [58, 24],
        [60, 27],
        [58, 30],
        [55, 31],
        [53, 34],
        [49, 33],
        [47, 31],
        [44, 31]
    ],


    /* ==============================
       SCANDINAVIA
    ============================== */

    [
        [54, 23],
        [56, 18],
        [59, 15],
        [61, 17],
        [60, 22],
        [58, 26],
        [56, 28]
    ],


    /* ==============================
       AFRICA
    ============================== */

    [
        [45, 36],
        [49, 35],
        [53, 37],
        [56, 40],
        [58, 45],
        [58, 51],
        [56, 57],
        [54, 63],
        [51, 68],
        [48, 65],
        [45, 60],
        [43, 55],
        [42, 49],
        [43, 43]
    ],


    /* ==============================
       ASIA
    ============================== */

    [
        [57, 24],
        [61, 21],
        [66, 18],
        [72, 18],
        [77, 20],
        [82, 23],
        [87, 27],
        [92, 31],
        [94, 35],
        [91, 39],
        [87, 40],
        [83, 38],
        [79, 39],
        [75, 42],
        [71, 43],
        [68, 40],
        [64, 38],
        [60, 36],
        [57, 32],
        [54, 29]
    ],


    /* ==============================
       ARABIAN PENINSULA
    ============================== */

    [
        [66, 39],
        [71, 39],
        [76, 43],
        [78, 48],
        [75, 53],
        [70, 51],
        [67, 47],
        [64, 43]
    ],


    /* ==============================
       INDIA
    ============================== */

    [
        [69, 43],
        [73, 45],
        [76, 49],
        [74, 53],
        [71, 57],
        [68, 53],
        [67, 48]
    ],


    /* ==============================
       SOUTHEAST ASIA
    ============================== */

    [
        [76, 49],
        [80, 51],
        [82, 56],
        [80, 61],
        [77, 60],
        [76, 55]
    ],


    /* ==============================
       JAPAN
    ============================== */

    [
        [89, 38],
        [92, 40],
        [93, 43],
        [91, 47],
        [89, 45],
        [90, 42]
    ],


    /* ==============================
       AUSTRALIA
    ============================== */

    [
        [78, 68],
        [82, 66],
        [87, 67],
        [91, 70],
        [94, 74],
        [93, 79],
        [89, 82],
        [84, 82],
        [80, 79],
        [77, 75]
    ],


    /* ==============================
       NEW ZEALAND
    ============================== */

    [
        [95, 76],
        [97, 78],
        [96, 82],
        [94, 81]
    ]

];


/* ==============================
GLOBAL CITY NODES
============================== */

const cities = [

    {
        name: "Riyadh",
        x: 72,
        y: 46,
        size: 4
    },

    {
        name: "London",
        x: 51,
        y: 27,
        size: 3
    },

    {
        name: "New York",
        x: 23,
        y: 34,
        size: 3
    },

    {
        name: "Toronto",
        x: 20,
        y: 27,
        size: 2.5
    },

    {
        name: "Dubai",
        x: 76,
        y: 47,
        size: 3
    },

    {
        name: "Mumbai",
        x: 67,
        y: 52,
        size: 3
    },

    {
        name: "Singapore",
        x: 78,
        y: 67,
        size: 2.5
    },

    {
        name: "Tokyo",
        x: 91,
        y: 40,
        size: 3
    },

    {
        name: "Sydney",
        x: 91,
        y: 77,
        size: 2.5
    },

    {
        name: "São Paulo",
        x: 32,
        y: 69,
        size: 2.5
    }

];


/* ==============================
CONNECTIONS
============================== */

const connections = [

    ["Riyadh", "London"],
    ["Riyadh", "Dubai"],
    ["Riyadh", "Mumbai"],
    ["Riyadh", "Singapore"],

    ["London", "New York"],
    ["London", "Toronto"],

    ["New York", "São Paulo"],

    ["Mumbai", "Singapore"],
    ["Singapore", "Tokyo"],

    ["Singapore", "Sydney"]

];


/* ==============================
RESIZE
============================== */

function resizeCanvas() {

    const dpr =
        window.devicePixelRatio || 1;

    const width =
        section.clientWidth;

    const height =
        section.clientHeight;


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


new ResizeObserver(
    resizeCanvas
).observe(section);


/* ==============================
MOUSE
============================== */

section.addEventListener(
    "mousemove",
    e => {

        const rect =
            section.getBoundingClientRect();


        mouse.x =
            e.clientX -
            rect.left;

        mouse.y =
            e.clientY -
            rect.top;

    }
);


section.addEventListener(
    "mouseleave",
    () => {

        mouse.x = -9999;
        mouse.y = -9999;

    }
);


/* ==============================
CITY LOOKUP
============================== */

function getCity(name) {

    return cities.find(
        city =>
            city.name === name
    );

}


/* ==============================
DRAW
============================== */

function draw() {

    const width =
        section.clientWidth;

    const height =
        section.clientHeight;


    animationTime += 0.01;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* ==============================
       MAP POSITION
    ============================== */

    let mapOffsetX = 0;
    let mapOffsetY = 0;



    /* ==============================
       CONTINENTS
    ============================== */

    continents.forEach(
        continent => {

            ctx.beginPath();


            continent.forEach(
                (point, index) => {

                    const x =
                        point[0] / 100 *
                        width +
                        mapOffsetX;

                    const y =
                        point[1] / 100 *
                        height +
                        mapOffsetY;


                    if (index === 0) {

                        ctx.moveTo(
                            x,
                            y
                        );

                    } else {

                        ctx.lineTo(
                            x,
                            y
                        );

                    }

                }
            );


            ctx.closePath();


            /* Subtle landmass */

            ctx.fillStyle =
                "rgba(255,255,255,0.018)";

            ctx.fill();


            /* Very faint outline */

            ctx.strokeStyle =
                "rgba(255,255,255,0.035)";

            ctx.lineWidth = 1;

            ctx.stroke();

        }
    );


    /* ==============================
       CITY COORDINATES
    ============================== */

    const positions = {};


    cities.forEach(city => {

        positions[city.name] = {

            x:
                city.x / 100 *
                width +
                mapOffsetX,

            y:
                city.y / 100 *
                height +
                mapOffsetY

        };

    });


    /* ==============================
       CONNECTION LINES
    ============================== */

    connections.forEach(
        connection => {

            const from =
                positions[
                    connection[0]
                ];

            const to =
                positions[
                    connection[1]
                ];


            if (!from || !to)
                return;


            /*
                Curved connection line.
            */

            const centerX =
                (from.x + to.x) / 2;

            const centerY =
                (from.y + to.y) / 2;


            const distance =
                Math.hypot(
                    to.x - from.x,
                    to.y - from.y
                );


            const curve =
                Math.min(
                    distance * 0.18,
                    80
                );


            ctx.beginPath();

            ctx.moveTo(
                from.x,
                from.y
            );


            ctx.quadraticCurveTo(

                centerX,

                centerY - curve,

                to.x,

                to.y

            );


            ctx.strokeStyle =
                "rgba(254,209,96,0.09)";

            ctx.lineWidth = 1;

            ctx.stroke();

        }
    );


    /* ==============================
       CITY NODES
    ============================== */

    cities.forEach(city => {

        const position =
            positions[city.name];


        if (!position)
            return;


        /*
            Very subtle pulsing.
        */

        const pulse =
            0.75 +
            Math.sin(
                animationTime * 1.2 +
                city.x
            ) *
            0.25;


        /* ==============================
           OUTER GLOW
        ============================== */

        const glowRadius =
            city.size *
            6 *
            pulse;


        const glow =
            ctx.createRadialGradient(

                position.x,
                position.y,
                0,

                position.x,
                position.y,
                glowRadius

            );


        glow.addColorStop(
            0,
            `rgba(
                254,
                209,
                96,
                ${0.18 * pulse}
            )`
        );


        glow.addColorStop(
            1,
            "rgba(254,209,96,0)"
        );


        ctx.beginPath();

        ctx.fillStyle =
            glow;

        ctx.arc(

            position.x,
            position.y,

            glowRadius,

            0,
            Math.PI * 2

        );

        ctx.fill();


        /* ==============================
           NODE
        ============================== */

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(
                254,
                209,
                96,
                ${0.45 * pulse}
            )`;

        ctx.arc(

            position.x,
            position.y,

            city.size,

            0,
            Math.PI * 2

        );

        ctx.fill();

    });


    /* ==============================
       RIYADH EMPHASIS
    ============================== */

    const riyadh =
        positions["Riyadh"];


    if (riyadh) {

        const radius =
            18 +
            Math.sin(
                animationTime * 1.5
            ) *
            3;


        const riyadhGlow =
            ctx.createRadialGradient(

                riyadh.x,
                riyadh.y,
                0,

                riyadh.x,
                riyadh.y,
                radius

            );


        riyadhGlow.addColorStop(
            0,
            "rgba(255,230,150,0.22)"
        );


        riyadhGlow.addColorStop(
            0.35,
            "rgba(254,209,96,0.08)"
        );


        riyadhGlow.addColorStop(
            1,
            "rgba(254,209,96,0)"
        );


        ctx.beginPath();

        ctx.fillStyle =
            riyadhGlow;

        ctx.arc(

            riyadh.x,
            riyadh.y,

            radius,

            0,
            Math.PI * 2

        );

        ctx.fill();

    }



    requestAnimationFrame(draw);

}


draw();