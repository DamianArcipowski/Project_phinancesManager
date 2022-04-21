const light = document.querySelector('.light');
const dark = document.querySelector('.dark');
const addTransact = document.getElementById('add');
const modal = document.querySelector('.modalContainer');
const cancel = document.getElementById('cancel');
const transTitle = document.getElementById('transTitle');
const amount = document.getElementById('amount');
const categories = document.getElementById('categories');
const save = document.getElementById('save');
const incomeSection = document.querySelector('.income');
const expenseSection = document.querySelector('.expense');
const transactionsSection = document.querySelector('.transactions');
const deleteAll = document.getElementById('deleteAll');
const mySaldo = document.getElementById('cash');

function changeTheme(e){
    const root = document.querySelector(':root');
    
    if(e.target.classList == 'dark'){
        root.style.setProperty('--bgc','#04051D');
        root.style.setProperty('--fontcolor','#fff');
        root.style.setProperty('--btnfont','#fff');
        root.style.setProperty('--borderdark','1px solid #fff');
        root.style.setProperty('--bgcbtnhover','#eee');
        root.style.setProperty('--colorbtnhover','#000');
        root.style.setProperty('--transactcolor','#fff');
        root.style.setProperty('--xcolor','#fff');
        root.style.setProperty('--transactborder','1px solid #fff');
    } else {
        root.style.setProperty('--bgc','#fff');
        root.style.setProperty('--fontcolor','#000');
        root.style.setProperty('--btnfont','#000');
        root.style.setProperty('--borderdark','1px solid #000');
        root.style.setProperty('--bgcbtnhover','#000');
        root.style.setProperty('--colorbtnhover','#fff');
        root.style.setProperty('--transactcolor','#000');
        root.style.setProperty('--xcolor','#000');
        root.style.setProperty('--transactborder','1px solid #000');
    }
}

function addTransaction(){
    const newTrans = document.createElement('p');
    if(categories.value == 'Przychód'){
        newTrans.classList.add('incomeTransact');
        newTrans.innerHTML = `<span class="incTransactName"><i class="fa-solid fa-money-bill-wave"></i> ${transTitle.value}</span>
                          <span class="incTransactValue">${amount.value}zł <i class="fa-solid fa-xmark xcolor"></i></span>`;
        incomeSection.appendChild(newTrans);
    } else if(categories[categories.selectedIndex].value == 'Zakupy'){
        newTrans.classList.add('expenseTransact');
        newTrans.innerHTML = `<span class="expTransactName"><i class="fa-solid fa-cart-shopping"></i> ${transTitle.value}</span>
                              <span class="expTransactValue">${amount.value}zł <i class="fa-solid fa-xmark xcolor"></i></span>`;
        expenseSection.appendChild(newTrans);
    } else if(categories[categories.selectedIndex].value == 'Jedzenie'){
        newTrans.classList.add('expenseTransact');
        newTrans.innerHTML = `<span class="expTransactName"><i class="fa-solid fa-burger"></i> ${transTitle.value}</span>
                              <span class="expTransactValue">${amount.value}zł <i class="fa-solid fa-xmark xcolor"></i></span>`;
        expenseSection.appendChild(newTrans);
    } else {
        newTrans.classList.add('expenseTransact');
        newTrans.innerHTML = `<span class="expTransactName"><i class="fa-solid fa-film"></i> ${transTitle.value}</span>
                              <span class="expTransactValue">${amount.value}zł <i class="fa-solid fa-xmark xcolor"></i></span>`;
        expenseSection.appendChild(newTrans);
    }

    modal.style.display = 'none';
    transTitle.value = '';
    amount.value = '';
    categories.value = 'null';
}

function formValidation(e){
    if(transTitle.value == '' || amount.value == '' || categories.value == 'null'){
        e.preventDefault();
        alert('Wypełnij poprawnie wszystkie pola!');
    } else {
        addTransaction();
    }
}

var startSaldo = 0;

function deleteTransaction(e){
    if(e.target.classList.contains('fa-xmark')){
        const specifiedTrans = e.target.parentNode.parentNode;
        const amountToSubstract = specifiedTrans.children[1].childNodes[0].data;
        var lengthToSubstr = amountToSubstract.length-3;
        var amountString = parseInt(amountToSubstract.substr(0, lengthToSubstr));
        startSaldo -= amountString;
        mySaldo.textContent = `${startSaldo} zł`;
        specifiedTrans.remove();
    }
}

function deleteAllTransactions(){
    for(let i=1; i<incomeSection.children.length; i){
        incomeSection.children[i].remove();
    }
    for(let i=1; i<expenseSection.children.length; i){
        expenseSection.children[i].remove();
    }
    mySaldo.textContent = `0zł`;
}

function calculateSaldo(){
    var amountTrans = parseInt(amount.value);
    startSaldo += amountTrans;
    mySaldo.textContent = `${startSaldo} zł`;
}

addTransact.addEventListener('click', () => modal.style.display = 'flex');
cancel.addEventListener('click', () => modal.style.display = 'none');
light.addEventListener('click', changeTheme);
dark.addEventListener('click', changeTheme);
save.addEventListener('click', calculateSaldo);
save.addEventListener('click', formValidation);
transactionsSection.addEventListener('click', deleteTransaction);
deleteAll.addEventListener('click', deleteAllTransactions);