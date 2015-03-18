class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.integer :sender_id
      t.integer :recipient_id
      t.boolean :accepted, default: false

      t.timestamps
    end
  end
end
