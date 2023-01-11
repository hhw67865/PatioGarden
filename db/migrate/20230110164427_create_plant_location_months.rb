class CreatePlantLocationMonths < ActiveRecord::Migration[7.0]
  def change
    create_table :plant_location_months do |t|
      t.belongs_to :plant, null: false, foreign_key: true
      t.belongs_to :location, null: false, foreign_key: true
      t.belongs_to :month, null: false, foreign_key: true

      t.timestamps
    end
  end
end
