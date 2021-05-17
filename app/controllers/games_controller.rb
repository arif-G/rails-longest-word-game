require 'net/http'

class GamesController < ApplicationController
  def new
    @letters = generate_letters

    session[:round] = { letters: @letters }
    session[:score] = 0
  end

  def score
    @total_score = session[:score]
  end

  def submit_word
    word = params[:word]
    letters = session[:round]['letters']
    accepted = matches_grid?(word, letters) && word?(word)
    score = word.length
    session[:score] += score if accepted
    render json: { accepted: accepted, letters: letters, word: word }
  end

  private

  def matches_grid?(word, letters)
    list = letters.map(&:itself)
    word.chars.each do |char|
      grid_letter = list.index(char.upcase)
      return false unless grid_letter

      list.delete_at(grid_letter)
    end
    true
  end

  def word?(word)
    uri = URI("https://wagon-dictionary.herokuapp.com/#{word}")
    res = Net::HTTP.get_response(uri)
    json = ActiveSupport::JSON.decode(res.body)
    json['found']
  end

  def generate_letters

    vowels = %w[A E I O U].sample(3)
    [*('A'..'Z').to_a.sample(7), *vowels].shuffle
  end
end
