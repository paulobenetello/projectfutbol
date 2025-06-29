const fname = ['Cole ', 'Gustavo ', 'Paulo ', 'Davi ', 'Cauã ', 'Vitor ', 'Ronaldo ', 'Cristiano '];
const lname = ['Palmer', 'Gomez', 'Benetello', 'Roque', 'Eduardo', 'Ratão'];
let player = [{
    name: '',
    pass: '',
    shoot: '',
    mark: '',
    goal: ''
}];
let overall;
let cash = 0;
let clicks = 0;

//cria o time base e verifica se vc ja criou um para dar a opção de refazer
function time() {
    if (clicks == 0) {
        let list = document.getElementById('plist');
        let i = 1;
        list.innerHTML = '';

        while (i <= 11) {
            if (i == 1) {
                goalkeeper();
            }
            else if (i <= 5) {
                defender();
            }
            else if (i <= 9) {
                midfielder();
            }
            else {
                forward();
            }

            list.innerHTML += `
            <li class="player" onclick="trade(this)" id="${i}">
                <p class="nm">${player.name}</p>
                <p>Passe: ${player.pass}</p>
                <p>Chute: ${player.shoot}</p>
                <p>Marcação: ${player.mark}</p>
                <p>Goleiro: ${player.goal}</p>
                <p class="md" geral="${overall}">Média: <i class="over">${overall}</i></p>
            </li>`;

            list.innerHTML += '<br>';
            i++;
            clicks++;
        }
    }
    else{
        let rerrol = confirm('Você gostaria de gerar novamente um time? Isso lhe custará R$1000');
        if(rerrol == true){
            if(cash >= 1000){
                clicks = 0;
                cash -= 1000;
                time();
            }
            else{
                alert('Você não tem dinheiro suficiente!');
            }
        }
        checkcash();
    }
}

function sim() {
    let res = document.getElementById('result');
    let joga = document.getElementsByClassName("player");
    let gertot = 0;
    let list = document.getElementById('plist');

    if (list.children.length < 11) {
        alert('Primeiro gere seus jogadores');
    } else {
        res.classList.add('view');

        for (let i = 0; i < joga.length; i++) {
            let over = Number(joga[i].getElementsByClassName('over')[0].innerHTML);

            gertot += over;
        }
        console.log(gertot);

        let ganhando = Math.floor(Math.random() * 10);
        let perdendo = Math.floor(Math.random() * 3);

        //Define se é melhor ou não (base em nada kkkkkkkkkkk)
        if (gertot <= 57) {
            res.innerHTML = `<p class="plac">Seu time ${perdendo} X ${ganhando} Oponente</p>`
            res.innerHTML += `<ul id="gols"> </ul>`

            let goal = document.querySelector('#gols');
            for (let i = 1; i <= perdendo; i++) {
                goal.innerHTML += `<li> ${joga[Math.floor(Math.random() * 10)].getElementsByClassName('nm')[0].innerHTML} </li>`
            }

            res.innerHTML += `<ul id="opgols"> </ul>`

            let opgoal = document.querySelector('#opgols');
            for (let i = 1; i <= ganhando; i++) {
                opgoal.innerHTML += `<li> ${(fname[Math.floor(Math.random() * fname.length)]) + (lname[Math.floor(Math.random() * lname.length)])} </li>`
            }

            //adicona cash de acordo com o resultado
            if (perdendo > ganhando) {
                cash += 100;
            } else if (perdendo == ganhando) {
                cash += 50;
            }
            checkcash();
        } else {
            res.innerHTML = `<p class="plac">Seu time ${ganhando} X ${perdendo} Oponente</p>`
            res.innerHTML += `<ul id="gols"> </ul>`

            let goal = document.querySelector('#gols');
            for (let i = 1; i <= ganhando; i++) {
                goal.innerHTML += `<li> ${joga[Math.floor(Math.random() * 10)].getElementsByClassName('nm')[0].innerHTML} </li>`
            }

            res.innerHTML += `<ul id="opgols"> </ul>`

            let opgoal = document.querySelector('#opgols');
            for (let i = 1; i <= perdendo; i++) {
                opgoal.innerHTML += `<li> ${(fname[Math.floor(Math.random() * fname.length)]) + (lname[Math.floor(Math.random() * lname.length)])} </li>`
            }

            //adicona cash de acordo com o resultado
            if (ganhando > perdendo) {
                cash += 100;
            } else if (perdendo == ganhando) {
                cash += 50;
            }
            checkcash();
        }
    }
}

