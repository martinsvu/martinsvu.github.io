const resultDiv = document.getElementById("searchdiv");
const searchInput = document.getElementById("search_input");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("message");
const keyword =searchInput.value.toLowerCase();
const apiUrl ='./travel_recommendation_api.json'
document.getElementById('search-container').addEventListener('submit',details );
const timezones =[
    {name:"Sydney, Australia", timeZone:'Australia/Sydney'},
    {name:"Melbourne, Australia", timeZone:'Australia/Melbourne'},
    {name:"Tokyo, Japan", timeZone:'Asia/Tokyo'},
    {name:"Kyoto, Japan", timeZone:'Asia/Tokyo'},
    {name:"Rio de Janeiro, Brazil", timeZone:'America/Sao_Paulo'},
    {name:"São Paulo, Brazil", timeZone:'America/Sao_Paulo'},
    {name:"Angkor Wat, Cambodia", timeZone:'Asia/Phnom_Penh'},
    {name:"Taj Mahal, India", timeZone:'Asia/Kolkata'},
    {name:"Bora Bora, French Polynesia", timeZone:'Pacific/Tahiti'},
    {name:"Copacabana Beach, Brazil", timeZone:'America/Sao_Paulo'}
];
function details(event) {
    event.preventDefault();
}
function clearSearch(){
    searchInput.value="";
    resultDiv.innerHTML="";
    resultDiv.style.display= "none";
}
function search(){
  const keyword=searchInput.value.toLowerCase();
  if (keyword ==""){
    resultDiv.style.display="inherit";
    resultDiv.innerHTML = "Maybe try typing something in the search box";
    return;
  }
    const results = [];
    fetch(apiUrl)
    .then(response => response.json())
        .then(data => {
            data.countries.forEach(country => {
                if (country.name.toLowerCase().includes(keyword) || keyword.includes("count")) {
                  results.push(...country.cities);
                }else{
                country.cities.forEach(city => {
                  if (city.name.toLowerCase().includes(keyword)) {
                    results.push(city);
                  }
                });}
              });
                  if(keyword.includes("temple")){
                    results.push(...data.temples);
                  }
                data.temples.forEach(temple => {
                  if (temple.name.toLowerCase().includes(keyword)) {
                    results.push(temple);
                  }
              });
                  if(keyword.includes("beach")){
                    results.push(...data.beaches);
                  }else{
                data.beaches.forEach(beach => {
                  if (beach.name.toLowerCase().includes(keyword)) {
                    results.push(beach);
                  }
              });}
                displayResults(results, timezones);
              });
}
            function displayResults(results, timezones) {
                resultDiv.innerHTML = '';
                searchInput.value="";
              if (results.length === 0) {
                resultDiv.innerHTML = 'No results found';
                return;
              }
              results.forEach(item => {
                const timezone = timezones.find(tz => tz.name = item.name);
                let localTime = 'Time not available';
                if (timezone) {
                  localTime = new Date().toLocaleTimeString('en-US', {
                    timeZone: timezone.timeZone,
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric'
                  });
                }
                resultDiv.style.display= "inherit";
                resultDiv.innerHTML += `
                  <img src="${item.imageUrl}" alt="${item.name}" width="200">  
                  <h3>${item.name}</h3>
                  <p>The local time is now:${localTime}<p>
                  <p>${item.description}</p>
                  <hr>
                `;
              });
            }
function message(){
    if(contactEmail.value && contactName.value && contactMessage.value !=""){
        alert("Your message has been sent!");
        contactEmail.value="";
        contactMessage.value="";
        contactName.value="";
    }else {
        alert("Please fill out all of the form fields");
    }
}