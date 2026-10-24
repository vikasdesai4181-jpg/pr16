import { useMemo, useState } from 'react'
import catalogMark from './assets/catalog-mark.png'
import './App.css'

const initialProducts = [
  { id: 'PRD-1048', name: 'Everyday Backpack', category: 'Accessories', price: 128, stock: 34, tone: 'lavender', symbol: '▱' },
  { id: 'PRD-1047', name: 'Ceramic Pour-over Set', category: 'Home & living', price: 74, stock: 18, tone: 'peach', symbol: '◒' },
  { id: 'PRD-1046', name: 'Linen Table Throw', category: 'Home & living', price: 48, stock: 6, tone: 'sage', symbol: '▤' },
  { id: 'PRD-1045', name: 'Sculpted Glass Vase', category: 'Home & living', price: 58, stock: 0, tone: 'blue', symbol: '♢' },
  { id: 'PRD-1044', name: 'Woven Market Tote', category: 'Accessories', price: 42, stock: 27, tone: 'sand', symbol: '⌑' },
  { id: 'PRD-1043', name: 'Soft Form Candle', category: 'Home & living', price: 32, stock: 12, tone: 'rose', symbol: '♨' },
]

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
}

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

function ProductArtwork({ tone, symbol }) {
  return (
    <div className={`product-art ${tone}`} aria-hidden="true">
      <span className="art-shine" />
      <span className="art-symbol">{symbol}</span>
      <span className="art-shadow" />
    </div>
  )
}

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState(emptyProduct)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [notice, setNotice] = useState('')
  const [productCounter, setProductCounter] = useState(1049)

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesSearch = [product.name, product.id, product.category]
        .some((value) => value.toLowerCase().includes(query))
      const matchesCategory = categoryFilter === 'All categories' || product.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [categoryFilter, products, search])

  const inventoryValue = products.reduce((total, product) => total + product.price * product.stock, 0)
  const lowStockCount = products.filter((product) => product.stock > 0 && product.stock < 10).length
  const outOfStockCount = products.filter((product) => product.stock === 0).length
  const productCategories = [...new Set(products.map((product) => product.category))]

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setNotice('')
  }

  function addProduct(event) {
    event.preventDefault()
    const nextProduct = {
      ...form,
      id: `PRD-${productCounter}`,
      price: Number(form.price),
      stock: Number(form.stock),
      tone: 'lavender',
      symbol: '✳',
    }

    setProducts((currentProducts) => [nextProduct, ...currentProducts])
    setProductCounter((currentCounter) => currentCounter + 1)
    setForm(emptyProduct)
    setCategoryFilter('All categories')
    setSearch('')
    setNotice(`${nextProduct.name} was added to your products.`)
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <a className="brand" href="#products" aria-label="Goodthings home">
          <span className="brand-mark"><img src={catalogMark} alt="" /></span>
          <span>goodthings<span>.</span></span>
        </a>
        <div className="workspace-switcher">
          <div className="workspace-avatar">G</div>
          <div><strong>Goodthings Studio</strong><span>Store workspace</span></div>
          <span className="switch-chevron">⌄</span>
        </div>

        <span className="nav-label">WORKSPACE</span>
        <nav className="side-navigation" aria-label="Main navigation">
          <a href="#overview" className="nav-item"><span>⌂</span> Overview</a>
          <a href="#orders" className="nav-item"><span>▤</span> Orders <small>12</small></a>
          <a href="#products" className="nav-item active"><span>◇</span> Products <small>{products.length}</small></a>
          <a href="#customers" className="nav-item"><span>♙</span> Customers</a>
          <a href="#analytics" className="nav-item"><span>↗</span> Analytics</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="plan-card">
            <div className="plan-icon">✳</div>
            <strong>Make good things happen.</strong>
            <span>Your store is looking lovely.</span>
            <a href="mailto:help@goodthings.example">Visit help center <span>↗</span></a>
          </div>
          <div className="user-profile">
            <div className="user-avatar">JD</div>
            <div><strong>Jamie Dawson</strong><span>Store owner</span></div>
            <button type="button" aria-label="Profile options">···</button>
          </div>
        </div>
      </aside>

      <main className="main-area" id="products">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><i>/</i><strong>Products</strong></div>
          <div className="topbar-right">
            <label className="global-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />
              <kbd>⌘ K</kbd>
            </label>
            <button className="top-icon" type="button" aria-label="Notifications">♧<i /></button>
            <div className="top-avatar" aria-label="Jamie Dawson">JD</div>
          </div>
        </header>

        <div className="page-content">
          <section className="page-title-row">
            <div>
              <div className="eyebrow"><span>YOUR STORE</span><i>·</i> CATALOG</div>
              <h1>Products</h1>
              <p>Everything you make, all in one lovely place.</p>
            </div>
            <a href="#add-product" className="add-product-button"><span>＋</span> Add product</a>
          </section>

          <section className="stats-grid" aria-label="Product summary">
            <article className="stat-card">
              <div className="stat-top"><span>Total products</span><i className="stat-icon purple">◇</i></div>
              <div className="stat-value">{products.length.toString().padStart(2, '0')}<small> products in catalog</small></div>
              <div className="stat-foot"><span className="stat-trend">↗ 2 new</span><span> this month</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Inventory value</span><i className="stat-icon green">$</i></div>
              <div className="stat-value">{currency(inventoryValue)}</div>
              <div className="stat-foot"><span>Based on current stock</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Needs attention</span><i className="stat-icon peach">!</i></div>
              <div className="stat-value">{(lowStockCount + outOfStockCount).toString().padStart(2, '0')}<small> products</small></div>
              <div className="stat-foot"><span className="attention-text">{lowStockCount} low stock · {outOfStockCount} out</span></div>
            </article>
          </section>

          <div className="workspace-grid">
            <section className="catalog-panel" aria-labelledby="catalog-heading">
              <div className="catalog-heading">
                <div>
                  <h2 id="catalog-heading">Your catalog <span>{filteredProducts.length}</span></h2>
                  <p>A little inventory goes a long way.</p>
                </div>
                <label className="category-filter">
                  <span className="visually-hidden">Filter by category</span>
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                    <option>All categories</option>
                    {productCategories.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </label>
              </div>

              {notice && <div className="success-notice" role="status"><span>✓</span>{notice}</div>}

              <div className="product-list">
                {filteredProducts.map((product) => (
                  <article className="product-row" key={product.id}>
                    <ProductArtwork tone={product.tone} symbol={product.symbol} />
                    <div className="product-info">
                      <strong>{product.name}</strong>
                      <span>{product.id} <i>·</i> {product.category}</span>
                      {product.description && <small>{product.description}</small>}
                    </div>
                    <div className="product-price">{currency(product.price)}</div>
                    <div className={`stock-status${product.stock === 0 ? ' out' : product.stock < 10 ? ' low' : ''}`}>
                      <i />
                      {product.stock === 0 ? 'Out of stock' : product.stock < 10 ? `${product.stock} left` : `${product.stock} in stock`}
                    </div>
                    <button className="row-menu" type="button" aria-label={`More options for ${product.name}`}>···</button>
                  </article>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="empty-catalog">
                    <span>⌕</span>
                    <strong>No products match that search.</strong>
                    <p>Try another product name or category.</p>
                  </div>
                )}
              </div>
              <div className="catalog-footer">Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products <span>Catalog is up to date <i /></span></div>
            </section>

            <aside className="create-panel" id="add-product">
              <div className="create-heading">
                <span className="create-icon">＋</span>
                <div>
                  <span className="create-eyebrow">CREATE NEW</span>
                  <h2>Add a product</h2>
                </div>
              </div>
              <p className="create-description">Give your next great thing a home in your catalog.</p>

              <form className="product-form" onSubmit={addProduct}>
                <label className="form-field">
                  <span>Product name <b>*</b></span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="e.g. Weekend Tote"
                    maxLength={60}
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Category <b>*</b></span>
                  <select name="category" value={form.category} onChange={updateField} required>
                    <option value="" disabled>Choose a category</option>
                    <option>Accessories</option>
                    <option>Home &amp; living</option>
                    <option>Clothing</option>
                    <option>Stationery</option>
                    <option>Other</option>
                  </select>
                </label>
                <div className="form-split">
                  <label className="form-field">
                    <span>Price <b>*</b></span>
                    <div className="number-input"><span>$</span><input name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={updateField} placeholder="0.00" required /></div>
                  </label>
                  <label className="form-field">
                    <span>Stock <b>*</b></span>
                    <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={updateField} placeholder="0" required />
                  </label>
                </div>
                <label className="form-field description-field">
                  <span>Description <small>OPTIONAL</small></span>
                  <textarea name="description" value={form.description} onChange={updateField} placeholder="A few words about your product..." rows="3" maxLength={240} />
                </label>
                <button className="create-button" type="submit">Add to catalog <span>↗</span></button>
                <button className="clear-button" type="button" onClick={() => { setForm(emptyProduct); setNotice('') }}>Clear fields</button>
              </form>
              <div className="form-tip"><span>✦</span><p>Good product details help customers find their next favorite.</p></div>
            </aside>
          </div>

          <footer className="page-footer">
            <span>© 2026 goodthings</span>
            <span>Made for the things that make your day <i>✳</i></span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
