const pertanyaan = document.getElementById("pertanyaan");
const jawaban = document.getElementById("jawaban");
const btn = document.querySelector("button");
const loaders = document.getElementById("loaders");
const container = document.getElementsByClassName("container");

let init = 0;

const botQuestion = (data) => {
    return [
        "Perkenalkan nama saya KlisBot, siapa nama kamu ?",
        `Halo ${data?.nama}, berapa usia kamu?`,
        `ohhh usia kamu ${data?.usia} tahun, btw hobi kamu apa?`,
        `oalahh sama dong, hobi aku juga ${data?.hobi}, yaudah kalo gitu udahan yaa?`,
    ];
};

pertanyaan.innerHTML = botQuestion()[0];

let usersData = [];

function botStart() {
    if (jawaban.value.length < 1) return alert("silahkan isi jawaban dulu");
    init++;
    if (init === 1) {
        botDelay({ nama: jawaban.value });
    } else if (init === 2) {
        botDelay({ usia: jawaban.value });
    } else if (init === 3) {
        botDelay({ hobi: jawaban.value });
    } else if (init === 4) {
        finshing();
    } else {
        botEnd();
    }
}

function botDelay(jawabanUser) {
    loaders.style.display = "block";
    container[0].style.filter = "blur(8px)";
    setTimeout(() => {
        pertanyaan.innerHTML = botQuestion(jawabanUser)[init];
        loaders.style.display = "none";
        container[0].style.filter = "none";
    }, 1000);
    usersData.push(jawaban.value);
    jawaban.value = "";
}

function finshing() {
    setTimeout(() => {
        pertanyaan.innerHTML = `Terima kasih yaa ${usersData[0]} udah pake KlisBot, lain kali kita main ${usersData[2]} bareng yaa`;
        jawaban.value = "siap thanks juga!!";
    }, 1000);
    jawaban.value = "";
}

function botEnd() {
    alert(`Terimakasih ${usersData[0]} sudah berkunjung, anda akan diarahkan ke halaman utama`);
    window.location.reload();
}

function keyEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        botStart();
    }
}

jawaban.addEventListener("keydown", keyEnter);
btn.addEventListener("click", botStart);
