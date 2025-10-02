# AI Coding Agent Instructions - Doce de Maria E-commerce

## Project Overview
This is a TypeScript React e-commerce app for a Brazilian bakery ("Doce de Maria") built with Vite, Material-UI, TailwindCSS, and React Router DOM. The app connects to a REST API at `localhost:5000` and features shopping cart functionality with checkout flow.

## Architecture & Data Flow

### Context Provider Hierarchy (Critical)
The app uses nested React Context providers in a specific order - **maintain this exact nesting**:
```tsx
<CartProvider>
  <CookieProvider>
    <CategoryProvider>
      <ProductProvider>
        <BrowserRouter>
          {/* App content */}
        </BrowserRouter>
      </ProductProvider>
    </CategoryProvider>
  </CookieProvider>
</CartProvider>
```

### State Management Pattern
- **Context over Props**: All global state uses React Context patterns, not prop drilling
- **Custom Hooks**: Each context exports a custom hook (e.g., `useCart()`, `useProducts()`)
- **Error Guards**: All custom hooks throw errors if used outside their provider

### API Service Pattern
Services return standardized response objects:
```tsx
{
  success: boolean;
  data: T[];
  message?: string;
}
```

## Key Conventions

### File Structure
- **Types**: Define in `src/types/*.tsx` files (not `.ts`)
- **Services**: Place in `src/api/services/*Service.tsx` pattern
- **Utils**: Helper functions in `src/utils/*Utils.tsx`
- **Components**: Page-specific components go in `src/pages/[page]/components/`

### Material-UI Integration
- Use `sx` prop for responsive styles: `sx={{ p: { xs: 0.5, md: 2 } }}`
- Combine MUI components with TailwindCSS classes for layouts
- Custom color palette: primary `#AA2B56`, hover `#4A7C82`

### Cart Implementation
- Cart items stored as `{ productId: number, quantity: number }`
- Product details merged via `cartWithDetails()` utility function
- Quantity changes handled through single `addItem(id, quantity)` method (can be negative)
- Cart state includes both items array and modal visibility (`isCartOpen`)

### TypeScript Patterns
- Interface names match file names (e.g., `Product.tsx` exports `Product` interface)
- Use `type` for component props, `interface` for data models
- API response mapping transforms backend fields to frontend interfaces

## Development Workflow

### Local Development
```bash
npm run dev      # Start dev server with HMR
npm run build    # TypeScript compilation + Vite build
npm run lint     # ESLint with TypeScript rules
```

### Docker Setup
Configured for containerized development with polling-based file watching:
```typescript
// vite.config.ts
server: {
  host: true,
  watch: { usePolling: true }
}
```

### API Integration
- Backend expected at `http://localhost:5000/api/*`
- All API calls go through service layer with error handling
- Products filtered by category in `ProductContext` not API calls

## Component Patterns

### Responsive Design
- Mobile-first approach with TailwindCSS
- MUI `sx` prop for component-level responsive styles
- Semantic HTML with accessibility attributes

### Navigation
- Two main routes: `/` (Home) and `/checkout`
- Cart modal overlays current page (no route change)
- External links (Instagram, WhatsApp) open in new tabs

## Business Context
- Brazilian bakery with Portuguese text/comments in code
- Operating hours: Tuesday-Sunday 06:00-20:00
- Physical location: Rua Minas Gerais 2564, Joinville, SC
- Social media integration: Instagram and WhatsApp contact

## Critical Dependencies
- **React 19** + **TypeScript 5.8** (latest versions)
- **Material-UI 7** for components, **TailwindCSS 4** for layout
- **Axios** for API calls, **React Router DOM 7** for navigation
- **Vite 7** build system with React plugin