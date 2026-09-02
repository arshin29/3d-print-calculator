# Bambu Lab P2S - 3D Printing Cost & Selling Price Calculator (INR ₹)

A modern, responsive React web application built specifically for the **Bambu Lab P2S** 3D printer. It calculates true production costs in **Indian Rupees (₹ / INR)** and gives you **3 Selling Price recommendations** based on customizable profit margins.

---

## ⚡ Quick Start

### 1. Running Locally
The development server is already running! If you need to restart it in the future:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 2. Building for Production
```bash
npm run build
```
The optimized bundle is output to the `dist/` directory.

---

## 🖨️ Features & Specifications

### 1. Bambu Lab P2S Hardware Profile
- **Average Active Power Draw**: ~130W (heated bed + hotend sustained print draw)
- **Machine Wear & Maintenance Reserve**: ₹18.00 / hour (covers nozzle replacements, belt wear, carbon rod cleaning & printer depreciation)
- **Default Electricity Tariff**: ₹8.50 / kWh (fully configurable in settings)
- **Operator Labor Rate**: ₹150.00 / hour (covers file preparation, slicing, bed prep, support removal)

### 2. Built-in Indian Filament Presets (₹ / 1kg spool)
- **Bambu PLA Basic / Matte**: ₹1,599 (₹1.60/g)
- **Bambu PETG-HF / Basic**: ₹1,799 (₹1.80/g)
- **Bambu ABS / ASA**: ₹2,199 (₹2.20/g)
- **Bambu TPU 95A Flexible**: ₹2,899 (₹2.90/g)
- **Bambu PA-CF (Carbon Fiber)**: ₹4,899 (₹4.90/g)
- **Custom Filament**: Enter custom spool price and weight.

### 3. 6-Factor Cost Breakdown
1. **Material Cost**: `(Grams / Spool Weight) × Spool Price`
2. **Electricity Cost**: `(Hours × 130W / 1000) × ₹8.50/kWh`
3. **Machine Depreciation**: `Print Hours × ₹18/hr`
4. **Labor & Prep**: `15 mins @ ₹150/hr`
5. **Failure & Purge Risk**: `8% contingency buffer`
6. **Packaging & Hardware**: `₹25.00` (box, bubble wrap, pouch)

### 4. 3 Selling Price Recommendations
- **Competitive / Bulk (28% Margin)**: For friends, bulk orders, or repeat customers.
- **Standard Commercial (52% Margin)**: Recommended benchmark for Etsy, Instagram, and on-demand client jobs.
- **Rush / Premium (72% Margin)**: Express 24-hour turnaround, complex engineering filaments, or high-risk prints.
- **Interactive Sliders**: Fine-tune the margin percentage per tier in real time.
- **Margin vs. Markup Toggle**: Switch between Profit Margin % and Markup % views.

### 5. Client Quoting Tools
- **Copy Quote**: Formats a WhatsApp/Discord/Email ready message in one click.
- **Print / PDF Sheet**: View and print a formal job sheet (`Ctrl+P`).
- **Slicer Guide**: Direct reference for finding exact filament weight and print time in Bambu Studio.
