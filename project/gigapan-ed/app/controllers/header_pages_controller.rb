class HeaderPagesController < ApplicationController
      before_filter :authenticate_user!, :except => [:home, :about, :help]
  def home
  end

  def about
  end

  def help
  end
  
  def dash
  end
  
  

end

