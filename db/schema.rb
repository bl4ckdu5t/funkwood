# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150411010945) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: true do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.string   "place"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "placetype"
    t.datetime "date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "accepted",     default: false
  end

  add_index "appointments", ["recipient_id"], name: "index_appointments_on_recipient_id", using: :btree
  add_index "appointments", ["sender_id"], name: "index_appointments_on_sender_id", using: :btree

  create_table "chats", force: true do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.boolean  "accepted",     default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "conversations", force: true do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "conversations", ["recipient_id"], name: "index_conversations_on_recipient_id", using: :btree
  add_index "conversations", ["sender_id"], name: "index_conversations_on_sender_id", using: :btree

  create_table "messages", force: true do |t|
    t.text     "body"
    t.integer  "conversation_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["conversation_id"], name: "index_messages_on_conversation_id", using: :btree
  add_index "messages", ["user_id"], name: "index_messages_on_user_id", using: :btree

  create_table "notifications", force: true do |t|
    t.integer  "sender_id"
    t.integer  "receiver_id"
    t.string   "message"
    t.boolean  "seen",        default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "photos", force: true do |t|
    t.integer  "user_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "preferences", force: true do |t|
    t.integer  "user_id"
    t.string   "fullname"
    t.string   "username"
    t.string   "avatar"
    t.string   "gender"
    t.string   "age_range"
    t.string   "working_class"
    t.string   "career"
    t.string   "relationship_type"
    t.string   "religion"
    t.string   "complexion"
    t.string   "height"
    t.string   "weight"
    t.string   "body_type"
    t.string   "partner_complexion"
    t.string   "partner_body_type"
    t.string   "partner_working_class"
    t.string   "partner_career"
    t.string   "partner_religion"
    t.string   "location"
    t.text     "about"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "age"
  end

  add_index "preferences", ["fullname"], name: "index_preferences_on_fullname", using: :btree
  add_index "preferences", ["username"], name: "index_preferences_on_username", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
