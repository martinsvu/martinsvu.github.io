const resultDiv = document.getElementById("searchdiv");
const searchInput = document.getElementById("search_input");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("message");
const keyword =searchInput.value.toLowerCase();
const apiUrl ='./travel_recommendation_api.json'
document.getElementById('search-container').addEventListener('submit',details );
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
 
function details(event) {
    event.preventDefault();
}
function clearSearch(){
    searchInput.value="";
    resultDiv.innerHTML="";
    resultDiv.style.display= "";
}
function search(){
    const results = [];
    fetch(apiUrl)
    .then(response => response.json())
        .then(data => {
            let apidata=[];
            apidata.push(data);
            apidata.countries.forEach(country => {
                // Check the country name
                if (country.name.toLowerCase().includes(keyword)) {
                  results.push(country);
                }
            
                // Check the cities of each country
                country.cities.forEach(city => {
                  if (city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)) {
                    results.push(city);
                  }
                });
              });
            
              // Search through temples
              apidata.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(keyword) || temple.description.toLowerCase().includes(keyword)) {
                  results.push(temple);
                }
              });
            
              // Search through beaches
              apidata.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(keyword) || beach.description.toLowerCase().includes(keyword)) {
                  results.push(beach);
                }
              });
            
              // Display the results
              displayResults(results);
            }
            
            // Function to display the search results
            function displayResults(results) {
             
                resultDiv.innerHTML = ''; // Clear previous results
            
              if (results.length === 0) {
                resultDiv.innerHTML = 'No results found';
                return;
              }
            
              results.forEach(item => {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result-item');
                resultDiv.innerHTML = `
                  <h3>${item.name}</h3>
                  <p>${item.description}</p>
                  <img src="${item.imageUrl}" alt="${item.name}" width="100">
                `;
                resultDiv.appendChild(resultElement);
              });
            }
        ;}
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