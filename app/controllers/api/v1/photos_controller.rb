module Api
  module V1
    class PhotosController < ApplicationController
      def index
        shop = Shop.find(params[:shop_id])
        photos = shop.photos

        render json: {
          photos: photos
        }, status: :ok
      end
    end
  end
end
