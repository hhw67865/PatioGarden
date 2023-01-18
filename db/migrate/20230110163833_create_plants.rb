class CreatePlants < ActiveRecord::Migration[7.0]
  def change
    create_table :plants do |t|
      t.string :name
      t.string :image_url
      t.text :description
      t.text :care

      t.timestamps
    end
  end
end
