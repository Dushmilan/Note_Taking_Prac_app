# 📝 Jotter Note

A feature-rich, client-side note-taking application built with vanilla JavaScript, HTML5, and CSS3. Jotter Note offers a seamless, app-like experience in your browser with offline capabilities through local storage.

![Jotter Note Screenshot](https://via.placeholder.com/800x500/2E236C/FFFFFF?text=Jotter+Note+Screenshot)

## 🏗️ Project Architecture

Jotter Note follows a modular architecture with clear separation of concerns:

```
jotter-note/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Core application logic
└── README.md           # Project documentation
```

### Core Components

1. **Data Layer**
   - Uses `localStorage` for persistent note storage
   - Implements CRUD operations for notes
   - Handles data validation and sanitization

2. **Presentation Layer**
   - Responsive layout using CSS Grid and Flexbox
   - Smooth animations and transitions
   - Dark theme with customizable color variables

3. **Business Logic**
   - Text formatting using `document.execCommand`
   - Event delegation for dynamic elements
   - Form handling and validation

## ✨ Features

### Rich Text Formatting
- **Bold/Italic/Underline** text formatting
- Real-time preview of formatted content
- Preserves formatting when editing notes

### User Experience
- **Keyboard Shortcuts**:
  - `Ctrl + Enter`: Save note
  - `Tab`: Navigate between fields
  - `Escape`: Close modals
- **Responsive Design**: Adapts to different screen sizes
- **Visual Feedback**: Hover states and loading indicators

### Data Management
- **Local Storage**: Notes persist between sessions
- **CRUD Operations**: Full support for Create, Read, Update, Delete
- **State Management**: Tracks active note and UI state

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13.1+)
- JavaScript enabled
- No server or database required

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jotter-note.git
   cd jotter-note
   ```

2. Launch the application:
   - **Option 1**: Double-click `index.html`
   - **Option 2**: Use a local server (recommended):
     ```bash
     # Using Python's built-in server
     python -m http.server 8000
     # Then open http://localhost:8000 in your browser
     ```

3. Start taking notes! Your notes will be automatically saved to your browser's local storage.

## 🛠️ Usage

1. **Create a Note**:
   - Type your title in the top field
   - Write your note in the main text area
   - Click the `+` button or press `Ctrl + Enter` to save

2. **Format Text**:
   - Select text and use the B/I/U buttons to apply formatting
   - Or use standard keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)

3. **Edit/Delete Notes**:
   - Click the eye icon to view a note
   - Click the pencil icon to edit
   - Click the trash icon to delete

## 🛠️ Technical Implementation

### Data Flow
1. **Initialization**:
   - Load notes from localStorage
   - Render note list
   - Set up event listeners

2. **Note Creation**:
   ```javascript
   function addNote() {
     const note = {
       id: Date.now(),
       title: titleInput.value,
       content: noteInput.innerHTML,
       createdAt: new Date().toISOString()
     };
     // Save to localStorage and update UI
   }
   ```

3. **Text Formatting**:
   - Uses `document.execCommand` for rich text editing
   - Maintains selection state during formatting
   - Handles edge cases with nested elements

### Performance Considerations
- **Debounced Saving**: Prevents excessive localStorage writes
- **Event Delegation**: Efficient handling of dynamic elements
- **Minimal Dependencies**: Vanilla JS for better performance

## 🎨 Design System

### Color Scheme
- Primary: `#2E236C` (Dark Blue)
- Secondary: `#433D8B` (Lighter Blue)
- Accent: `#C8ACD6` (Lavender)
- Text: `#F5F5F5` (White)
- Background: `#17153B` (Dark Navy)

### Typography
- **Primary Font**: Nunito (Clean, readable sans-serif)
- **Headings**: DM Serif Display (Elegant serif for contrast)
- **Code**: Monospace for technical elements

### Animations
- **Button Hover**: Subtle scale and color transitions
- **Modal Transitions**: Smooth fade and slide effects
- **Note Addition/Removal**: Visual feedback with animations

## 🔧 Technology Stack

### Core Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Core application logic

### Key Features
- **Local Storage API**: For data persistence
- **CSS Variables**: For theme management
- **Flexbox/Grid**: Modern layout techniques
- **Font Awesome**: For icons
- **Google Fonts**: Typography

### Development Tools
- **Browser DevTools**: For debugging
- **Git**: Version control
- **VS Code**: Code editor with extensions for linting

## 🚀 Future Improvements

### Planned Features
- [ ] Note categories/tags
- [ ] Search functionality
- [ ] Markdown support
- [ ] Note sharing
- [ ] Dark/Light theme toggle

### Technical Debt
- [ ] Add unit tests
- [ ] Improve accessibility
- [ ] Add service worker for offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues
- Limited text formatting options
- No image support
- Basic error handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- Modern CSS techniques from [CSS-Tricks](https://css-tricks.com/)

---

Made with ❤️ by [Your Name] | [Live Demo](#) | [Report Bug](https://github.com/yourusername/jotter-note/issues) | [Contribute](#-contributing)
