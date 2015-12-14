class HeaderPagesController < ApplicationController
      before_filter :authenticate_user!, :except => [:home, :about, :help]
  def home
       @featured_gigapans = ProjectGigapan.where("featured = 1")
  end

  def help
  end
  
  def dash
  end
  
  

end

