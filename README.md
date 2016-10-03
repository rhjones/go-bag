# [Go Bag](https://rebekahheacock.github.io/go-bag/)

Packing lists for frequent travelers.

## About Go Bag

[Go Bag](https://rebekahheacock.github.io/go-bag/) lets frequent travelers say goodbye to hastily scribbled packing lists. Go Bag saves your packing lists—whether they're for once-in-a-lifetime adventures or monthly business trips—and lets you add and delete items, search through a database of common travel necessities, check off items as you pack for an upcoming trip, and clone, edit, and delete lists depending on your travel schedule.

Go Bag depends on a Rails API, which is at [`rebekahheacock/go-bag-api`](https://github.com/rebekahheacock/go-bag-api). The API handles user authentication and the saving and storage of packing list and item data.

## Project Planning

### User Stories

- As a user, I want to create an account so I can save lists.
- As a user, I want to create a new list for each trip.
- As a user, I want to be able to clone a list so I don't have to start from scratch for a similar trip.
- As a user, I want to be able to edit a list so I can make changes as my plans change.
- As a user, I want to be able to see all of my lists so I can easily review them.
- As a user, I want to be able to check items off my list so I can track whether I've packed them.

### Wireframes

- [Home page (medium+ screens)](docs/wireframes_00.jpg)
- [Add items to list (medium+ screens) and home page (mobile)](docs/wireframes_01.jpg)
- [Sign up and user profile (mobile)](docs/wireframes_02.jpg)

### Data Model

For complete data documentation, please see the API repo: [`rebekahheacock/go-bag-api`](https://github.com/rebekahheacock/go-bag-api).

## Development Process

I began with the [API](https://github.com/rebekahheacock/go-bag-api), scaffolding the major resources (lists and items; users and authentication were provided as part of the General Assembly [Rails API Template](https://github.com/ga-wdi-boston/rails-api-template)). After establishing relationships between my models and protecting all create/update/delete actions and some read actions, I started working on front end functionality, beginning with authentication.

After authentication I created basic forms for list and item creation and began experimenting with Devbridge's [jQuery autocomplete](https://github.com/devbridge/jQuery-Autocomplete) library to use when adding items to list. I added search functionality to the Items resource in my API to enable autocompletion on the client side.

As I kept working with the client side functionality for working with items and lists, I made small adjustments to API resources to better serve data (including adjusting serializers and creating a `default_scope` to set the order in which data records are returned).  

After the bulk of client side functionality was in place, I began working with the front-end design, separating sections of HTML into Handlebars templates and applying CSS. 

After that: cleanup, bug fixing, and tweaking. 

## Cool things I learned along the way

- Event handlers get tricky when you start using Handlebars or another templating system: you can't register event handlers for DOM elements that don't exist, so you have to register them for an element that *does* exist (or attach them to the document) and then specify the desired selector.
- Working with [jQuery autocomplete](https://github.com/devbridge/jQuery-Autocomplete) was an interesting experience: I had trouble getting it to work with protected resources, and ended up unprotecting the read methods for items. I'd like to revisit this at some point, and potentially explore the jQuery UI autocomplete functionality to see if it's more usable.
- I was able to refactor my automatic log in-on-successful-sign up functionality from the [Tic Tac Toe game](https://github.com/rebekahheacock/tic-tac-toe) I built last month. This originally used two largely redundant functions, and I was able to consilidate this into a single function.

## Next steps

- As always, I'd like to come back to my code after some time away to see if/how I can refactor it to make it more clean and efficient. I'm excited that I was able to do this with some of my earlier code for this project, and I'd like to continue revisiting old projects and applying new skills and knowledge to make them better.
- I'd like to add tags for lists, so a user can look at all of their "adventure" or "camping" lists separately from all of their "work" or "summer vacation" lists.
- I'd like to add the ability to create private items: right now, the autocomplete functionality looks at all items in the database.
- I'd like to add public/private functionality to lists, or possibly allow a many-to-many relationship between lists and users so that multiple users can view/edit the same list. 
  - Relatedly, I'd like to add permanent URLs/hashes so that the direct URL to a list can be shared.

## Dependencies / Tech / Resources

- [Webpack](https://webpack.github.io) for `require` system, build pipeline, and dev server
- [Bootstrap](http://getbootstrap.com)
- [Handlebars.js](http://handlebarsjs.com)
- [Font Awesome](http://fontawesome.io/)
- [jQuery-Autocomplete](https://github.com/devbridge/jQuery-Autocomplete)
- Free stock photos from [Pexels](https://www.pexels.com/)
- Google Fonts: [Yeseva One](https://fonts.google.com/specimen/Yeseva+One) and [Raleway](https://fonts.google.com/specimen/Raleway)


## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3.
