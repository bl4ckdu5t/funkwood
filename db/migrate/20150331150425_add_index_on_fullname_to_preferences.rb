class AddIndexOnFullnameToPreferences < ActiveRecord::Migration
  def change
  	add_index :preferences, :fullname
  end
end
