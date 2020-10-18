'use strict';

const apiKey = ;

const searchURL = 'https://api.github.com/users/USERNAME/repos' ;


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.value.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></h3>
      <p>${responseJson.value[i].description}</p>
      <p>By ${responseJson.value[i].body}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getHandle(query) {
  const params = {
    q: query,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey})
  };

  fetch('https://api.github.com/repos/octocat/, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $('#js-search-term').val();
    getHandle(userHandle);
  });
}

$(watchForm);
