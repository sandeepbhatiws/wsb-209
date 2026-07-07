var error = false;

var getData = localStorage.getItem('user_info');
getData = JSON.parse(getData);

var userData = getData ? getData : [];

document.querySelector(".user_enquiry").addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.target.name.value.trim() == "" || event.target.email.value.trim() == "" || event.target.mobile_number.value.trim() == "" || event.target.country.value == "" || event.target.state.value == "") {
        error = true
        document.querySelector(".error_hand").classList.remove("errors")
    } else {
        error = false
        document.querySelector(".error_hand").classList.add("errors")
    }

    if (error == false) {

        const data = {
            name : event.target.name.value,
            email : event.target.email.value,
            mobile_number : event.target.mobile_number.value,
            country_name : event.target.country.value,
            state_name : event.target.state.value,
        }

        userData.unshift(data);

        localStorage.setItem('user_info', JSON.stringify(userData));

        event.target.reset();
        document.querySelector(".state").innerHTML = `<option value=""> Select State </option>`;
        displayData();
    }
})

var states = [
    { id: 1, name: 'Maharashtra', country_name: 'India' },
    { id: 2, name: 'Karnataka', country_name: 'India' },
    { id: 3, name: 'Tamil Nadu', country_name: 'India' },
    { id: 4, name: 'West Bengal', country_name: 'India' },
    { id: 5, name: 'Gujarat', country_name: 'India' },

    { id: 6, name: 'Ontario', country_name: 'Canada' },
    { id: 7, name: 'Quebec', country_name: 'Canada' },
    { id: 8, name: 'British Columbia', country_name: 'Canada' },
    { id: 9, name: 'Alberta', country_name: 'Canada' },
    { id: 10, name: 'Manitoba', country_name: 'Canada' },

    { id: 11, name: 'New South Wales', country_name: 'Australia' },
    { id: 12, name: 'Victoria', country_name: 'Australia' },
    { id: 13, name: 'Queensland', country_name: 'Australia' },
    { id: 14, name: 'Western Australia', country_name: 'Australia' },
    { id: 15, name: 'South Australia', country_name: 'Australia' }
];

document.querySelector(".country").addEventListener('change', (event) => {
    if (event.target.value != "") {

        var filterstates = states.filter((e) => {

            if (e.country_name == event.target.value) {
                return e
            }
        })
        var allstates = `<option value=""> Select State </option>`

        filterstates.forEach((v) => {
            allstates += '<option value="' + v.name + '">' + v.name + '</option>  '
        });

        document.querySelector(".state").innerHTML = allstates;

    } else {
        document.querySelector(".state").innerHTML = `<option value=""> Select State </option>`;
    }
})

document.querySelector(".moon").addEventListener(("click"), () => {
    document.body.classList.toggle("dark")
})



displayData = () => {

    if(userData.length > 0){

        var userList = '';

        userData.forEach((data, index) => {
            userList += `<tr>
                <td> ${ index + 1 } </td>
                <td>${ data.name }</td>
                <td>${ data.email }</td>
                <td>${ data.mobile_number }</td>
                <td>${ data.country_name }</td>
                <td>${ data.state_name }</td>
            </tr>`;
        })

        document.getElementById('user-data').innerHTML = userList;        

    } else {
        document.getElementById('user-data').innerHTML = '<tr><td colspan="6">No Record Found !!</td></tr>'
    }
}

displayData();