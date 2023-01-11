LOCATIONS = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]
MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
TAGS = ["care", "pests", "problems", "progress"]


puts "Seeding..."

LOCATIONS.each{ |state| Location.create(name: state)}

MONTHS.each{ |month| Month.create(name:month)}

4.times do
    Plant.create(
        name: Faker::Cannabis.buzzword,
        description: Faker::Cannabis.health_benefit,
        care: "water daily"
    )
end

2.times do
    Plant.all.each{ |plant| PlantLocationMonth.create(
        plant_id: plant.id,
        location_id: Location.all.sample.id,
        month_id: Month.all.sample.id
        )}
end

8.times do
    Pest.create(
        name: Faker::Creature::Animal.name,
        description: "this is a description of the pest",
        preventatives: "these are preventatives"
        )
end


8.times do |i|
    Problem.create(
        name: "Problem #{i+1}",
        description: "this is a description of problem #{i+1}",
        preventatives: "these are preventatives for problem #{i+1}"
    )
end

2.times do
    Plant.all.each{ |plant| PlantPest.create(
        plant_id: plant.id,
        pest_id: Pest.all.sample.id
        )}
end

2.times do
    Plant.all.each{ |plant| PlantProblem.create(
        plant_id: plant.id,
        problem_id: Problem.all.sample.id
        )}
end

4.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    User.create(
        username: "#{first_name}#{last_name}",
        name: "#{first_name} #{last_name}",
        password: "Coding123!",
        email: "#{first_name}@gmail.com",
        description: Faker::Quote.yoda,
        skill_level: ["Beginner", "Intermediate", "Advanced"].sample,
        location_id: Location.all.sample.id
    )
end

TAGS.each{ |tag| Tag.create(name: tag)}

2.times do
    Plant.all.each{|plant| Post.create(
        title: Faker::Quote.robin,
        post_body: Faker::Quotes::Rajnikanth.joke,
        user_id: User.all.sample.id,
        plant_id: plant.id
    )}
end

2.times do
    Post.all.each{|post| Comment.create(
        comment_body: Faker::Quotes::Shakespeare.as_you_like_it_quote,
        post_id: post.id,
        user_id: User.all.sample.id
    )}
end

Post.all.each{|post| PostTag.create(
    post_id: post.id,
    tag_id: Tag.all.sample.id
)}

Follow.create(followed_id: 1, follower_id: 2)
Follow.create(followed_id: 2, follower_id: 3)
Follow.create(followed_id: 3, follower_id: 1)
Follow.create(followed_id: 3, follower_id: 2)

puts "Finished!"