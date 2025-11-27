
# FlowerCoffee 🌸☕

A calm and elegant preorder website for a combined flower shop and coffee shop. Designed for speed, simplicity, and mobile-friendly ordering.

**[View Live Site](https://ku-tadao.github.io/flowercoffee/)**

---

## About

FlowerCoffee is a small business concept that brings together fresh flowers and quality coffee in one welcoming space. This website serves as a digital extension, allowing customers to preorder with minimal friction.

## Features

### 🏠 Landing Page
- Clean introduction to the flower + coffee concept
- Visual hero with calm aesthetic
- Quick explanation of preorder rules
- Preview of coffee menu and flower bouquets
- Call-to-action buttons for ordering

### ☕ Coffee Preorders (`coffee.html`)
- Full menu: Espresso, Americano, Cappuccino, Latte
- Size selection (Small, Medium, Large)
- Quick notes (Extra shot, Less milk, Iced, etc.)
- Custom notes field
- **Same-day pickup available**
- Earliest pickup time indicator

### 💐 Flower Bouquet Preorders (`flowers.html`)
- Curated collection of 4 elegant bouquets
- Each bouquet shows included flowers
- Optional gift message with handwritten card
- Special notes for requests
- **Must order at least 1 day in advance**
- Earliest pickup date indicator

### 🛒 Ordering System
- Persistent cart (saved in browser)
- Order preview before checkout
- Customer details form (name, phone, email)
- Pickup date and time selection
- Clear pickup location details
- Order confirmation with summary
- Form validation

### 📞 Contact Page (`contact.html`)
- Business address and location info
- Opening hours
- Phone and email contact
- Directions and parking info
- Contact form for inquiries

### ✨ User Experience
- Clean, modern interface
- Mobile-first responsive design
- Calm aesthetic with warm color palette
- Smooth animations and transitions
- Toast notifications for actions
- Accessible design (ARIA labels, keyboard navigation)

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Google Fonts (Playfair Display, Inter)
- LocalStorage for cart persistence
- Static site - no backend required
- GitHub Pages ready

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Ku-Tadao/flowercoffee.git
   cd flowercoffee
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000` in your browser

### Deployment to GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select `Deploy from a branch`
3. Choose the `main` branch and `/ (root)` folder
4. Click **Save**
5. Your site will be live at `https://ku-tadao.github.io/flowercoffee/`

## Project Structure

```
flowercoffee/
├── index.html          # Landing page
├── coffee.html         # Coffee ordering page
├── flowers.html        # Flower ordering page
├── contact.html        # Contact & location page
├── css/
│   └── styles.css      # All styles
├── js/
│   └── app.js          # Application logic
└── README.md           # Documentation
```

## Pages Overview

| Page | Purpose | Key Features |
|------|---------|--------------|
| `index.html` | Landing/Home | Hero, previews, how it works |
| `coffee.html` | Coffee orders | Menu, size options, same-day pickup |
| `flowers.html` | Flower orders | Bouquets, gift message, next-day minimum |
| `contact.html` | Contact info | Location, hours, contact form |

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).
