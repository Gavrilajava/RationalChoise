# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_03_173107) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comparsions", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_comparsions_on_user_id"
  end

  create_table "criteria", force: :cascade do |t|
    t.string "name"
    t.integer "weight"
    t.integer "comparsion_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["comparsion_id"], name: "index_criteria_on_comparsion_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.integer "comparsion_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["comparsion_id"], name: "index_items_on_comparsion_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "values", force: :cascade do |t|
    t.integer "item_id"
    t.integer "criterium_id"
    t.string "value"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["criterium_id"], name: "index_values_on_criterium_id"
    t.index ["item_id"], name: "index_values_on_item_id"
  end

end
