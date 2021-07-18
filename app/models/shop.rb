class Shop < ApplicationRecord
  has_many :photos
  has_many :line_photos, through: :photos

  validates :name, :fee, presence: true
  validates :name, length: { maximum: 30 }
  validates :fee, numericality: { greater_than: 0 }
end
