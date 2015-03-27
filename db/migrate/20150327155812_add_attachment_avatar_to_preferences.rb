class AddAttachmentAvatarToPreferences < ActiveRecord::Migration
  def self.up
    change_table :preferences do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :preferences, :avatar
  end
end
