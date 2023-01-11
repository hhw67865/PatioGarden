class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :name
      t.string :password_digest
      t.string :email
      t.text :description
      t.string :skill_level
      t.belongs_to :location, foreign_key: true

      t.timestamps
    end
  end
end
