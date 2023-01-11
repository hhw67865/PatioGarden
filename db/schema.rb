# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_10_170346) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "comment_body"
    t.bigint "post_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "months", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pests", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "preventatives"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plant_location_months", force: :cascade do |t|
    t.bigint "plant_id", null: false
    t.bigint "location_id", null: false
    t.bigint "month_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_plant_location_months_on_location_id"
    t.index ["month_id"], name: "index_plant_location_months_on_month_id"
    t.index ["plant_id"], name: "index_plant_location_months_on_plant_id"
  end

  create_table "plant_pests", force: :cascade do |t|
    t.bigint "plant_id", null: false
    t.bigint "pest_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pest_id"], name: "index_plant_pests_on_pest_id"
    t.index ["plant_id"], name: "index_plant_pests_on_plant_id"
  end

  create_table "plant_problems", force: :cascade do |t|
    t.bigint "plant_id", null: false
    t.bigint "problem_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plant_id"], name: "index_plant_problems_on_plant_id"
    t.index ["problem_id"], name: "index_plant_problems_on_problem_id"
  end

  create_table "plants", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "care"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "post_tags", force: :cascade do |t|
    t.bigint "post_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_post_tags_on_post_id"
    t.index ["tag_id"], name: "index_post_tags_on_tag_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "post_body"
    t.bigint "user_id", null: false
    t.bigint "plant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plant_id"], name: "index_posts_on_plant_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "problems", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "preventatives"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "password_digest"
    t.string "email"
    t.text "description"
    t.string "skill_level"
    t.bigint "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_users_on_location_id"
  end

  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "plant_location_months", "locations"
  add_foreign_key "plant_location_months", "months"
  add_foreign_key "plant_location_months", "plants"
  add_foreign_key "plant_pests", "pests"
  add_foreign_key "plant_pests", "plants"
  add_foreign_key "plant_problems", "plants"
  add_foreign_key "plant_problems", "problems"
  add_foreign_key "post_tags", "posts"
  add_foreign_key "post_tags", "tags"
  add_foreign_key "posts", "plants"
  add_foreign_key "posts", "users"
  add_foreign_key "users", "locations"
end
