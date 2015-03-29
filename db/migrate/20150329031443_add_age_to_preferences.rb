class AddAgeToPreferences < ActiveRecord::Migration
  def change
    add_column :preferences, :age, :string
  end
end
