// Variables

// Screen
let canvasSize = [440, 440],
    width = canvasSize[0],
    height = canvasSize[1];

// Coordinates indexes
let X = 0,
    Y = 1;

// Colors
let backgroundColor = [0, 0, 0];

// Flocking Simulation
let amountBoids = 100,
    debug = false,
    flock,
    group,
    groups;

// Settings interactions
let simulationContainer = document.getElementById("simulationContainer"),
    optionsGroup = document.getElementById("group"),
    playOneFrame = document.getElementById("1Frame"),
    groupSelect = document.getElementById("groupSelect");

// Settings

// Group settings

// Color
let groupColor = document.getElementById("groupColor");

// Size
let groupSizeSlider = document.getElementById("groupSizeSlider"),
    groupSizeInput = document.getElementById("groupSizeInput"),
    groupSizeValueText = document.getElementById("groupSizeValue");

// Force
let groupForceSlider = document.getElementById("groupForceSlider"),
    groupForceInput = document.getElementById("groupForceInput"),
    groupForceValueText = document.getElementById("groupForceValue");

// Speed
let groupSpeedSlider = document.getElementById("groupSpeedSlider"),
    groupSpeedInput = document.getElementById("groupSpeedInput"),
    groupSpeedValueText = document.getElementById("groupSpeedValue");

// AlignSight
let groupAlignSightSlider = document.getElementById("groupAlignSightSlider"),
    groupAlignSightInput = document.getElementById("groupAlignSightInput"),
    groupAlignSightValueText = document.getElementById("groupAlignSightValue");

// CohesionSight
let groupCohesionSightSlider = document.getElementById("groupCohesionSightSlider"),
    groupCohesionSightInput = document.getElementById("groupCohesionSightInput"),
    groupCohesionSightValueText = document.getElementById("groupCohesionSightValue");

// SeparationSight
let groupSeparationSightSlider = document.getElementById("groupSeparationSightSlider"),
    groupSeparationSightInput = document.getElementById("groupSeparationSightInput"),
    groupSeparationSightValueText = document.getElementById(
        "groupSeparationSightValue",
    );

// Add custom settings

// Color
let addCustomColor = document.getElementById("addCustomColor");

// Size
let addCustomSizeSlider = document.getElementById("addCustomSizeSlider"),
    addCustomSizeInput = document.getElementById("addCustomSizeInput"),
    addCustomSizeValueText = document.getElementById("addCustomSizeValue");

// Force
let addCustomForceSlider = document.getElementById("addCustomForceSlider"),
    addCustomForceInput = document.getElementById("addCustomForceInput"),
    addCustomForceValueText = document.getElementById("addCustomForceValue");

// Speed
let addCustomSpeedSlider = document.getElementById("addCustomSpeedSlider"),
    addCustomSpeedInput = document.getElementById("addCustomSpeedInput"),
    addCustomSpeedValueText = document.getElementById("addCustomSpeedValue");

// AlignSight
let addCustomAlignSightSlider = document.getElementById("addCustomAlignSightSlider"),
    addCustomAlignSightInput = document.getElementById("addCustomAlignSightInput"),
    addCustomAlignSightValueText = document.getElementById("addCustomAlignSightValue");

// CohesionSight
let addCustomCohesionSightSlider = document.getElementById(
        "addCustomCohesionSightSlider",
    ),
    addCustomCohesionSightInput = document.getElementById(
        "addCustomCohesionSightInput",
    ),
    addCustomCohesionSightValueText = document.getElementById(
        "addCustomCohesionSightValue",
    );

// SeparationSight
let addCustomSeparationSightSlider = document.getElementById(
        "addCustomSeparationSightSlider",
    ),
    addCustomSeparationSightInput = document.getElementById(
        "addCustomSeparationSightInput",
    ),
    addCustomSeparationSightValueText = document.getElementById(
        "addCustomSeparationSightValue",
    );

// Amount
let addCustomAmountSlider = document.getElementById("addCustomAmountSlider"),
    addCustomAmountInput = document.getElementById("addCustomAmountInput"),
    addCustomAmountValueText = document.getElementById("addCustomAmountValue");

// Functions

// Round a number to 2 decimals
function rounded(number) {
    return Math.round(number * 100) / 100;
}

