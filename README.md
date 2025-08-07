# 🧩 AsyncAPI DnD YAML Generator

This project is a React + Vite application that lets you drag and drop AsyncAPI components, edit their fields, and generate a valid YAML document for use with AsyncAPI tools.

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/DataProductLab/data-product-designer.git
cd data-product-designer
```

### 2. Install Node.js (if not already installed)

- Download from: https://nodejs.org/
- Recommended: **LTS version (e.g., 20.x or 18.x)**
- This will install both `node` and `npm`.

To verify installation:

```bash
node -v
npm -v
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Dev Server

```bash
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Stack

- [Vite](https://vitejs.dev/)
- React
- [dnd-kit](https://github.com/clauderic/dnd-kit)
- [js-yaml](https://github.com/nodeca/js-yaml)
- (Optional) Tailwind CSS

---

## 📦 Node Version (optional)

If you use `nvm` to manage Node versions:

1. Create a `.nvmrc` file with the version you're using:

```bash
echo "20" > .nvmrc
```

2. Then run:

```bash
nvm use
```

If the version isn’t installed:

```bash
nvm install
```

---

## 🔧 Scripts

Make sure your `package.json` includes the following scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 📄 License

MIT License. Contributions welcome!