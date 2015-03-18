class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.string :message
      t.boolean :seen, default: false

      t.timestamps
    end
  end
end
