module Api
  module V1
    class LinePhotosController < ApplicationController
      before_action :set_photo, only: %i[create replace]
      def index
        line_photos = LinePhoto.active
        if line_photos.exists?
          render json: {
            line_photo_ids: line_photos.map { |line_photo| line_photo.id },
            restaurant: line_photos[0].shop,
            count: line_photos.sum { |line_photo| line_photo[:count] },
            amount: line_photos.sum { |line_photo| line_photo.total_amount },
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        if LinePhoto.active.other_shop(@ordered_photo.shop.id).exists?
          return render json: {
            existing_shop: LinePhoto.other_shop(@ordered_photo.shop.id).first.shop.name,
            new_shop: Photo.find(params[:photo_id]).shop.name,
          }, status: :not_acceptable
        end

        set_line_photo(@ordered_photo)

        if @line_photo.save
          render json: {
            line_photo: @line_photo
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        LinePhoto.active.other_shop(@ordered_photo.shop.id).each do |line_photo|
          line_photo.update_attribute(:active, false)
        end

        set_line_photo(@ordered_photo)

        if @line_photo.save
          render json: {
            line_photo: @line_photo
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_photo
        @ordered_photo = Photo.find(params[:photo_id])
      end

      def set_line_photo(ordered_photo)
        if ordered_photo.line_photo.present?
          @line_photo = ordered_photo.line_photo
          @line_photo.attributes = {
            count: ordered_photo.line_photo.count + params[:count],
            active: true
          }
        else
          @line_photo = ordered_photo.build_line_photo(
            count: params[:count],
            shop: ordered_photo.shop,
            active: true
          )
        end
      end
    end
  end
end
