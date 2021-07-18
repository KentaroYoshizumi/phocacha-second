class CreateShops < ActiveRecord::Migration[6.0]
  def change
    create_table :shops do |t|
      
      t.string :name, null: false
      t.integer :fee, null: false, default: 0

      t.timestamps
      
    end
  end
end
