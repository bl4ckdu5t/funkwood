class CreatePreferences < ActiveRecord::Migration
  def change
    create_table :preferences do |t|
    	t.integer :user_id
    	t.string :fullname
    	t.string :username
    	t.string :avatar
    	t.string :gender
    	t.string :age_range
    	t.string :working_class
    	t.string :career
    	t.string :relationship_type
    	t.string :religion
    	t.string :complexion
    	t.string :height
    	t.string :weight
    	t.string :body_type
    	t.string :partner_complexion
    	t.string :partner_body_type
    	t.string :partner_working_class
    	t.string :partner_career
    	t.string :partner_religion
      t.timestamps
    end
  end
end
