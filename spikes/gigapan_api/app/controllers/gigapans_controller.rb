class GigapansController < ApplicationController
  before_action :set_gigapan, only: [:show, :edit, :update, :destroy]

  # GET /gigapans
  # GET /gigapans.json
  def index
    @gigapans = Gigapan.all
  end

  # GET /gigapans/1
  # GET /gigapans/1.json
  def show
  end

  # GET /gigapans/new
  def new
    @gigapan = Gigapan.new
  end

  # GET /gigapans/1/edit
  def edit
  end

  # POST /gigapans
  # POST /gigapans.json
  def create
    @gigapan = Gigapan.new(gigapan_params)

    respond_to do |format|
      if @gigapan.save
        format.html { redirect_to @gigapan, notice: 'Gigapan was successfully created.' }
        format.json { render :show, status: :created, location: @gigapan }
      else
        format.html { render :new }
        format.json { render json: @gigapan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /gigapans/1
  # PATCH/PUT /gigapans/1.json
  def update
    respond_to do |format|
      if @gigapan.update(gigapan_params)
        format.html { redirect_to @gigapan, notice: 'Gigapan was successfully updated.' }
        format.json { render :show, status: :ok, location: @gigapan }
      else
        format.html { render :edit }
        format.json { render json: @gigapan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gigapans/1
  # DELETE /gigapans/1.json
  def destroy
    @gigapan.destroy
    respond_to do |format|
      format.html { redirect_to gigapans_url, notice: 'Gigapan was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gigapan
      @gigapan = Gigapan.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def gigapan_params
      params.require(:gigapan).permit(:name, :project, :gig_id, :description)
    end
end
