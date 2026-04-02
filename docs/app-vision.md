# Name

- The app is called DormDeals.

# Users

- Users are college students looking to buy or sell used furniture locally for their dorms or apartments.

# Value proposition

An easy-to-use, student-focused web marketplace to quickly find, buy, and sell furniture.

# Key features

Main Marketplace Page:

- Top navigation bar featuring a search input to filter by furniture type.
- A prominent "+" button in the top right corner to add a new listing.
- A responsive grid layout displaying available furniture listings.
- Each listing card on the grid displays: Image, Price, Neighborhood, and Condition.

Detailed Listing View:

- Clicking a listing from the grid opens a larger, expanded view containing the full description.
- A "Contact" button is present on the detailed view.
- Seller contact information is hidden initially and is only revealed when the "Contact" button is clicked.

Post Creation:

- A form to add a piece of furniture with required fields for: Image, Price, Neighborhood, Condition, and Description.
- Dedicated inputs for the seller's contact information (which remains hidden from public view until requested).
- A toggle option to enable "Auction mode" for the listing.

# Example scenario

Here is an example session.

- Sarah, a college student, moves into a new apartment and needs a desk.
- She opens DormDeals on her web browser and is presented with a grid of available furniture.
- She types "desk" into the search bar at the top to filter the marketplace.
- She spots a listing with a good price in her neighborhood and clicks on it.
- A larger view opens with the desk's full description. She clicks the "Contact" button, which reveals the seller's email address, and reaches out to them.
- Later, Sarah decides to sell her old beanbag chair. She clicks the "+" button in the top right.
- She uploads a photo, enters the price, neighborhood, condition, and a brief description.
- She enters her contact information, turns on "Auction mode" to see if she can get a higher bid, and publishes the post.
- The new listing instantly appears on the main grid for other students to see.

# Coding notes

- Use a responsive framework or CSS Grid to ensure the marketplace grid displays cleanly on both desktop (Windows) and mobile (Android) browsers.
- Structure the project directory logically so it is easy to navigate and edit in environments like VS Code.
- Implement state management to handle the toggling of hidden contact information and the "Auction mode" switch.
- Set up a component for the listing card that can be reused in both the main grid and the expanded view.

# Testing notes

- Define unit tests for the search bar to ensure it accurately filters the grid by furniture type.
- Define unit tests for the listing creation flow, verifying that all fields (especially contact information) are captured correctly.
- Define unit tests for the detailed view to guarantee the contact information remains strictly hidden until the "Contact" button is clicked.