// Updates a value in a boid
function updateBoid(boid, variable, value) {
    eval(`boid.${variable} = ${value}`);
}

// Play and Pause the render in the canvas
function pauseRender(event) {
    let action = event.target.innerHTML;
    if (action === "Pause") {
        noLoop();
        event.target.innerHTML = "Play";
        playOneFrame.style.display = "";
    } else if (action === "Play") {
        loop();
        event.target.innerHTML = "Pause";
        playOneFrame.style.display = "none";
    }
}

// Show debug visuals
function showDebug() {
    if (debug) {
        debug = false;
    } else if (!debug) {
        debug = true;
    }
}

// Add custom boids
function addBoids() {
    let color = addCustomColor.value,
        size = rounded(addCustomSizeInput.value),
        force = rounded(addCustomForceInput.value),
        speed = rounded(addCustomSpeedInput.value),
        alignSight = rounded(addCustomAlignSightInput.value),
        cohesionSight = rounded(addCustomCohesionSightInput.value),
        separationSight = rounded(addCustomSeparationSightInput.value),
        amount = rounded(addCustomAmountInput.value),
        group = [];

    for (let _ = 0; _ < amount; _++) {
        let newBoid = new Boid();
        newBoid.size = size;
        newBoid.color = color;
        newBoid.force = force;
        newBoid.speed = speed;
        newBoid.alignSight = alignSight;
        newBoid.cohesionSight = cohesionSight;
        newBoid.separationSight = separationSight;
        group.push(newBoid);
    }
    flock.push(group);
    groups++;
    groupSelect.innerHTML += `<option value="${groups}">Group ${groups + 1}</option>`;
}

// Default P5.js functions

function setup() {
    // Setup canvas
    let canvas = createCanvas(width, height);
    canvas.parent(simulationContainer);
    background(backgroundColor);
    noFill();

    // Set sliders to default
    let defaultValues = new Boid();

    // Group reset
    groupColor.value = defaultValues.color;
    groupSizeSlider.value = defaultValues.size;
    groupForceSlider.value = defaultValues.force;
    groupSpeedSlider.value = defaultValues.speed;
    groupAlignSightSlider.value = defaultValues.alignSight;
    groupCohesionSightSlider.value = defaultValues.cohesionSight;
    groupSeparationSightSlider.value = defaultValues.separationSight;

    groupSizeInput.value = defaultValues.size;
    groupForceInput.value = defaultValues.force;
    groupSpeedInput.value = defaultValues.speed;
    groupAlignSightInput.value = defaultValues.alignSight;
    groupCohesionSightInput.value = defaultValues.cohesionSight;
    groupSeparationSightInput.value = defaultValues.separationSight;

    groupSizeValueText.innerHTML = defaultValues.size;
    groupForceValueText.innerHTML = defaultValues.force;
    groupSpeedValueText.innerHTML = defaultValues.speed;
    groupAlignSightValueText.innerHTML = defaultValues.alignSight;
    groupCohesionSightValueText.innerHTML = defaultValues.cohesionSight;
    groupSeparationSightValueText.innerHTML = defaultValues.separationSight;

    addCustomColor.value = defaultValues.color;
    addCustomSizeSlider.value = defaultValues.size;
    addCustomForceSlider.value = defaultValues.force;
    addCustomSpeedSlider.value = defaultValues.speed;
    addCustomAmountSlider.value = amountBoids;
    addCustomAlignSightSlider.value = defaultValues.alignSight;
    addCustomCohesionSightSlider.value = defaultValues.cohesionSight;
    addCustomSeparationSightSlider.value = defaultValues.separationSight;

    addCustomSizeInput.value = defaultValues.size;
    addCustomForceInput.value = defaultValues.force;
    addCustomSpeedInput.value = defaultValues.speed;
    addCustomAmountInput.value = amountBoids;
    addCustomAlignSightInput.value = defaultValues.alignSight;
    addCustomCohesionSightInput.value = defaultValues.cohesionSight;
    addCustomSeparationSightInput.value = defaultValues.separationSight;

    addCustomSizeValueText.innerHTML = defaultValues.size;
    addCustomForceValueText.innerHTML = defaultValues.force;
    addCustomSpeedValueText.innerHTML = defaultValues.speed;
    addCustomAmountValueText.innerHTML = amountBoids;
    addCustomAlignSightValueText.innerHTML = defaultValues.alignSight;
    addCustomCohesionSightValueText.innerHTML = defaultValues.cohesionSight;
    addCustomSeparationSightValueText.innerHTML = defaultValues.separationSight;

    groups = 0;
    groupSelect.innerHTML = `<option value="${groups}">Group ${groups + 1}</option>`;

    // Generate a flock
    flock = [];
    group = [];
    for (let i = 0; i < amountBoids; i++) {
        group.push(new Boid());
    }
    flock.push(group);
}

