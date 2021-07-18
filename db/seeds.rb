  3.times do |n|
    shop = Shop.new(
      name: "testショップ_#{n}",
      fee: 100
  )

  12.times do |m|
    shop.photos.build(
      name: "写真名_#{m}",
      price: 500,
      description: "写真_#{m}の説明文です。"
    )
  end

  shop.save!
end
