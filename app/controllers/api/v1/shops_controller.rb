module Api
  module V1
    class ShopsController < ApplicationController
      def index
        shops = Shop.all

        render json: {
          shops: shops
        }, status: :ok
      end
    end
  end
end
