var gameData = {
    stuff: 0,
    totalStuff: 0,
    stuffPerClick: 1,
    stuffPerClickCost: 10,
    stuffPerClickLevel: 0,
    prestigeLevel: 0,
    prestigeCost: 10000,
    prestigeMultiplier: 1,
    autoClickers: 0,
    autoClickerCost: 100,
    autoClickInterval: 3000,
    autoClicksOn: false,
    autoClicks: 0
}

var updateTitle = window.setInterval(function () {
    document.title = "Stuff Incremental - " + gameData.stuff + " stuff"
}, 2000)

function getStuff() {
    gameData.stuff += gameData.stuffPerClick * gameData.prestigeMultiplier
    gameData.totalStuff += gameData.stuffPerClick * gameData.prestigeMultiplier
    document.getElementById("stuffGot").innerHTML = gameData.stuff + " stuff"
    document.getElementById("totalStuffGot").innerHTML = "total stuff got: " + gameData.totalStuff
}

function getStuffPerClick() {
    if (gameData.stuff >= gameData.stuffPerClickCost) {
        gameData.stuffPerClickLevel += 1
        if (gameData.stuffPerClickLevel == 1) {
            gameData.stuffPerClick *= 2
        } else {
            gameData.stuffPerClick = (gameData.stuffPerClickLevel ** 2)
        }
        gameData.stuff -= gameData.stuffPerClickCost
        gameData.stuffPerClickCost *= 5
        document.getElementById("getStuffPerClick").innerHTML = "buy stuff per click, cost: " + gameData.stuffPerClickCost + ", level: " + gameData.stuffPerClickLevel
        document.getElementById("stuffGot").innerHTML = gameData.stuff + " stuff"
        document.getElementById("stuffPerClick").innerHTML = "you are getting " + gameData.stuffPerClick * gameData.prestigeMultiplier + " stuff per click"
        document.getElementById("autoClickers").innerHTML = "you have " + gameData.autoClickers + " autoclickers, clicking " +
            Math.round(1000 * (1000 * gameData.autoClickers / gameData.autoClickInterval)) / 1000 + " times per second for " + Math.round(10 * (1000 * gameData.autoClickers / gameData.autoClickInterval) *
                gameData.stuffPerClick * gameData.prestigeMultiplier) / 10 + " stuff per second"
    }
}

function prestige() {
    if (gameData.stuff >= gameData.prestigeCost) {
        gameData.stuff = 0
        gameData.stuffPerClickLevel = 0
        gameData.stuffPerClickCost = 10
        gameData.stuffPerClick = 1
        gameData.autoClickerCost = 100
        gameData.autoClickers = 0
        gameData.autoClicksOn = false
        clearInterval(gameData.autoClicks)
        gameData.prestigeLevel += 1
        if (gameData.prestigeLevel == 1) {
            gameData.prestigeCost *= 10
        } else {
            gameData.prestigeCost *= 10 * Math.round(gameData.prestigeLevel ** 1.5)
        }
        gameData.prestigeMultiplier += gameData.prestigeLevel
        document.getElementById("stuffGot").innerHTML = gameData.stuff + " stuff"
        document.getElementById("getStuffPerClick").innerHTML = "buy stuff per click, cost: " + gameData.stuffPerClickCost + ", level: " + gameData.stuffPerClickLevel
        document.getElementById("stuffPerClick").innerHTML = "you are getting " + gameData.stuffPerClick * gameData.prestigeMultiplier + " stuff per click"
        document.getElementById("prestige").innerHTML = "cost: " + gameData.prestigeCost + ", level: " + gameData.prestigeLevel
        document.getElementById("buyAutoClicker").innerHTML = "buy an auto clicker, cost: " + gameData.autoClickerCost
        document.getElementById("autoClickers").innerHTML = "you have " + gameData.autoClickers + " autoclickers, clicking " +
            Math.round(1000 * (1000 * gameData.autoClickers / gameData.autoClickInterval)) / 1000 + " times per second for " + Math.round(10 * (1000 * gameData.autoClickers / gameData.autoClickInterval) *
                gameData.stuffPerClick * gameData.prestigeMultiplier) / 10 + " stuff per second"
        document.getElementById("toggleAutoClickers").innerHTML = "toggles auto-clickers, currently: " + gameData.autoClicksOn
    }
}

function buyAutoClicker() {
    if (gameData.stuff >= gameData.autoClickerCost) {
        gameData.stuff -= gameData.autoClickerCost
        gameData.autoClickers += 1
        gameData.autoClickerCost = Math.round(gameData.autoClickerCost * 1.15)
        document.getElementById("stuffGot").innerHTML = gameData.stuff + " stuff"
        document.getElementById("buyAutoClicker").innerHTML = "buy an auto clicker, cost: " + gameData.autoClickerCost
        document.getElementById("autoClickers").innerHTML = "you have " + gameData.autoClickers + " autoclickers, clicking " +
            Math.round(1000 * (10 * gameData.autoClickers / gameData.autoClickInterval)) / 10 + " times per second for " + Math.round(10 * (1000 * gameData.autoClickers / gameData.autoClickInterval) *
                gameData.stuffPerClick * gameData.prestigeMultiplier) / 10 + " stuff per second"
        if (gameData.autoClickers == 1) {
            toggleAutoClickers()
        } else {
            toggleAutoClickers()
            toggleAutoClickers()
        }
        document.getElementById("toggleAutoClickers").innerHTML = "toggles auto-clickers, currently: " + gameData.autoClicksOn
    }
}

function toggleAutoClickers() {
    if (gameData.autoClicksOn || gameData.autoClickers == 0) {
        gameData.autoClicksOn = false
        clearInterval(gameData.autoClicks)
        document.getElementById("toggleAutoClickers").innerHTML = "toggles auto-clickers, currently: " + gameData.autoClicksOn
    } else {
        gameData.autoClicksOn = true
        gameData.autoClicks = setInterval(autoClick, 33)
        document.getElementById("toggleAutoClickers").innerHTML = "toggles auto-clickers, currently: " + gameData.autoClicksOn
    }
}

function autoClick() {
    gameData.stuff = Math.round(10 * (gameData.stuff + (gameData.autoClickers * (gameData.stuffPerClick * gameData.prestigeMultiplier) / 30 / 3))) / 10
    gameData.totalStuff = Math.round(10 * (gameData.totalStuff + (gameData.autoClickers * (gameData.stuffPerClick * gameData.prestigeMultiplier) / 30 / 3))) / 10
    document.getElementById("stuffGot").innerHTML = gameData.stuff + " stuff"
    document.getElementById("totalStuffGot").innerHTML = "total stuff got: " + gameData.totalStuff
}

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("save", JSON.stringify(gameData))
}, 60000)

var savegame = JSON.parse(localStorage.getItem("save"))
if (savegame !== null) {
    gameData = savegame
}


/**
 * why is vscode being a prick
 * i just want to code man
 * 
 */