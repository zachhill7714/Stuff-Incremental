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

function getStuff() {
    gameData.stuff += gameData.stuffPerClick * gameData.prestigeMultiplier
    gameData.totalStuff += gameData.stuffPerClick * gameData.prestigeMultiplier
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
    }
}

function buyAutoClicker() {
    if (gameData.stuff >= gameData.autoClickerCost) {
        gameData.stuff -= gameData.autoClickerCost
        gameData.autoClickers += 1
        gameData.autoClickerCost *= 1.15
        if (gameData.autoClickers == 1) {
            toggleAutoClickers()
        } else {
            toggleAutoClickers()
            toggleAutoClickers()
        }
    }
}

function toggleAutoClickers() {
    if (gameData.autoClicksOn || gameData.autoClickers == 0) {
        gameData.autoClicksOn = false
        clearInterval(gameData.autoClicks)
    } else {
        gameData.autoClicksOn = true
        gameData.autoClicks = setInterval(autoClick, 33)
    }
}

function autoClick() {
    gameData.stuff = (gameData.stuff + (gameData.autoClickers * (gameData.stuffPerClick * gameData.prestigeMultiplier) / 30 / 3))
    gameData.totalStuff = (gameData.totalStuff + (gameData.autoClickers * (gameData.stuffPerClick * gameData.prestigeMultiplier) / 30 / 3))
}

/**
 * utilities beyond this point!
 */


function update(id, content) {
    document.getElementById(id).innerHTML = content;
}

function masterUpdate() {
    update("stuffGot", format(gameData.stuff) + " stuff")
    update("totalStuffGot", "total stuff got: " + format(gameData.totalStuff))
    update("getStuffPerClick", "buy stuff per click, cost: " + format(gameData.stuffPerClickCost) + ", level: " + format(gameData.stuffPerClickLevel))
    update("stuffPerClick", "you are getting " + format(gameData.stuffPerClick * gameData.prestigeMultiplier) + " stuff per click")
    update("prestige", "cost: " + format(gameData.prestigeCost) + ", level: " + format(gameData.prestigeLevel))
    update("buyAutoClicker", "buy an auto clicker, cost: " + format(gameData.autoClickerCost))
    update("autoClickers", "you have " + format(gameData.autoClickers) + " autoclickers, clicking " +
        format(1000 * gameData.autoClickers / gameData.autoClickInterval) + " times per second for " + format(1000 * gameData.autoClickers / gameData.autoClickInterval *
            gameData.stuffPerClick * gameData.prestigeMultiplier) + " stuff per second")
    update("toggleAutoClickers", "toggles auto-clickers, currently: " + gameData.autoClicksOn)
}

function format(number) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	else return mantissa.toFixed(3) + "e" + exponent
}

function resetGame() {
    if(confirm("are you sure you want to reset your save? this cannot be undone")) {
        gameData.stuff = 0
        gameData.totalStuff= 0
        gameData.stuffPerClick= 1
        gameData.stuffPerClickCost= 10
        gameData.stuffPerClickLevel= 0
        gameData.prestigeLevel= 0
        gameData.prestigeCost= 10000
        gameData.prestigeMultiplier= 1
        gameData.autoClickers= 0
        gameData.autoClickerCost= 100
        gameData.autoClickInterval= 3000
        gameData.autoClicksOn=false
        gameData.autoClicks = 0
    }
}

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("save", JSON.stringify(gameData))
}, 10000)

var savegame = JSON.parse(localStorage.getItem("save"))
if (savegame !== null) {
    gameData = savegame
}

var mUpdate = setInterval(masterUpdate, 33)
if(gameData.autoClicksOn) {
    toggleAutoClickers()
    toggleAutoClickers()
}

var updateTitle = window.setInterval(function () {
    document.title = "Stuff Incremental - " + format(gameData.stuff) + " stuff"
}, 2000)

// hi comment