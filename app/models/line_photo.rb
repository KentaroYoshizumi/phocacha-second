class LinePhoto < ApplicationRecord
  belongs_to :photo
  belongs_to :shop
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  scope :other_shop, -> (picked_shop_id) { where.not(shop_id: picked_shop_id) }

  def total_amount
   photo.price * count
  end
end
