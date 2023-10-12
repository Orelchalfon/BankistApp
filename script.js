'use strict'
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Orel Chalfon',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
}

const account2 = {
  owner: 'Jessica Davis',
  movements: [5020, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling']
])
// const accountMaxTransAction = movements =>
//   movements.reduce((acc, curr) => (acc > curr ? acc : curr), movements[0])
// console.log('max ' + accountMaxTransAction(account1.movements))
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//#region InitialValues


//#endregion

//#region AppFunc

//#region BtnConfigurations

//region LoginBtn

btnLogin.addEventListener('click', e => {
  e.preventDefault()
  const currAccount = accounts.find(
    account => account.userName === inputLoginUsername.value
  )
  console.log(currAccount)
  if (currAccount?.pin !== +inputLoginPin.value)
    return alert('UserName Or Password is Invalid')
  labelWelcome.textContent = 'Welcome back,' + currAccount.owner.split(' ')[0]
  // currAccount.owner.substring(0, currAccount.owner.indexOf(" "));
  containerApp.style.opacity = '1'
  const { movements } = currAccount

  accountBalance(movements)

  displayMove(movements)

  summaryDisplay(movements)

  // Timer();
})

//#endregion
//#endregion
//#region initialBtns
//#region CreateUserNamesForeAccounts

const createUserNamesForEachAccount = accs => {
  accs.forEach(
    acc =>
      (acc.userName = acc.owner
        .split(' ')
        .map(name => name[0])
        .join('')
        .toLowerCase())
  )
}

createUserNamesForEachAccount(accounts)
//#endregion

//#endregion

//#region InitFunctions


//#region accountBalance
const accountBalance = movements => {
  const balance = movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = balance + ' €'
}
//#endregion

//#region MovementsSummaries
const summaryDisplay = movements => {
  const income = movements
    .filter(transAction => transAction > 0)
    .reduce((acc, currTrans) => acc + currTrans, 0)
  //                        <--Outcome-->

  const outcome = movements
    .filter(transAction => transAction < 0)
    .reduce((acc, currTrans) => acc + currTrans, 0)

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 1000)
    .reduce((acc, deposit) => acc + deposit, 0)

  console.log(`Income : ${income}`)
  console.log(`Outcome : ${outcome}`)
  console.log(`Interest : ${interest}`)

  labelSumIn.textContent = Math.abs(income) + '€'
  labelSumOut.textContent = Math.abs(outcome) + '€'
  labelSumInterest.textContent = interest.toFixed(3) + '€'
}
//#endregion

//#region DisplayMov
const displayMove = movements => {
  containerMovements.innerHTML = ''

  //FOREACH LOOP ****************
  movements.forEach((mov, idx) => {
    //<div class="movements__date">3 days ago</div>

    const typeOfTransaction = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${typeOfTransaction}">${
      idx + 1
    } | ${typeOfTransaction.toUpperCase()}</div>
    <div class="movements__value">${mov}€</div>
  </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
  //MAP ****************************************************************
}

//calling the display method

//#endregion

//#region TimerFunctions

const formatTime = sec => {
  const minutes = Math.floor(sec / 60)
  const remainSec = sec % 60
  return `${minutes.toString().padStart(2, '0')}:${remainSec
    .toString()
    .padStart(2, '0')}`
}
const updateTime = sec => (labelTimer.textContent = formatTime(sec))

let remainSec = 0.1 * 60

const Timer = () => {
  updateTime(remainSec)
  const interval = setInterval(() => {
    remainSec--
    updateTime(remainSec)
    if (remainSec <= 0) {
      labelTimer.textContent = '00:00'
      clearInterval(interval)
      containerApp.style.opacity = 0
    }
  }, 1000)
}

//#endregion



//#endregion

//#endregion

//#region Challenges

//#region Computing users

const user = 'Orel Chalfon'
const names = user
  .split(' ')
  .map(name => name[0])
  .join('')
  .toLowerCase()
console.log(`users: ${user}`)
console.log(`headers: ${names}`)

//#endregion

//#region CheckDogsFunc

const CheckDogs = (dogsJulia, dogsKate) => {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2)
  const dogs = [...dogsJuliaCorrected, ...dogsKate]

  dogs.forEach(function (age, i) {
    const dogAge =
      age < 3 ? `still a puppy` : `an adult, and is ${age} years old`
    console.log(`Dog number ${i + 1} is ${dogAge}`)
  })
}

// CheckDogs([3, 5, 2, 12, 7], [4, 1, 2, 8, 3]);
//#endregion

//#region ConvertDogsAgeToHumanAge
const convertDogsAgeToHumanAge = dogsAge => {
  const humanAge = dogsAge.map(age => age * 7)

  const av = humanAge.reduce((acc, curr) => acc + curr, 0) / humanAge.length
  const avDivBy2 = humanAge.reduce(
    (acc, curr, _, arr) => acc + curr / arr.length,
    0
  )

  console.log(humanAge)
  console.log(av)
  console.log(avDivBy2)
}
// convertDogsAgeToHumanAge([3, 5, 2, 12, 7])
//#endregion

//#endregion
/////////////////////////////////////////////////
//#TODO "take care of the other forms !"; 
