
const getQuestions = document.querySelectorAll('.faqQUEST');

getQuestions.forEach((v,i) => {
    
    v.addEventListener('click', (event) => {
        
        v.nextElementSibling.classList.toggle('addANS')

        if(v.lastElementChild.innerText.trim() == '-'){
            v.lastElementChild.innerText = '+';
        } else {
            v.lastElementChild.innerText = '-';
        }


        getQuestions.forEach((value,index) => {

            if(value != v){
                value.nextElementSibling.classList.remove('addANS')
                value.lastElementChild.innerText = '+';
            }
            
        });

    })
})