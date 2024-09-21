# Unit5.Capstone

## Overview

Below are links to Visual Documentations of Wireframe rought drafts, API Docs, and the Project Board outlining the construction process.

- [Project Board](https://github.com/users/JoshKing1219/projects/6)
- [Wireframes](https://whimsical.com/capstone-FhoD1E56N37sFLVebJxjGr)
- [API Docs](https://whimsical.com/api-documentation-4B2usAnUw77zMRo8Bv1pv7)

## Requirements

### Tier 1 (MVP)

AS A USER (NOT LOGGED IN), I SHOULD BE ABLE TO:

- Access the website via the Internet so I can browse and read reviews.
- View details for a specific reviewed item (store, restaurant, product, book, etc.)
  - I should be able to see the item’s average score or rating.
  - I should be able to see any relevant information about the item.
- Search for specific items, so I can see their scores and read reviews about them.
- Sign up for an account so I can have a logged-in experience.
- Log in to the site if I already have an account.

AS A LOGGED-IN USER, I SHOULD BE ABLE TO:

- Write and submit a review for an item that includes:
  - A written text review
  - A score/rating
  - Only one review should be allowed per item, per user
- View a list of all reviews I have written.
- Delete reviews I have written.
- Edit reviews I have written.
  - Change the text review.
  - Modify the score/rating.
- Write comments on reviews written by others.
- View a list of all comments I have written.
- Edit and delete my comments.

AS AN ENGINEER, I SHOULD:

- Have a well-seeded database so that I can simulate several different scenarios for the user stories below.
  - By doing this, you set yourselves up to tackle many of the points throughout the tiers. In the long run, this will potentially save you tons of time.
  - For example, seed hundreds of items and reviews with dummy data so that when you get to the “pagination” user story, you won’t have to worry about adding more.
  - Also, add a bunch of users with reviews so the review editing features can be worked on without already having the “write a review” functionality built.
- Have secured user data so that no one can unrightfully manipulate information.

### Tier 2 (Review Site Essentials)

AS A USER (NOT LOGGED IN), I SHOULD BE ABLE TO:

- Search or filter items by category.
- Enjoy an aesthetically pleasing website that is intuitive and easy to use (UI/UX).
  - Be able to use all website features whether I am using a phone, tablet, or laptop/desktop computer.
  - Navigate the website successfully regardless of disability.
    - This is a great opportunity to dive into ADA Compliance (screen-reader friendliness, keyboard navigation, colorblind-friendly, etc.).
    - Resources: [A11y Checklist](https://www.a11yproject.com/checklist/), [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
  - Know when content is loading, or there is an error so that I can manage my expectations.
    - Examples:
      - Show loading indicators while the frontend is waiting for a backend response.
      - If I visit an item page that does not exist, notify me and display a link to go to a list of all items.

AS A LOGGED-IN USER, I SHOULD BE ABLE TO:

- Add one or more images when writing or editing a review.
- View and edit my user profile so I can update my information when necessary.
- “Report” an item or review for inaccurate or inappropriate content.
- Claim ownership of a reviewed item, i.e., “I own this restaurant,” or “I wrote this book,” etc.
  - Edit information on items I own.
  - Respond to comments on that item as the owner.

AS AN ADMINISTRATOR, I SHOULD BE ABLE TO:

- View a list of all reviewed items.
- Add, edit, and remove reviewed items.
  - Normal users should not have this ability.
  - Two REQUIRED pieces of information for each item:
    - Category or Tag:
      - For example:
        - Restaurants might be tagged as burger, pizza, Indian, Chinese, etc.
        - Books might fall under sci-fi, romance, mystery, etc.
    - Picture:
      - At least one picture representing the item (restaurant photo, book cover, etc). This can be a link to a picture hosted either on your site or elsewhere on the Internet.
  - Administrators should be able to add and modify relevant information on an item. It is up to you to decide what information is relevant, necessary, or otherwise. For example:
    - Books might have Title, Author, ISBN, Publisher, Published Date, Edition, and Language, where all fields except Title and Author are optional.
    - Restaurants might have Name, Address, Phone Number, Website, Instagram Account, and Operating Hours, where all fields except Name and Address are optional.
- View a list of all users.
  - The administrator view for each user should include the users’:
    - Role (user or administrator)
    - Email address (should be unique)
    - Any other relevant information (name, review count, etc.)
- Mark users as being owners of a reviewed item.
  - Receive requests that a user has claimed ownership of an item and approve or reject the request.
  - Assign users ownership of an item with or without a request.
  - Only one user can own any given item.
- Have access to a dashboard with the following functionality:
  - Categories:
    - Create, edit, remove, and manage categories
  - Items:
    - Create, edit, remove, and manage items
    - View reports on items and manage them:
      - Dismiss them with no action
      - Approve them by modifying or removing the reported item
  - Reviews:
    - Create, edit, remove, and manage reviews
    - View reports on reviews and manage them:
      - Dismiss them with no action
      - Approve them by modifying or removing the reported review
  - Users:
    - Set other users as administrators.
    - Edit user information.
    - Remove users.

### Tier 3 (Extra Features)

AS A LOGGED-IN USER, I SHOULD BE ABLE TO:

- Log in through third-party authentication to avoid creating an account specific to the website. For example, Google OAuth.
- Add other users as co-owners of an item with the same permissions as me.
- “Follow” other users so I can:
  - View them all in one place on the site.
  - Easily navigate to and view their profiles, where I can find:
    - Their detailed information
    - Their reviews and comments
    - Their followers and followed users
  - View my followers and followed users.
- Receive notifications, either by email or on the site, for the following actions or events:
  - A review submitted on an item I own
  - A comment on a review I wrote
  - A user followed me
- View items and reviews in a more user-friendly way:
  - More advanced search and filter options
  - Pagination
  - Infinite scrolling, i.e., more items appear when you scroll to the end of the page.
- Receive recommendations for items based on my reviews.
  - For example, if I review a science fiction book, I might get a notification to check out another science fiction book.

### Deployed Link:
No deployed link at this moment.