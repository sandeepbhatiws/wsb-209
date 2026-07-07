
function getData(output){
    //var output = document.getElementById('button'+id).innerText;
    

    
    if(output.innerText.trim().toLowerCase() == 'add class'){
        document.querySelector('.output').classList.add('outputColor');
    }

    if(output.innerText.trim().toLowerCase() == 'remove class'){
        document.querySelector('.output').classList.remove('outputColor');
    }

    if(output.innerText.trim().toLowerCase() == 'toggle class'){
        document.querySelector('.output').classList.toggle('outputColor');
    }
}

const displayData = () => {
    console.log('hello')
}

//document.getElementById('button1').addEventListener('click', displayData);

//document.getElementById('button2').addEventListener('click', (event) => {
//    console.log(event.target.innerText)
//});

var buttons = document.querySelectorAll('.button');

buttons.forEach((v,i) => {
    v.addEventListener('click', (event) => {

        if(event.target.innerText.trim().toLowerCase() == 'add class'){
            document.querySelector('.output').classList.add('outputColor');
        }

        if(event.target.innerText.trim().toLowerCase() == 'remove class'){
            document.querySelector('.output').classList.remove('outputColor');
        }

        if(event.target.innerText.trim().toLowerCase() == 'toggle class'){
            document.querySelector('.output').classList.toggle('outputColor');
        }
    })
});