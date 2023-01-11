class CreatePests < ActiveRecord::Migration[7.0]
  def change
    create_table :pests do |t|
      t.string :name
      t.text :description
      t.text :preventatives

      t.timestamps
    end
  end
end
