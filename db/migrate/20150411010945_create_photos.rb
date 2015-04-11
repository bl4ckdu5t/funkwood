class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
    	t.integer :user_id
    	t.attachment :photo

      t.timestamps
    end
  end
end
