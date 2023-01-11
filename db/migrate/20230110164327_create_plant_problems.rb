class CreatePlantProblems < ActiveRecord::Migration[7.0]
  def change
    create_table :plant_problems do |t|
      t.belongs_to :plant, null: false, foreign_key: true
      t.belongs_to :problem, null: false, foreign_key: true

      t.timestamps
    end
  end
end
