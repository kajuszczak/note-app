# Notes Application 🗒️

A simple note-taking application that allows users to create, edit, delete, and store notes in their browser using `localStorage`.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [License](#license)

## Features

- Create new notes with a title and description.
- Edit existing notes.
- Delete notes.
- All notes are saved in the browser's `localStorage`, ensuring they persist even after a page reload.
- Search through notes by title.
- Responsive design for mobile and desktop.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **localStorage** for persistent note storage in the browser.
- **Flexbox** for layout responsiveness.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kajuszczak/note-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd note-app
   ```
3. Open the index.html file in your preferred browser:
   ```bash
   open index.html
   ```

## Usage

### Add a new note:

- Click the `Add Note` button.
- Enter a title and description.
- Click `Save` to add the note.

### Edit an existing note:

- Click the `Edit` button next to any note.
- Modify the title and description in the form.
- Click `Save` to update the note.

### Delete a note:

- Click the `Delete` button to remove a note from the list.

### Search notes:

- Use the search input field to filter notes by title.

## How to Create and Edit Notes

The `Add new` button triggers a form to appear where the user can input the note's title and content. The notes are displayed in a list where each note has an `Edit` and `Delete` button. Clicking the `Edit` button will load the note's content into the form for modification. Upon saving, the note is updated in `localStorage`, and the updated note is displayed in the list.

## Notes Storage in `localStorage`

Notes are stored as an array of objects in the browser's `localStorage`. Each object contains:

- `title` (string for the note's title)
- `content` (string for the note's body)
- `date` (date when the note was created or updated)
- `id` (unique identifier for each note)

### Example of a Note Object in `localStorage`:

```json
{
  "title": "Sample Note",
  "content": "This is the content of the note.",
  "timestamp": "Fri Oct 04 2024 16:30:50 GMT+0200 ",
  "id": 17279
}
```

## Project Structure
```
.
├── css
    ├── styles.css     # Styles for the application
    ├── variables.css  # Variables for styling
├──js
    ├── app.js         # Main JavaScript file for app logic
├── index.html         # Main HTML file for the app
└── README.md          # This file
```

## How It Works

### Adding Notes
Notes are created using an input form where users can type a title and description. Upon submission, the note is saved as an object in `localStorage`, along with a unique ID and a date of creation.

### Editing Notes
When the "Edit" button is clicked, the note's information is loaded into the input fields, allowing the user to make changes. Once edited, the note is updated in `localStorage` with updated date of edition.

### Deleting Notes
Clicking the "Delete" button removes the note from both the DOM and `localStorage`.

### LocalStorage
Notes persist in `localStorage`, which allows them to remain accessible even after the page is reloaded.