function draw() {
    background(backgroundColor);

    // Calculate updates in movement
    for (let i = 0; i < flock.length; i++) {
        group = flock[i];
        for (let j = 0; j < group.length; j++) {
            let boid = group[j];
            boid.wrapAround();
            boid.flock(flock);
        }
    }

    // Update and move the boids
    for (let i = 0; i < flock.length; i++) {
        group = flock[i];
        for (let j = 0; j < group.length; j++) {
            let boid = group[j];
            boid.updateMovement();
            boid.draw(debug);
        }
    }
}

// Event listener handlers

// Group settings

// Select
function groupSelectEventHandler(event) {
    values = flock[event.target.value][0];
    groupColor.value = values.color;
    groupSizeValueText.innerHTML = values.size;
    groupForceValueText.innerHTML = values.force;
    groupSpeedValueText.innerHTML = values.speed;
    groupAlignSightValueText.innerHTML = values.alignSight;
    groupCohesionSightValueText.innerHTML = values.cohesionSight;
    groupSeparationSightValueText.innerHTML = values.separationSight;
    groupSizeSlider.value = values.size;
    groupForceSlider.value = values.force;
    groupSpeedSlider.value = values.speed;
    groupAlignSightSlider.value = values.alignSight;
    groupCohesionSightSlider.value = values.cohesionSight;
    groupSeparationSightSlider.value = values.separationSight;
    groupSizeInput.value = values.size;
    groupForceInput.value = values.force;
    groupSpeedInput.value = values.speed;
    groupAlignSightInput.value = values.alignSight;
    groupCohesionSightInput.value = values.cohesionSight;
    groupSeparationSightInput.value = values.separationSight;
    addCustomColor.value = values.color;
    addCustomSizeValueText.innerHTML = values.size;
    addCustomForceValueText.innerHTML = values.force;
    addCustomSpeedValueText.innerHTML = values.speed;
    addCustomAlignSightValueText.innerHTML = values.alignSight;
    addCustomCohesionSightValueText.innerHTML = values.cohesionSight;
    addCustomSeparationSightValueText.innerHTML = values.separationSight;
    addCustomSizeSlider.value = values.size;
    addCustomForceSlider.value = values.force;
    addCustomSpeedSlider.value = values.speed;
    addCustomAlignSightSlider.value = values.alignSight;
    addCustomCohesionSightSlider.value = values.cohesionSight;
    addCustomSeparationSightSlider.value = values.separationSight;
    addCustomSizeInput.value = values.size;
    addCustomForceInput.value = values.force;
    addCustomSpeedInput.value = values.speed;
    addCustomAlignSightInput.value = values.alignSight;
    addCustomCohesionSightInput.value = values.cohesionSight;
    addCustomSeparationSightInput.value = values.separationSight;
}

// Color
function groupColorEventHandler(event) {
    let groupColorValue = event.target.value,
        groupIndex = groupSelect.value;
    for (let i = 0; i < flock[groupIndex].length; i++) {
        boid = flock[groupIndex][i];
        updateBoid(boid, "color", `"${groupColorValue}"`);
    }
}

// Size
function groupSizeEventHandler(event) {
    let groupSizeValue = rounded(event.target.value);
    groupSizeValueText.innerHTML = groupSizeValue;
    groupSizeSlider.value = groupSizeValue;
    groupSizeInput.value = groupSizeValue;
    groupIndex = groupSelect.value;
    for (let i = 0; i < flock[groupIndex].length; i++) {
        boid = flock[groupIndex][i];
        updateBoid(boid, "size", groupSizeValue);
    }
}

