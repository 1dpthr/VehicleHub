# VehicleHub

A comprehensive vehicle marketplace web application for buying and selling cars, bikes, and spare parts.

## 🚗 Features

- **Vehicle Listings**: Browse cars, bikes, and spare parts
- **Search & Filter**: Find vehicles by make, year, price range, and more
- **User Authentication**: Sign up, login, and manage your profile
- **Wishlist**: Save your favorite vehicles
- **Inquiry System**: Contact sellers directly through the platform
- **News Section**: Stay updated with automotive news and trends

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Storage**: localStorage (client-side)
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
VehicleHub/
├── index.html           # Main entry point
├── homePage.html        # Home page with featured vehicles
├── Bikes.html           # Bike listings page
├── SpareParts.html      # Spare parts page
├── News.html            # News and updates page
├── AboutUs.html         # About us page
├── contact.html         # Contact page
├── login.html           # Login page
├── signup.html          # Signup page
├── dashboard.html       # User dashboard
├── admin.html           # Admin panel
├── Corolla.html         # Car detail page
├── car-details-*.html   # Car detail pages
├── bike-details.html    # Bike detail page
├── sell-vehicle.html    # Sell your vehicle
├── app.js               # Main application logic
├── main.css             # Main stylesheet
├── dashboard.css        # Dashboard styles
├── auth.css             # Authentication styles
├── details.css          # Detail page styles
├── inquiry.css          # Inquiry modal styles
├── dashboard.css        # Dashboard specific styles
├── admin.css            # Admin panel styles
├── error.css            # Error page styles
├── sell.css             # Sell vehicle page styles
├── Assets/              # Local images folder
│   ├── Honda CD 70.jpeg
│   ├── Honda civic.jpeg
│   ├── Suzuki GS 150.jpeg
│   ├── Suzuki Mehran.jpeg
│   ├── Toyota Corolla.jpeg
│   ├── United US 125.jpeg
│   ├── Yamaha YBR 125.jpeg
│   ├── Engine Oil.jpeg
│   ├── Batteries.jpeg
│   ├── Brake parts.jpeg
│   ├── Interior accessories.jpeg
│   ├── Lighting.jpeg
│   └── Tire & Rims.jpeg
└── README.md            # This file
```

## 🚀 Deployment to GitHub Pages

### Prerequisites

- A GitHub account
- Git installed on your computer
- A repository for this project

### Steps to Deploy

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   ```

2. **Add All Files**:
   ```bash
   git add .
   ```

3. **Commit Changes**:
   ```bash
   git commit -m "Update images to local assets and prepare for deployment"
   ```

4. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com)
   - Click the "+" button and select "New repository"
   - Name your repository (e.g., "vehiclehub")
   - Make it public
   - Click "Create repository"

5. **Connect Local Repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   ```

6. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

7. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - In the left sidebar, click "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait a few minutes for the site to be published

8. **Access Your Website**:
   Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

### Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create and push to a new repository
gh repo create vehiclehub --public --source=. --push

# Enable GitHub Pages
gh repo pages set --branch main --dir/
```

## 📝 Image Assets

All images are stored locally in the `Assets/` folder:
- Cars: Toyota Corolla, Honda Civic, Suzuki Mehran
- Bikes: Honda CD 70, Suzuki GS 150, Yamaha YBR 125, United US 125
- Spare Parts: Engine Oil, Tires & Rims, Batteries, Brake Parts, Lighting, Interior Accessories

## 🔧 Configuration

No additional configuration required. The application uses localStorage for data persistence and requires no backend server.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any inquiries, please contact us through the contact page on the website.

