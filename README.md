# README

PatioGarden
===============
***Created by: Henry Wu @hhw67865***

*2 week capstone project for Flatiron school*


_______________________________


"Why aren't my vegetables growing properly?"
"What are these bugs on my plants, how do I get rid of them?"
"What is the best time and place to grow this fruit?"

This application is made to answer questions like these.
PatioGarden is a knowledge base for amateur gardeners and a social media platform.
Without a login, you should be able to:
- Find the best fruits or vegetables to grow within a specific location and time.
- Obtain a brief description of the plant, how to care for it, as well as all the pests and common problems associated with it.
- Learn from other people's posts regarding the plant.
    - Posts are organized by plant and by tags.
    - Tags include: Progress, Care, Pests, and Problems.

As a user, you should be able to:
- Create an account and update it.
- Upload any picture for a profile picture.
- Delete your account.
- Create Posts, and upload any number of images in the posts.
- Follow and unfollow others.
- Direct Message other users. Websockets are used to create a responsive experience.

___________________________________________________________

How to start the application:

1. Start Postgresql server, if windows user:
    sudo service postgresql start

2. Start Rails server:
    rails s

3. Start react client server:
    cd client
    npm run dev

___________________________________________________________

Project features:
------------------


### Backend Ruby/Rails

- Ruby 2.7.4
- Rails version: 7.0.4
- Postgresql Database
- bcrypt
- active_model_serializers
- Active Storage: image_processing 1.2
- Action Cable

### Frontend React/vite

- Material UI
- react-router-dom
- Vite version: 3.2.3
