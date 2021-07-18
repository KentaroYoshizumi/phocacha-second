class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      
      t.references :shop, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :price, null: false
      t.text :description, null: false

      t.timestamps
      
    end
  end
end
