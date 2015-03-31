class AddIndexOnUsernameToPreferences < ActiveRecord::Migration
  def change
  	add_index :preferences, :username
  end
end
