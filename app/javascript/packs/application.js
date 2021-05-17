// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import { Game } from "./game";
import "channels";

Rails.start();
Turbolinks.start();

const form = document.querySelector("#form");
const list = document.querySelector("#correctGuesses");
const wordInput = document.querySelector("#wordInput");
const timer = document.querySelector('#timer');
const token = document.querySelector('meta[name="csrf-token"]').content;

const game = new Game(list, wordInput, timer, token);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  game.submitWord();
});
