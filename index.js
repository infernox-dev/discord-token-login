// ==UserScript==
// @name         Discord Token Login
// @description  Simple script that allows to login with token by pressing Ctrl+L keyboard hotkey
// @match        https://discord.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=discord.com&sz=256
// @author       infernox-dev
// @version      0.1
// ==/UserScript==

(function () {
    "use strict";

    function loginWithToken(token) {
        setInterval(function () {
            document.body.appendChild(document.createElement`iframe`)
                .contentWindow.localStorage.token = `"${token}"`
        }, 50);
        setTimeout(function () { location.reload(); }, 1000);
    }


    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && (event.key === "l" || event.key === "д")) {
            event.preventDefault();
            console.log("Ctrl+L pressed, opening token login prompt");

            let token = prompt("Введите токен Discord:");

            if (token === null) {
                console.log("Prompt closed");
                return;
            }

            fetch("https://discord.com/api/v9/users/@me", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).then(response => {
                if (response.ok === false) {
                    alert("Указан неверный токен");
                } else {
                    console.log("Logging in with token");
                    loginWithToken(token);
                }
            });
        }
    });
})();
