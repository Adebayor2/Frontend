import React, { useState, useEffect } from 'react';
import AdminSidebar from '../component/AdminSidebar';
import {
  Menu,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  Package,
  ChevronDown,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const stockBadge = (stock) => {
  if (stock === 0)    return <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">Out of Stock</span>;
  if (stock <= 5)     return <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">{stock} left</span>;
  return <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">In Stock ({stock})</span>;
};

const emptyForm = { name: '', category: '', price: '', stock: '', tag: '' };

const AdminProducts = () => {
  const [isSidebarOpen, setIsSidebarOpen]   = useState(false);
  const [products, setProducts]             = useState([]);
  const [categories, setCategories]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [search, setSearch]                 = useState('');
  const [filterCat, setFilterCat]           = useState('All');
  const [showModal, setShowModal]           = useState(false);
  const [editId, setEditId]                 = useState(null);
  const [form, setForm]                     = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm]   = useState(null);
  const [errors, setErrors]                 = useState({});
  const [apiError, setApiError]             = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setApiError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setApiError("Authentication token missing. Please sign in again.");
        setLoading(false);
        return;
      }

      console.log("Fetching products and categories...");
      const [prodRes, catRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/products`, { 
          headers: { Authorization: `Bearer ${token}` } 
        }),
        axios.get(`${API_BASE_URL}/categories`, { 
          headers: { Authorization: `Bearer ${token}` } 
        })
      ]);

      console.log("Products received:", prodRes.data);
      console.log("Categories received:", catRes.data);

      if (Array.isArray(prodRes.data)) {
        setProducts(prodRes.data);
      } else {
        console.error("Products data is not an array:", prodRes.data);
        setProducts([]);
      }

      if (Array.isArray(catRes.data)) {
        setCategories(catRes.data);
      } else {
        console.error("Categories data is not an array:", catRes.data);
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to load products or categories.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products
    .filter((p) => filterCat === 'All' || p.category === filterCat)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const validate = () => {
    const e = {};
    if (!form.name.trim())           e.name     = 'Product name is required';
    if (!form.category)              e.category = 'Category is required';
    if (!form.price || Number(form.price) <= 0) e.price = 'Enter a valid price';
    if (form.stock === '' || Number(form.stock) < 0) e.stock = 'Enter a valid stock quantity';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm, category: categories[0]?.name || '' });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditId(product._id);
    setForm({ 
      name: product.name, 
      category: product.category, 
      price: product.price, 
      stock: product.stock, 
      tag: product.tag || '' 
    });
    setErrors({});
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!validate()) return;
    setApiError('');
    try {
      const token = localStorage.getItem('token');
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      
      if (editId) {
        const res = await axios.patch(`${API_BASE_URL}/products/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.map(p => p._id === editId ? res.data : p));
      } else {
        const res = await axios.post(`${API_BASE_URL}/products`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts([res.data, ...products]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error saving product:", err);
      setApiError(err.response?.data?.message || "Error saving product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      setApiError("Error deleting product.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 w-full overflow-hidden">
        <div className="sticky top-0 z-30 bg-[#E6EBE8]/90 backdrop-blur-sm border-b border-gray-200/60 px-4 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-[#092A1A]"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-200/70 flex-1 max-w-sm">
                <Search size={15} className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                />
              </div>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-[#092A1A] text-[#96D9C0] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d3d22] transition-colors shadow-sm flex-shrink-0"
            >
              <Plus size={17} />
              <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
                <Package size={26} className="text-[#5C8D73]" />
                Products
              </h1>
              <p className="text-gray-500 text-sm mt-1">{filtered.length} of {products.length} products</p>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3.5 py-2.5 shadow-sm">
              <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-700 cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
              </select>
              <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {apiError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
               <p className="text-sm text-red-700 font-medium">{apiError}</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Products', value: products.length, color: 'bg-[#092A1A] text-white' },
              { label: 'In Stock', value: products.filter((p) => p.stock > 5).length, color: 'bg-white border border-gray-100' },
              { label: 'Low Stock', value: products.filter((p) => p.stock > 0 && p.stock <= 5).length, color: 'bg-white border border-gray-100' },
              { label: 'Out of Stock', value: products.filter((p) => p.stock === 0).length, color: 'bg-white border border-gray-100' },
            ].map(({ label, value, color }) => (
              <div key={label} className={`rounded-xl ${color} p-4 shadow-sm`}>
                <p className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${color.includes('#092A1A') ? 'text-[#96D9C0]' : 'text-gray-400'}`}>{label}</p>
                <p className={`text-2xl font-extrabold ${color.includes('#092A1A') ? 'text-white' : 'text-[#092A1A]'}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex flex-col justify-center items-center h-64 gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#092A1A]"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fetching Inventory...</p>
                </div>
              ) : (
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-[#092A1A] text-[#96D9C0]">
                      <th className="text-left text-[10px] font-bold tracking-widest uppercase px-5 py-4">#</th>
                      <th className="text-left text-[10px] font-bold tracking-widest uppercase px-5 py-4">Product Name</th>
                      <th className="text-left text-[10px] font-bold tracking-widest uppercase px-5 py-4 hidden sm:table-cell">Category</th>
                      <th className="text-right text-[10px] font-bold tracking-widest uppercase px-5 py-4">Price</th>
                      <th className="text-left text-[10px] font-bold tracking-widest uppercase px-5 py-4 hidden md:table-cell">Stock</th>
                      <th className="text-center text-[10px] font-bold tracking-widest uppercase px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16 text-gray-400">
                          <Package size={32} className="mx-auto mb-3 opacity-20" />
                          <p className="text-sm font-semibold">No products found</p>
                        </td>
                      </tr>
                    ) : filtered.map((p, idx) => (
                      <tr key={p._id} className={`group hover:bg-[#f0f7f3] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#fafcfb]'}`}>
                        <td className="px-5 py-3.5 text-xs text-gray-400 font-bold">{idx + 1}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-[#092A1A]">{p.name}</span>
                            {p.tag && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#092A1A] text-[#96D9C0]">{p.tag}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-[10px] font-bold tracking-wider text-[#092A1A] bg-[#E6EBE8] px-2.5 py-1 rounded-full">{p.category}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-sm font-extrabold text-[#092A1A]">${p.price.toLocaleString()}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">{stockBadge(p.stock)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEdit(p)}
                              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(p._id)}
                              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#092A1A]">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Package size={16} className="text-[#96D9C0]" />
                {editId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">Product Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Curved Pro Monitor"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#092A1A]/20 transition ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-[#092A1A]'}`}
                />
                {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">Category *</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#092A1A] focus:ring-2 focus:ring-[#092A1A]/20 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {errors.category && <p className="text-[10px] text-red-500 mt-1">{errors.category}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">Price ($) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="0"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#092A1A]/20 transition ${errors.price ? 'border-red-400' : 'border-gray-200 focus:border-[#092A1A]'}`}
                  />
                  {errors.price && <p className="text-[10px] text-red-500 mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">Stock Qty *</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="0"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#092A1A]/20 transition ${errors.stock ? 'border-red-400' : 'border-gray-200 focus:border-[#092A1A]'}`}
                  />
                  {errors.stock && <p className="text-[10px] text-red-500 mt-1">{errors.stock}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">Tag (optional)</label>
                <input
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  placeholder="e.g. Best Seller, New, Hot…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#092A1A] focus:ring-2 focus:ring-[#092A1A]/20 transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#092A1A] text-[#96D9C0] text-sm font-bold hover:bg-[#0d3d22] transition-colors shadow-sm"
              >
                <Check size={16} />
                {editId ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={26} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-[#092A1A] mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently remove the product from the catalogue. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
