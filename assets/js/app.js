(function() {

    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let messageArray = [];
    const form = document.getElementById("formChat");
    const containerChat = document.querySelector(".containerChat");

    function addMessage(text) {
        let date = new Date();
        const message = {
            text,
            id: Date.now(),
            date: `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
        };

        messageArray.push(message);
        renderMessage(message);
    }

    let pressTimer;
    /*    const button = document.getElementById("test"); */

    function renderMessage(message) {
        const containerChat = document.querySelector(".containerChat");
        const newMessage = document.createElement("div");
        newMessage.className = "newMessage sended";
        newMessage.setAttribute("data-key", message.id);

        newMessage.innerHTML = `
            <div class="containerMessage">
                <p>${message.text}</p>
                <small>${message.date}</small>
            </div>
            <div class="containerReactions">
                <button class="reaction like">
                    <img src="assets/images/reactions/like.png">
                </button>
                <button class="reaction heart">
                    <img src="assets/images/reactions/heart.png">
                </button>
                <button class="reaction joy">
                    <img src="assets/images/reactions/joy.png">
                </button>
                <button class="reaction shocked">
                    <img src="assets/images/reactions/shocked.png">
                </button>
                <button class="reaction sad">
                    <img src="assets/images/reactions/sad.png">
                </button>
                <button class="reaction nerd">
                    <img src="assets/images/reactions/nerd.png">
                </button>
            </div>
        `;

        containerChat.append(newMessage);
    }

    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const input = document.getElementById("fieldMessages");
        const text = input.value.trim();

        if (text !== "") {
            addMessage(text);
            input.value = "";
            input.focus();
        }
    });

    containerChat.addEventListener("mouseup", () => {
        clearTimeout(pressTimer);
        return false;
    });

    containerChat.addEventListener("mousedown", (evt) => {
        pressTimer = window.setTimeout(() => {
            console.log(evt.target.parentNode.parentNode);
            let message = evt.target.parentNode.parentNode;
            if (!message.classList.contains("selected")) {
                message.classList.add("selected");

                const containerReactions = message.querySelector(".containerReactions");
                containerReactions.style.display = "flex";

                containerReactions.addEventListener("click", (evt) => {
                    const el = evt.target.parentNode;
                    console.log(el);

                    if (el.classList.contains("reaction")) {
                        let miniReaction = document.createElement("div");
                        miniReaction.classList.add("miniReaction");
                        let image;

                        if (el.classList.contains("like")) {
                            console.log("like");
                            image = "assets/images/reactions/like.png";
                        } else if (el.classList.contains("heart")) {
                            image = "assets/images/reactions/heart.png";
                        } else if (el.classList.contains("joy")) {
                            image = "assets/images/reactions/joy.png";
                        } else if (el.classList.contains("shocked")) {
                            image = "assets/images/reactions/shocked.png";
                        } else if (el.classList.contains("sad")) {
                            image = "assets/images/reactions/sad.png";
                        } else if (el.classList.contains("nerd")) {
                            image = "assets/images/reactions/nerd.png";
                        }

                        miniReaction.innerHTML = `
                                <img src="${image}">
                        `;

                        el.parentNode.previousElementSibling.appendChild(miniReaction);

                        //Quitamos estado de seleccionado y ocultamos reacciones
                        message.classList.remove("selected");
                        containerReactions.style.display = "none";
                    }
                });
            }
        }, 1000);
        return false;
    });


    /*  var onlongtouch;
     var timer;
     var touchduration = 800;

     function touchstart(e) {
         e.preventDefault();
         if (!timer) {
             timer = setTimeout(onlongtouch, touchduration);
         }
     }

     function touchend() {
         if (timer) {
             clearTimeout(timer);
             timer = null;
         }
     }

     onlongtouch = function() {
         timer = null;
         
         
     };

     document.addEventListener("DOMContentLoaded", function(event) {
         window.addEventListener("touchstart", touchstart, false);
         window.addEventListener("touchend", touchend, false);
     }); */


})();