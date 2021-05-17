export class Game {
  constructor(list, wordInput, timer, token) {
    this.list = list;
    this.guesses = [];
    this.wordInput = wordInput;
    this.token = token;
    this.startTime = Date.now();
    this.timer = setInterval(() => {
      // Simulate a mouse click:
      console.log("timer");
      const secondsLeft = 20 - Math.round((Date.now() - this.startTime) / 1000);
      timer.innerHTML = `${secondsLeft} s left`;

      if (secondsLeft < 0) {
        window.location.href = "/score"
      }
    }, 1000);
  }

  async submitWord() {
    const word = this.wordInput.value;
    if(this.checkIfExists(word)) return this.wordInput.value = "";
    const res = await fetch("/submitWord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.token,
      },
      body: JSON.stringify({ word }),
    });
    const { accepted } = await res.json();
    this.wordInput.value = "";

    if (accepted) this.addWordToList(word);
  }

  start() {}

  addWordToList(word) {
    this.list.insertAdjacentHTML("beforeend", `<li>${word}</li>`);
  }

  checkIfExists(word) {
    if(!this.guesses.includes(word)) {
      this.guesses = [...this.guesses, word]
      return false;
    }
    return true;
  }
}
