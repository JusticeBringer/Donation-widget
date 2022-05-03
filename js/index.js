const ERROR_TEXT_ID = "error-text";
const DONATE_MONEY_ID = "donate-money";
const MONEY_STILL_NEEDED_ID = "project-money-needed";
const GIVE_NOW_MONEY_ID = "donate-money-text";
const SAVE_FOR_LATER_ID = "save-for-later";
const TELL_YOUR_FRIENDS_ID = "tell-your-friends";
const DONATION_COMPLETION_ID = "donation-completion";

const addErrorText = (text) => {
  const errorText = document.getElementById(ERROR_TEXT_ID);
  errorText.innerText = text;
  errorText.style.display = "block";
};

const removeErrorText = () => {
  const errorText = document.getElementById(ERROR_TEXT_ID);
  errorText.style.display = "none";
};

const updateWhenDonationIsOver = () => {
  const moneyDisplayed = document.getElementById(MONEY_STILL_NEEDED_ID);
  // show 0 money needed
  moneyDisplayed.innerText = "0";

  const disableButton = (buttonId) => {
    buttonId.disabled = true;
    buttonId.style.cursor = "not-allowed";
  };

  // disable give now button and update style
  const giveNowButton = document.getElementById(GIVE_NOW_MONEY_ID);
  giveNowButton.style.backgroundColor = "rgb(131, 170, 148)";
  disableButton(giveNowButton);

  const tellYourFriendsButton = document.getElementById(TELL_YOUR_FRIENDS_ID);
  tellYourFriendsButton.classList.add("draw");
};

const updateMoneyStillNeeded = (valueReceived) => {
  const moneyDisplayed = document.getElementById(MONEY_STILL_NEEDED_ID);
  const moneyDisplayedInnerText = parseInt(moneyDisplayed.innerText);
  const updatedValue = moneyDisplayedInnerText - valueReceived;
  moneyDisplayed.innerText = updatedValue.toString();

  // check if money is no longer needed
  if (updatedValue <= 0) {
    updateWhenDonationIsOver();
  }
};

const tellYourFriends = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
};

const updateDonationBarCompletion = () => {
  const moneyDisplayed = document.getElementById(MONEY_STILL_NEEDED_ID);
  const moneyDisplayedInnerText = parseInt(moneyDisplayed.innerText);

  const donationBar = document.getElementById(DONATION_COMPLETION_ID);
  const newWidth = (((1000 - moneyDisplayedInnerText) * 100) / 1000).toString();
  donationBar.style.width = newWidth.concat("%");
};

const giveNow = () => {
  const inputValue = document.getElementById(DONATE_MONEY_ID).value;

  // check if input is empty
  if (!inputValue) {
    addErrorText("This field is mandatory!");
    return;
  }

  // check if input is number
  if (isNaN(inputValue)) {
    addErrorText("Please enter a number amount!");
    return;
  }

  // remove error text
  removeErrorText();

  // update money needed
  updateMoneyStillNeeded(inputValue);

  // boost width of donation bar
  updateDonationBarCompletion();
};

const initialLoad = () => {
  const donationBar = document.getElementById(DONATION_COMPLETION_ID);
  const newWidth = (((1000 - 167) * 100) / 1000).toString();
  donationBar.style.width = newWidth.concat("%");
};

// On initial load of the page we run an initial load function
window.onload = async function () {
  initialLoad();
};
