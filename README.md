# StyleHub - Premium E-commerce Clothing Store

A modern, responsive e-commerce website built with Next.js 14, TypeScript, Tailwind CSS, and integrated with ShipEngine API for real-time shipping calculations.

## Features

- **Modern Design**: Clean, professional UI with Tailwind CSS and Framer Motion animations
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- **Product Categories**: Men's, Women's, and Kids' clothing sections
- **Shopping Cart**: Add/remove items, update quantities, persistent storage
- **Wishlist**: Save favorite products for later
- **Product Search**: Real-time search functionality
- **Shipping Integration**: Real-time shipping rates via ShipEngine API
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Next.js 14 with App Router, image optimization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Image Optimization**: Next.js Image component
- **API Integration**: ShipEngine for shipping rates

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- ShipEngine API key (optional for demo)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clothing-store-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.template .env.local
   ```
   
   Edit `.env.local` and add your ShipEngine API key:
   ```
   SHIPENGINE_API_KEY=your_shipengine_api_key_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ShipEngine API Setup

### Getting a ShipEngine API Key

1. **Sign up for ShipEngine**
   - Visit [ShipEngine.com](https://www.shipengine.com/)
   - Create a free account
   - Complete the registration process

2. **Get your API key**
   - Log into your ShipEngine dashboard
   - Navigate to "API Keys" section
   - Copy your API key
   - Add it to your `.env.local` file

3. **Configure carriers (optional)**
   - In your ShipEngine dashboard, connect your preferred carriers
   - Update the carrier IDs in the shipping API route if needed

**Note**: The application includes mock shipping rates for demo purposes if ShipEngine is not configured.

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── category/          # Category pages
│   ├── products/          # Product detail pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── wishlist/          # Wishlist page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── Hero.tsx
│   ├── ShippingForm.tsx
│   └── LoadingSpinner.tsx
├── data/                  # Static data
│   └── products.json      # Product catalog
├── lib/                   # Utilities and stores
│   ├── store.ts           # Zustand store
│   └── shipping.ts        # Shipping utilities
└── types/                 # TypeScript definitions
    └── index.ts
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `SHIPENGINE_API_KEY`
     - `NEXT_PUBLIC_SITE_URL`

3. **Configure domain (optional)**
   - Add custom domain in Vercel dashboard
   - Update `NEXT_PUBLIC_SITE_URL` environment variable

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Adding Products

Edit `src/data/products.json` to add or modify products:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "category": "men|women|kids",
  "price": 29.99,
  "description": "Product description",
  "image": "https://example.com/image.jpg",
  "sizes": ["S", "M", "L", "XL"],
  "inStock": true,
  "featured": false
}
```

### Styling

- Modify `tailwind.config.js` for theme customization
- Update color scheme in the config file
- Add custom CSS in `src/app/globals.css`

### Shipping Configuration

- Update shipping origin address in `src/app/api/shipping-rates/route.ts`
- Modify package dimensions and weight calculations
- Add additional carriers in ShipEngine dashboard

## Features in Detail

### Shopping Cart
- Persistent storage using Zustand with localStorage
- Size selection for each product
- Quantity management
- Real-time total calculations

### Wishlist
- Add/remove products from wishlist
- Persistent storage
- Visual indicators for wishlisted items

### Search
- Real-time product filtering
- Search by name, description, or category
- Responsive search interface

### Shipping
- Integration with ShipEngine API
- Real-time rate calculations
- Multiple shipping options
- Address validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.