const options = [
  {
    value: 'rock',
    beats: ['scissors', 'lizzard'],
  },
  {
    value: 'paper',
    beats: ['rock', 'spock'],
  },
  {
    value: 'scissors',
    beats: ['paper', 'lizzard'],
  },
  {
    value: 'lizzard',
    beats: ['spock', 'paper'],
  },
  {
    value: 'spock',
    beats: ['rock', 'scissors'],
  },
];

function getComputerChoice() {
  //   const options = ['rock', 'paper', 'scissors'];
  const computerIndex = Math.floor(Math.random() * options.length);
  return options[computerIndex].value;
}

// const buttons = document.querySelectorAll('[data-rps]');
// for (const button of buttons) {
//   button.addEventListener('click', handleUserClick);
// }

// Event delegation
document.addEventListener('click', handleUserClick);

function handleUserClick(e) {
  const userChoice = e.target.dataset.rps;
  if (userChoice === undefined) {
    // daca nu s-a dat click pe unul dintre butoane
    return;
  }

  const computerChoice = getComputerChoice();

  document.querySelector('[data-rps-user-choice]').innerText = userChoice;
  document.querySelector('[data-rps-computer-choice]').innerText =
    computerChoice;

  const results = getResults(userChoice, computerChoice);
  displayResults(results);
}

function getResults(user, computer) {
  if (user === computer) {
    return 'tie';
  }

  // user === 'lizzard'
  // We need to find the option that has a value of lizzard so that we can see what it beats
  const optionObj = options.find((option) => option.value === user);
  //   console.log(optionObj.beats);

  if (optionObj.beats.includes(computer)) {
    return 'user';
  } else {
    return 'computer';
  }
}

function displayResults(results) {
  let message = 'The winner is: ' + results;

  if (results === 'tie') {
    message = "It's a tie!";
  }

  document.querySelector('[data-rps-results]').innerText = message;
}
