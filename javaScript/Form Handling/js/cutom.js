var errors = false;

// var allInputs = document.querySelectorAll('input');

// allInputs.forEach((v) => {
//     v.addEventListener('keyup', (e) => {
//         if(e.target.value != ''){
//             errors = errors.filter((v) => {
//                 if(v != e.target.name){
//                     return v;
//                 }
//             })
//         } else {
//             errors.push(e.target.name)
//         }

//         if(event.target.name == 'name'){
//             if(event.target.value != ''){
//                 document.querySelector('.error-name').innerText = ''
//             } else {
//                 errors.push('name');
//                 document.querySelector('.error-name').innerText = 'Please enter your name'
//             }
//         }

//     })
    
// })

document.querySelector('.user_enquiry').addEventListener('submit', (event) => {
    event.preventDefault();

    // if(event.target.name.value.trim() == ''){
    //     errors.push('name');
    //     document.querySelector('.error-name').innerText = 'Please enter your name'
    // } else {
    //     if(errors.includes('name')){
    //         errors.filter((value) => {
    //             if(value != 'name'){
    //                 console.log(value)
    //                 return value
    //             }
    //         })
    //     }
    // }

    // if(!event.target.email.value.trim()){
    //     errors.push('email');
    //     document.querySelector('.error-email').innerText = 'Please enter your email'
    // }

    // if(!event.target.mobile_number.value.trim()){
    //     errors.push('email');
    //     document.querySelector('.error-email').innerText = 'Please enter your email'
    // }

    // console.log(value)

    if(event.target.name.value.trim() == '' || event.target.email.value.trim() == '' || event.target.mobile_number.value.trim() == ''){
        errors = true;
        document.querySelector('.error-message').classList.remove('error');
    } else {
        errors = false;
        document.querySelector('.error-message').classList.add('error');
    }


    if(errors == false){
        console.log(event.target.name.value)
        console.log(event.target.email.value)
        event.target.reset();
    }
})

var states = [
    {id: 1, name: 'Maharashtra',country_name: 'India'},
    {id: 2, name: 'Karnataka',country_name: 'India'},
    {id: 3, name: 'Tamil Nadu',country_name: 'India'},
    {id: 4, name: 'West Bengal',country_name: 'India'},
    {id: 5, name: 'Gujarat',country_name: 'India'},
    {id: 6, name: 'Ontario',country_name: 'Canada'},
    {id: 7, name: 'Quebec',country_name: 'Canada'},
    {id: 8, name: 'British Columbia',country_name: 'Canada'},
    {id: 9, name: 'Alberta',country_name: 'Canada'},
    {id: 10, name: 'Manitoba',country_name: 'Canada'},
    {id: 11, name: 'New South Wales',country_name: 'Austraila'},
    {id: 12, name: 'Victoria',country_name: 'Austraila'},
    {id: 13, name: 'Queensland',country_name: 'Austraila'},
    {id: 14, name: 'Western Australia',country_name: 'Austraila'},
    {id: 15, name: 'South Australia',country_name: 'Austraila'}
];

document.querySelector('.country').addEventListener('change', (event) => {

    if(event.target.value != ''){
        var filterStates = states.filter((v) => {
            if(v.country_name == event.target.value){
                return v;
            }
        })

        var allStates = '<option value="">Select State</option>';

        filterStates.forEach((v) => {
            allStates += '<option value="'+ v.name +'">'+ v.name +'</option>';
        })

        document.querySelector('.state').innerHTML = allStates;

    } else {
        document.querySelector('.state').innerHTML = '<option value="">Select State</option>';
    }
})