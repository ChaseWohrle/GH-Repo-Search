'use strict';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  let searchResults = responseJson.message;
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
      </li>`
    )};
    $('#results').removeClass('hidden');
  };


/*
responseJson.[i]name
responseJson.[i]html_url
*/


function getRepos(username) {
 console.log(username);
 fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

let searchResults ;
let username  ;

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    getRepos(username);
  });
}

$(watchForm);