//troca os jogadores
function trade(elemento) {
    let ply = document.getElementById(elemento.id);
    let conf = confirm('Quer trocar esse jogador? Isso custará R$300');

    if (conf == true) {
        if (cash >= 300) {
            cash -= 300;
            if (ply.id == 1) {
                goalkeeper();
            }
            else if (ply.id <= 5) {
                defender();
            }
            else if (ply.id <= 9) {
                midfielder();
            }
            else {
                forward();
            }

            elemento.innerHTML = `
                <p class="nm">${player.name}</p>
                <p>Passe: ${player.pass}</p>
                <p>Chute: ${player.shoot}</p>
                <p>Marcação: ${player.mark}</p>
                <p>Goleiro: ${player.goal}</p>
                <p class="md" geral="${overall}">Média: <i class="over">${overall}</i></p>`;
        }
        else {
            alert('Você não tem dinheiro suficiente!');
        }
    }
    checkcash();
}



//atualiza o cash
function checkcash() {
    let pc = document.getElementById('cash');
    pc.innerHTML = cash;
}


//functions para cada posição(la ele)
function goalkeeper() {
    player.name = (fname[Math.floor(Math.random() * fname.length)]) + (lname[Math.floor(Math.random() * lname.length)]) + ' (Goleiro)';

    player.pass = Math.floor(Math.random() * 6) + 1;
    player.shoot = Math.floor(Math.random() * 4) + 1;
    player.mark = Math.floor(Math.random() * 4) + 1;
    player.goal = Math.floor(Math.random() * 10) + 1;

    overall = (player.pass + player.shoot + player.mark + (player.goal * 2)) / 4;
}

function defender() {
    player.name = (fname[Math.floor(Math.random() * fname.length)]) + (lname[Math.floor(Math.random() * lname.length)]) + ' (Zagueiro)';

    player.pass = Math.floor(Math.random() * 6) + 1;
    player.shoot = Math.floor(Math.random() * 5) + 1;
    player.mark = Math.floor(Math.random() * 10) + 1;
    player.goal = Math.floor(Math.random() * 5) + 1;

    overall = (player.pass + player.shoot + (player.mark * 2) + player.goal) / 4;
}

function midfielder() {
    player.name = (fname[Math.floor(Math.random() * fname.length)]) + (lname[Math.floor(Math.random() * lname.length)]) + ' (Meio-Campo)';

    player.pass = Math.floor(Math.random() * 10) + 1;
    player.shoot = Math.floor(Math.random() * 8) + 1;
    player.mark = Math.floor(Math.random() * 5) + 1;
    player.goal = Math.floor(Math.random() * 3) + 1;

    overall = ((player.pass * 2) + player.shoot + player.mark + player.goal) / 4;
}

function forward() {
    player.name = (fname[Math.floor(Math.random() * fname.length)]) + (lname[Math.floor(Math.random() * lname.length)]) + ' (Atacante)';

    player.pass = Math.floor(Math.random() * 4) + 1;
    player.shoot = Math.floor(Math.random() * 10) + 1;
    player.mark = Math.floor(Math.random() * 3) + 1;
    player.goal = Math.floor(Math.random() * 3) + 1;

    overall = (player.pass + (player.shoot * 2) + player.mark + player.goal) / 4;
}




//function proibida heheheh
function saf(){
    cash += 10000;
    checkcash();
}