class Api::ScoresController < ApplicationController

  def index
    @scores = Score.all.order(score: :desc)

    render json: {scores: @scores}
  end

  def create
    @score = Score.new(post_params)
    @scores = Score.all.order(score: :desc)

    if @score.save!
      render json: {score: @score}
    else
      render json: @score.errors.full_messages
    end
  end

  def destroy
    @score = Score.find(params[:id])

    if @score.destroy
      render json: {score: @score}
    else
      render json: @score.errors.full_messages
    end
  end

  private

  def post_params
    params.require(:scores).permit(:name, :score)
  end

end
