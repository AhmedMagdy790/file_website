let addWord = document.querySelector(".app .add-word");
let cardsWord = document.querySelector(".app .cards-word");
let listWord = document.querySelector(".app .list-word");
let items = document.querySelectorAll("[item]");

let setting = document.querySelector(".setting");
let eng_word = document.querySelector(".eng-word");
let arb_word = document.querySelector(".arb-word");
let send = document.getElementById("send");
let notifications = document.getElementById("notifications");


let data;
if(localStorage['words'] != null){
    data = JSON.parse(localStorage['words']);
}else {
    data = [{id: 1}];
}

send.onclick = () => {
    let valid = false;
    if(eng_word.value == "" && arb_word.value == ""){
        notifications.innerHTML = `<p class="item fild">يوجد بعض الحقول فارغة</p>`;
    }else {
        valid = true;
    }

    if(valid === true){
        let idItem;
        if(data.length < 0){
            idItem = 0;
        }else {
            idItem = (data[data.length - 1].id + 1)
        }
        let obj = {
            id: idItem,
            eng_word: eng_word.value,
            arb_word: arb_word.value, 
        };
        data.push(obj);
        localStorage.setItem("words", JSON.stringify(data));
        notifications.removeAttribute("style");
        notifications.innerHTML = `<p class="item">تم الاضافة  </p>`;
        setTimeout(() => {
            notifications.style.transform = 'translateX(-100%)';
        }, 5000);
        arb_word.value = "";
        eng_word.value = "";
        printItems();
    }
}

function settingFun() {

    
    if(setting.children[0].classList.contains("icon") == true){
        setting.children[0].onclick = () => {
            setting.classList.toggle("active");
        }
    }
  
    Array.from(setting.children[1].children).forEach((el) => {

        if(localStorage['sett-page'] != null) {
            items.forEach((el) => {
                if(el.getAttribute("item") == localStorage['sett-page']){
                    el.style.visibility = "visible";
                    el.style.display = "block";
                }else {
                    el.style.display = "none";
                }
            });   
        }

        el.onclick = function() {
            items.forEach((el) => {
                if(el.getAttribute("item") == this.getAttribute("data-item")){
                    el.style.visibility = "visible";
                    el.style.display = "block";
                }else {
                    el.style.display = "none";
                }
            });
            swiper();
            setting.classList.remove("active");
            localStorage.setItem("sett-page", this.getAttribute("data-item"));
        }
    });
};

function printItems() {
    data.forEach((el, i) => {
        listWord.innerHTML = "";
        setTimeout(() => {
            listWord.innerHTML += `
                <div class="item">
                    <div class="words">
                        <p>${i + 1}</p>
                        <p>${el.eng_word}</p>
                        <p>${el.arb_word}</p>
                    </div>
                    <div class="buttons">
                        <button id-item="${el.id}" class="btn delete">حذف</button>
                        <button id-item="${el.id}" class="btn change">تغير</button>
                    </div>
                </div>
            `;
            deleteFun();
        },100)
    });
};

function printItemsCards() {
    data.forEach((el) => {
        cardsWord.children[0].innerHTML = "";
        setTimeout(() => {
            cardsWord.children[0].innerHTML += `
            <div class="item swiper-slide">
                <div class="card-arb">
                    <p class="word">${el.arb_word}</p>
                </div>
                <div class="card-eng">
                    <p class="word">${el.eng_word}</p>
                </div>
            </div>
            `;
        },100)
    });
};

function deleteFun() {
    let deleteEl = document.querySelectorAll(".list-word .delete");
    if(deleteEl.length > 0){
        Array.from(deleteEl).forEach((elp) => {
            elp.onclick = () => {
                data.forEach((el, i) => {
                    if(elp.getAttribute("id-item") == el.id){
                       data.splice(i, 1);
                       localStorage.setItem("words", JSON.stringify(data));
                       printItems();
                       deleteFun();
                    }
                })
            }
        });
    }
};

function swiper(el) {
    new Swiper(".slide-cards", {
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        grid: {
            colum: 1,
        },
        spaceBetween: 100,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
    if(el != null){
        el.parentElement.style.opacity = "0";
        setTimeout(() => {
            el.parentElement.remove();
        },3000);
    }   
}

onload = () => {
    printItems();
    printItemsCards();
    settingFun();
}