// Force
function groupForceEventHandler(event) {
    let groupForceValue = rounded(event.target.value);
    groupForceValueText.innerHTML = groupForceValue;
    groupForceSlider.value = groupForceValue;
    groupForceInput.value = groupForceValue;
    groupIndex = groupSelect.value;
    for (let i = 0; i < flock[groupIndex].length; i++) {
        boid = flock[groupIndex][i];
        updateBoid(boid, "force", groupForceValue);
    }
}

// Speed
function groupSpeedEventHandler(event) {
    let groupSpeedValue = rounded(event.target.value);
    groupSpeedValueText.innerHTML = groupSpeedValue;
    groupSpeedSlider.value = groupSpeedValue;
    groupSpeedInput.value = groupSpeedValue;
    groupIndex = groupSelect.value;
    for (let i = 0; i < flock[groupIndex].length; i++) {
        boid = flock[groupIndex][i];
        updateBoid(boid, "speed", groupSpeedValue);
    }
}

// Align sight
function groupAlignSightEventHandler(event) {
    let groupAlignSightValue = rounded(event.target.value);
    groupAlignSightValueText.innerHTML = groupAlignSightValue;
    groupAlignSightSlider.value = groupAlignSightValue;
    groupAlignSightInput.value = groupAlignSightValue;
    groupIndex = groupSelect.value;
    for (let i = 0; i < flock[groupIndex].length; i++) {
        boid = flock[groupIndex][i];
        updateBoid(boid, "alignSight", groupAlignSightValue);
    }
}

// Cohesion sight
function groupCohesionSightEventHandler(event) {
    let groupCohesionSightValue = rounded(event.target.value);
    groupCohesionSightValueText.innerHTML = groupCohesionSightValue;
    groupCohesionSightSlider.value = groupCohesionSightValue;
    groupCohesionSightInput.value = groupCohesionSightValue;
    groupIndex = groupSelect.value;
    for (let i = 0; i < flock[groupIndex].length; i++) {
        boid = flock[groupIndex][i];
        updateBoid(boid, "cohesionSight", groupCohesionSightValue);
    }
}

function groupSeparationSightEventHandler(event) {
    let groupSeparationSightValue = rounded(event.target.value);
    groupSeparationSightValueText.innerHTML = groupSeparationSightValue;
    groupSeparationSightSlider.value = groupSeparationSightValue;
    groupSeparationSightInput.value = groupSeparationSightValue;
    groupIndex = groupSelect.value;
    for (let i = 0; i < flock[groupIndex].length; i++) {
        boid = flock[groupIndex][i];
        updateBoid(boid, "separationSight", groupSeparationSightValue);
    }
}

// Add custom

// Size
function addCustomSizeEventHandler(event) {
    let addCustomSizeValue = rounded(event.target.value);
    addCustomSizeValueText.innerHTML = addCustomSizeValue;
    addCustomSizeSlider.value = addCustomSizeValue;
    addCustomSizeInput.value = addCustomSizeValue;
}

// Force
function addCustomForceEventHandler(event) {
    let addCustomForceValue = rounded(event.target.value);
    addCustomForceValueText.innerHTML = addCustomForceValue;
    addCustomForceSlider.value = addCustomForceValue;
    addCustomForceInput.value = addCustomForceValue;
}

// Speed
function addCustomSpeedEventHandler(event) {
    let addCustomSpeedValue = rounded(event.target.value);
    addCustomSpeedValueText.innerHTML = addCustomSpeedValue;
    addCustomSpeedSlider.value = addCustomSpeedValue;
    addCustomSpeedInput.value = addCustomSpeedValue;
}

function addCustomAmountEventHandler(event) {
    let addCustomAmountValue = round(event.target.value);
    addCustomAmountValueText.innerHTML = addCustomAmountValue;
    addCustomAmountSlider.value = addCustomAmountValue;
    addCustomAmountInput.value = addCustomAmountValue;
}

// Align sight
function addCustomAlignSightEventHandler(event) {
    let addCustomAlignSightValue = rounded(event.target.value);
    addCustomAlignSightValueText.innerHTML = addCustomAlignSightValue;
    addCustomAlignSightSlider.value = addCustomAlignSightValue;
    addCustomAlignSightInput.value = addCustomAlignSightValue;
}

