class ProjectGigapansController < ApplicationController
  before_action :set_project_gigapan, only: [:show, :edit, :update, :destroy]

  # GET /project_gigapans
  # GET /project_gigapans.json
  def index
    @project_gigapans = ProjectGigapan.all
  end

  # GET /project_gigapans/1
  # GET /project_gigapans/1.json
  def show
  end

  # GET /project_gigapans/new
  def new
    @project_gigapan = ProjectGigapan.new
  end

  # GET /project_gigapans/1/edit
  def edit
  end

  # POST /project_gigapans
  # POST /project_gigapans.json
  def create
    @project_gigapan = ProjectGigapan.new(project_gigapan_params)

    respond_to do |format|
      if @project_gigapan.save
        format.html { redirect_to @project_gigapan, notice: 'Project gigapan was successfully created.' }
        format.json { render :show, status: :created, location: @project_gigapan }
      else
        format.html { render :new }
        format.json { render json: @project_gigapan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /project_gigapans/1
  # PATCH/PUT /project_gigapans/1.json
  def update
    respond_to do |format|
      if @project_gigapan.update(project_gigapan_params)
        format.html { redirect_to @project_gigapan, notice: 'Project gigapan was successfully updated.' }
        format.json { render :show, status: :ok, location: @project_gigapan }
      else
        format.html { render :edit }
        format.json { render json: @project_gigapan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /project_gigapans/1
  # DELETE /project_gigapans/1.json
  def destroy
    @project_gigapan.destroy
    respond_to do |format|
      format.html { redirect_to project_gigapans_url, notice: 'Project gigapan was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_replies(parent_comments)
   parent_comments.each do |comment|
     yield(comment)
      unless comment.comments.is_empty?
         get_replies(comment.comments) {|x| yield x}
      end
   end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_gigapan
      @project_gigapan = ProjectGigapan.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_gigapan_params
      params[:project_gigapan]
    end
end