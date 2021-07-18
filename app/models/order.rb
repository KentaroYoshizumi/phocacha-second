class Order < ApplicationRecord
  has_many :line_photos

  validates :total_price, numericality: { greater_than: 0 }

  def save_with_update_line_photos!(line_photos)
    ActiveRecord::Base.transaction do
      line_photos.each do |line_photo|
        line_photo.update_attributes!(active: false, order: self)
      end
      self.save!
    end
  end
end