// Cohesion sight
function addCustomCohesionSightEventHandler(event) {
    let addCustomCohesionSightValue = rounded(event.target.value);
    addCustomCohesionSightValueText.innerHTML = addCustomCohesionSightValue;
    addCustomCohesionSightSlider.value = addCustomCohesionSightValue;
    addCustomCohesionSightInput.value = addCustomCohesionSightValue;
}

function addCustomSeparationSightEventHandler(event) {
    let addCustomSeparationSightValue = rounded(event.target.value);
    addCustomSeparationSightValueText.innerHTML = addCustomSeparationSightValue;
    addCustomSeparationSightSlider.value = addCustomSeparationSightValue;
    addCustomSeparationSightInput.value = addCustomSeparationSightValue;
}

// Code

// Event listeners

// Group settings

// Select
groupSelect.addEventListener("change", (event) => groupSelectEventHandler(event));

// Color
groupColor.addEventListener("change", (event) => groupColorEventHandler(event));

// Size
groupSizeSlider.addEventListener("change", (event) => groupSizeEventHandler(event));
groupSizeInput.addEventListener("change", (event) => groupSizeEventHandler(event));

// Force
groupForceSlider.addEventListener("change", (event) => groupForceEventHandler(event));
groupForceInput.addEventListener("change", (event) => groupForceEventHandler(event));

// Speed
groupSpeedSlider.addEventListener("change", (event) => groupSpeedEventHandler(event));
groupSpeedInput.addEventListener("change", (event) => groupSpeedEventHandler(event));

// Align sight
groupAlignSightSlider.addEventListener("change", (event) =>
    groupAlignSightEventHandler(event),
);
groupAlignSightInput.addEventListener("change", (event) =>
    groupAlignSightEventHandler(event),
);

// Cohesion sight
groupCohesionSightSlider.addEventListener("change", (event) =>
    groupCohesionSightEventHandler(event),
);
groupCohesionSightInput.addEventListener("change", (event) =>
    groupCohesionSightEventHandler(event),
);

// SeparationSight
groupSeparationSightSlider.addEventListener("change", (event) =>
    groupSeparationSightEventHandler(event),
);
groupSeparationSightInput.addEventListener("change", (event) =>
    groupSeparationSightEventHandler(event),
);

// Add custom settings

// Size
addCustomSizeSlider.addEventListener("change", (event) =>
    addCustomSizeEventHandler(event),
);
addCustomSizeInput.addEventListener("change", (event) =>
    addCustomSizeEventHandler(event),
);

// Force
addCustomForceSlider.addEventListener("change", (event) =>
    addCustomForceEventHandler(event),
);
addCustomForceInput.addEventListener("change", (event) =>
    addCustomForceEventHandler(event),
);

// Speed
addCustomSpeedSlider.addEventListener("change", (event) =>
    addCustomSpeedEventHandler(event),
);
addCustomSpeedInput.addEventListener("change", (event) =>
    addCustomSpeedEventHandler(event),
);

// Amount
addCustomAmountSlider.addEventListener("change", (event) =>
    addCustomAmountEventHandler(event),
);
addCustomAmountInput.addEventListener("change", (event) =>
    addCustomAmountEventHandler(event),
);

// Align sight
addCustomAlignSightSlider.addEventListener("change", (event) =>
    addCustomAlignSightEventHandler(event),
);
addCustomAlignSightInput.addEventListener("change", (event) =>
    addCustomAlignSightEventHandler(event),
);

// Cohesion sight
addCustomCohesionSightSlider.addEventListener("change", (event) =>
    addCustomCohesionSightEventHandler(event),
);
addCustomCohesionSightInput.addEventListener("change", (event) =>
    addCustomCohesionSightEventHandler(event),
);

// SeparationSight
addCustomSeparationSightSlider.addEventListener("change", (event) =>
    addCustomSeparationSightEventHandler(event),
);
addCustomSeparationSightInput.addEventListener("change", (event) =>
    addCustomSeparationSightEventHandler(event),
);

// TODO add mouse interaction (If possible)
// TODO add walls of some kind
// TODO add tile system
// TODO add parameters in the url bar ?speed=x with export button
// TODO add recording https://editor.p5js.org/doriclaudino/sketches/LgLw5UaBr
// TODO add Classes (enemy/boid) If class of other is enemy just separate don't align nor cohesion
