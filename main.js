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

function update(id, content) {
    document.getElementById(id).innerHTML = content;
}

function getStuff() {
    gameData.stuff += gameData.stuffPerClick * gameData.prestigeMultiplier
    gameData.totalStuff += gameData.stuffPerClick * gameData.prestigeMultiplier
    update("stuffGot", format(gameData.stuff, "engineering") + " stuff")
    update("totalStuffGot", "total stuff got: " + format(gameData.totalStuff, "engineering"))
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
        update("getStuffPerClick", "buy stuff per click, cost: " + gameData.stuffPerClickCost + ", level: " + gameData.stuffPerClickLevel)
        update("stuffGot", gameData.stuff + " stuff")
        update("stuffPerClick", "you are getting " + gameData.stuffPerClick * gameData.prestigeMultiplier + " stuff per click")
        update("autoClickers", "you have " + gameData.autoClickers + " autoclickers, clicking " +
        format(((1000 * gameData.autoClickers / gameData.autoClickInterval)), "engineering") + " times per second for " + format(((1000 * gameData.autoClickers / gameData.autoClickInterval) *
            gameData.stuffPerClick * gameData.prestigeMultiplier), "engineering") + " stuff per second")
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
        reload()
    }
}

function buyAutoClicker() {
    if (gameData.stuff >= gameData.autoClickerCost) {
        gameData.stuff -= gameData.autoClickerCost
        gameData.autoClickers += 1
        gameData.autoClickerCost = Math.round(gameData.autoClickerCost * 1.15)
        update("stuffGot", gameData.stuff + " stuff")
        update("buyAutoClicker", "buy an auto clicker, cost: " + gameData.autoClickerCost)
        update("autoClickers", "you have " + gameData.autoClickers + " autoclickers, clicking " +
        format(((1000 * gameData.autoClickers / gameData.autoClickInterval)), "engineering") + " times per second for " + format(((1000 * gameData.autoClickers / gameData.autoClickInterval) *
            gameData.stuffPerClick * gameData.prestigeMultiplier), "engineering") + " stuff per second")
        if (gameData.autoClickers == 1) {
            toggleAutoClickers()
        } else {
            toggleAutoClickers()
            toggleAutoClickers()
        }
        update("toggleAutoClickers", "toggles auto-clickers, currently: " + gameData.autoClicksOn)
    }
}

function toggleAutoClickers() {
    if (gameData.autoClicksOn || gameData.autoClickers == 0) {
        gameData.autoClicksOn = false
        clearInterval(gameData.autoClicks)
        update("toggleAutoClickers", "toggles auto-clickers, currently: " + gameData.autoClicksOn)
    } else {
        gameData.autoClicksOn = true
        gameData.autoClicks = setInterval(autoClick, 33)
        update("toggleAutoClickers", "toggles auto-clickers, currently: " + gameData.autoClicksOn)
    }
}

function autoClick() {
    gameData.stuff = format((gameData.stuff + (gameData.autoClickers * (gameData.stuffPerClick * gameData.prestigeMultiplier) / 30 / 3)), "engineering")
    gameData.totalStuff = format((gameData.totalStuff + (gameData.autoClickers * (gameData.stuffPerClick * gameData.prestigeMultiplier) / 30 / 3)), "engineering")
    update("stuffGot", format(gameData.stuff, "engineering") + " stuff")
    update("totalStuffGot", "total stuff got: " + format(gameData.totalStuff, "engineering"))
}

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("save", JSON.stringify(gameData))
}, 60000)

var savegame = JSON.parse(localStorage.getItem("save"))
if (savegame !== null) {
    gameData = savegame
    reload()
}

function reload() {
    update("stuffGot", gameData.stuff + " stuff")
    update("totalStuffGot", "total stuff got: " + gameData.totalStuff)
    update("getStuffPerClick", "buy stuff per click, cost: " + gameData.stuffPerClickCost + ", level: " + gameData.stuffPerClickLevel)
    update("stuffPerClick", "you are getting " + gameData.stuffPerClick * gameData.prestigeMultiplier + " stuff per click")
    update("prestige", "cost: " + gameData.prestigeCost + ", level: " + gameData.prestigeLevel)
    update("buyAutoClicker", "buy an auto clicker, cost: " + gameData.autoClickerCost)
    update("autoClickers", "you have " + gameData.autoClickers + " autoclickers, clicking " +
        format(((1000 * gameData.autoClickers / gameData.autoClickInterval)), "engineering") + " times per second for " + format(((1000 * gameData.autoClickers / gameData.autoClickInterval) *
            gameData.stuffPerClick * gameData.prestigeMultiplier), "engineering") + " stuff per second")
    update("toggleAutoClickers", "toggles auto-clickers, currently: " + gameData.autoClicksOn)
}

function format(number, type) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

reload()