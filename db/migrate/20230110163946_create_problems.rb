class CreateProblems < ActiveRecord::Migration[7.0]
  def change
    create_table :problems do |t|
      t.string :name
      t.string :image_url
      t.text :description
      t.text :preventatives

      t.timestamps
    end
  end
end
