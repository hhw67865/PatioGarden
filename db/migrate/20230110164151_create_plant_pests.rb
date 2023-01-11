class CreatePlantPests < ActiveRecord::Migration[7.0]
  def change
    create_table :plant_pests do |t|
      t.belongs_to :plant, null: false, foreign_key: true
      t.belongs_to :pest, null: false, foreign_key: true

      t.timestamps
    end
  end
end
