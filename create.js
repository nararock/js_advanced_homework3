const feedbackKey = 'feedback';
const product = document.querySelector('.product');
const feedback = document.querySelector('.feedback');
const btn = document.querySelector('.addFeedback');
const commonError = document.querySelector('.error');

btn.addEventListener('click', () =>{
    commonError.textContent = '';
    if (checkFields()){
        addFeedback(product.value, feedback.value);
        product.value = '';
        feedback.value = '';
    }
})

function checkFields(){
    if (product.value == '' || feedback.value == ''){
        commonError.textContent = 'Все поля должны быть заполнены!'
        return false;
    }
    return true;
}

function addFeedback(name, description){
    const arrayFeedbacks = getFeedback(feedbackKey);
    if (arrayFeedbacks.some(item => item.product == name)){
        const objFeedback = arrayFeedbacks.find(item => item.product == name);
        objFeedback.feedback.push(description);
        localStorage.setItem(feedbackKey, JSON.stringify(arrayFeedbacks));
    }
    else if (arrayFeedbacks.length == 0){
        const array = [description];
        localStorage.setItem( feedbackKey ,JSON.stringify([{product: name, feedback: array}]));
    }
    else{
        arrayFeedbacks.push({product: name, feedback: [description]})
        localStorage.setItem( feedbackKey ,JSON.stringify(arrayFeedbacks));
    }  
}

function getFeedback(key){
    const data = localStorage.getItem(key);
    if (data === null){
        return [];
    }
    return JSON.parse(data);
}