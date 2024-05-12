let text = '';

const aboutbtn = (menu) => {
    const desc = document.getElementById('description');
    const socials = document.getElementById('socials');
    const main = document.getElementById('main-note');
    if (menu == "about"){
        desc.style.display = "block"
        socials.style.display = "none"
        main.style.display = "none"
    } else if (menu == "social"){
        desc.style.display = "none"
        socials.style.display = "block"
        main.style.display = "none"
    } else {
        desc.style.display = "none"
        socials.style.display = "none"
        main.style.display = "block"
    }
};

const removeedit = () => {
    const editlist = document.getElementById('edit-list');
    const removeedit = document.getElementById('remove-edit');
    editlist.style.display = 'none';
    removeedit.style.display = 'none';
}

const deletelist = () => {
    var database = JSON.parse(sessionStorage.getItem('note')|| '[]')
    for (let i = 0; i < database.length; i++) {
        if (database[i].text == text) {
            var datas = database.slice(i+1);
        }
    }
    if (datas === undefined){
        sessionStorage.setItem('note', '');
    } else {
        sessionStorage.setItem('note', JSON.stringify(datas));
    }
    removeedit();
    window.location.reload();
}

const editbtn = (ev) => {
    let x = event.clientX;
    let y = event.clientY;
    const editlist = document.getElementById('edit-list');
    editlist.style.top = y + 'px';
    editlist.style.left = x +20+ 'px';
    editlist.style.display = 'flex';
    const removeedit = document.getElementById('remove-edit');
    removeedit.style.display = 'block'
    text = ev;
}

const addlist = () => {
    var div = document.createElement("div");
    div.className = "card bg-gray-100 rounded-md p-3 border-4 mx-1 mt-2 break-words hover:border-purple-900 hover:cursor-pointer hover:bg-gray-300";
    div.innerHTML = document.getElementById('text-input').value
    div.onmousedown = function() {
        editbtn(div.innerHTML);
    };
    document.getElementById('list-note').appendChild(div);

    var database = JSON.parse(sessionStorage.getItem('note')|| '[]');
    const datas = {
        text : document.getElementById('text-input').value
    }
    database.push(datas);
    sessionStorage.setItem('note', JSON.stringify(database));
    document.getElementById('text-input').value = ""
}

for (let i = 0; i < JSON.parse(sessionStorage.getItem('note')|| '[]').length; i++) {
    var databases = JSON.parse(sessionStorage.getItem('note')|| '[]')
    var div = document.createElement("div");
    div.className = "card bg-gray-100 rounded-md p-3 border-4 mx-1 mt-2 break-words hover:border-purple-900 hover:cursor-pointer hover:bg-gray-300";
    div.innerHTML = databases[i].text;
    div.onmousedown = function () {editbtn(this.innerHTML)};
    document.getElementById('list-note').appendChild(div);
}

if (window.innerWidth < 768) {
    var smol = document.createElement('smoldevice');
    smol.className = "m-0 text-center justify-center text-sm flex bg-gray-100 py-1"
    smol.innerHTML = "Better use on pc's, go check it out!";
    document.getElementById('mobile').appendChild(smol);
}