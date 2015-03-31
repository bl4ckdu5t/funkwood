class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
    	t.integer :sender_id
    	t.integer :recipient_id
    	t.string :place
    	t.string :latitude
    	t.string :longitude
    	t.string :placetype
    	t.datetime :date

      t.timestamps
    end
    add_index :appointments, :sender_id
    add_index :appointments, :recipient_id
  end
end
