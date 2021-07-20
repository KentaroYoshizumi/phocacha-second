module Api
  module V1
    class OrdersController < ApplicationController
      def create
        posted_line_photos = LinePhoto.where(id: params[:line_photo_ids])
        order = Order.new(
          total_price: total_price(posted_line_photos),
        )
        if order.save_with_update_line_photos!(posted_line_photos)
          render json: {}, status: :no_content
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def total_price(posted_line_photos)
        posted_line_photos.sum {|line_photo| line_photo.total_amount } + posted_line_photos.first.shop.fee
      end
    end
  end
end
