const feedbacks = document.querySelector('.feedbacks');
const feedbackKey = 'feedback';
window.addEventListener('load', start());


function start(){
    if (localStorage.getItem(feedbackKey)){
        const data = JSON.parse(localStorage.getItem(feedbackKey));
        createFeedbackCards(data);
    }
    else {
        const header = document.createElement('h1');
        header.textContent = 'Здесь пока нет ни одного отзыва!'
        feedbacks.appendChild(header);
        const subheader = document.createElement('h3');
        subheader.textContent = 'Но вы можете их написать!'
        feedbacks.appendChild(subheader);
    }
    
    const buttonCreate = document.createElement('button');
    buttonCreate.className = 'createFeedback';
    buttonCreate.textContent = 'Написать отзыв';
    feedbacks.appendChild(buttonCreate);
    buttonCreate.addEventListener('click', () => {
        window.location.href = 'createFeedback.html';
    })
}


function createFeedbackCards(data){
    for (const iterator of data) {
        const divEl = document.createElement('div');
        divEl.className = 'card';
        feedbacks.appendChild(divEl);
        const header = document.createElement('h2');
        header.textContent = iterator.product; 
        divEl.appendChild(header);  
        createFeedbackList(divEl, iterator.feedback, iterator.product, 'none');           
    }
}

function createFeedbackList(divEl, feedbackArr, product){
    const buttonFeed = document.createElement('button');
    divEl.appendChild(buttonFeed);
    buttonFeed.textContent = 'показать отзывы';
    const olEl = document.createElement('ol');
    olEl.style.display = 'none';
    divEl.appendChild(olEl); 
    for (i = 0; i < feedbackArr.length; i++){
        const liEl = document.createElement('li');
        liEl.value = i + 1;
        const buttonLi = document.createElement('button');
        buttonLi.className = 'deleteButton';
        buttonLi.innerHTML = '&#10006';
        buttonLi.addEventListener('click', (event) => {
            const currentEl = event.target;
            const number = currentEl.parentNode.value - 1;
            const arrayFeed = JSON.parse(localStorage.getItem(feedbackKey));
            const objFeedback = arrayFeed.find(item => item.product === product);
            objFeedback.feedback.splice(number, 1);
            if (objFeedback.feedback.length == 0){
                const numObj = arrayFeed.findIndex(item => item.product === product);
                arrayFeed.splice(numObj, 1);
                localStorage.setItem(feedbackKey, JSON.stringify(arrayFeed));
                divEl.style.display = 'none';
            }
            else{
                localStorage.setItem(feedbackKey, JSON.stringify(arrayFeed)); 
                liEl.remove();
            }
            checkStorage();
        });
        liEl.textContent = feedbackArr[i];
        liEl.appendChild(buttonLi);
        olEl.appendChild(liEl);
    } 
    buttonFeed.addEventListener('click', showFeedbacks.bind(null, olEl));
}

function showFeedbacks(olEl, event){
    const buttonFeed = event.target;
    if(olEl.style.display === 'none'){
        olEl.style.display = 'block';
        buttonFeed.textContent = 'скрыть отзывы';
    } else{
        olEl.style.display = 'none';
        buttonFeed.textContent = 'показать отзывы';
    }   
}

function checkStorage(){
    const data = JSON.parse(localStorage.getItem(feedbackKey));
    if (data.length === 0){
        localStorage.removeItem(feedbackKey);
        const buttonCreate = document.getElementsByClassName('createFeedback');
        buttonCreate[0].remove();
        start();
    }
}

