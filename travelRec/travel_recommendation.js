const resultDiv = document.getElementById("searchdiv");
const searchInput = document.getElementById("search_input");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("message");
const apiUrl ='./travel_recommendation_api.json'
const timezones =[
    {name:"Sydney", time:"new Date().toLocaleTimeString('en-US', {timeZone:'Australia/Sydney', hour12: true, hour: 'numeric', minute: 'numeric'});"},
    {name:"Melbourne", time:"new Date().toLocaleTimeString('en-US', {timeZone:'Australia/Melbourne', hour12: true, hour: 'numeric', minute: 'numeric'}"},
    {name:"Tokyo", time:"new Date().toLocaleTimeString('en-US', {timeZone:'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric'}"},
    {name:"Kyoto", time:"new Date().toLocaleTimeString('en-US', {timeZone:'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric'}"},
    {name:"Rio de Janeiro", time:"new Date().toLocaleTimeString('en-US', {timeZone:'America/Sao_Paulo', hour12: true, hour: 'numeric', minute: 'numeric'}"},
    {name:"São Paulo", time:"Date().toLocaleTimeString('en-US', {timeZone:'America/Sao_Paulo', hour12: true, hour: 'numeric', minute: 'numeric'}"},
    {name:"Angkor Wat", time:"Date().toLocaleTimeString('en-US', {timeZone:'Asia/Phnom_Penh', hour12: true, hour: 'numeric', minute: 'numeric'}"},
    {name:"Taj Mahal", time:"Date().toLocaleTimeString('en-US', {timeZone:'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric'}"},
    {name:"Bora Bora", time:"Date().toLocaleTimeString('en-US', {timeZone:'Pacific/Tahiti', hour12: true, hour: 'numeric', minute: 'numeric'}"}
];
function clearSearch(){
    searchInput.value="";
    resultDiv.innerHTML="";
    resultDiv.style.display= "";
}
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('GET Request Result:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
function message(){
    if(contactEmail.value && contactName.value && contactMessage.value !=""){
        alert("Your message has been recieved!");
        contactEmail.value="";
        contactMessage.value="";
        contactName.value="";
    }else {
        alert("Please fill out all of the form fields");
    }
}
//search term array
//return object name to var keyword if search term input.value matches any object propertie in search terms array ?find?
//filter data for keyword return index to index array
//if data contains keyword return data.foreach.indexarray formated for html from data[indexarray].name, .imgurl . description
//clear search input