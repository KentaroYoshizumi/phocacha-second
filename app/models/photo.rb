class Photo < ApplicationRecord
  belongs_to :shop
  belongs_to :order, optional: true
  has_one :line_photo
end
