class CreatePeople < ActiveRecord::Migration[5.0]
  def change
    create_table :people do |t|
      t.string :name
      t.string :bio
      t.boolean :bioVisible

      t.timestamps
    end
  end
end
