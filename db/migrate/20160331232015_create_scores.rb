class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :name, null: false
      t.integer :score, null: false
      t.timestamps null: false
    end
  end
end
