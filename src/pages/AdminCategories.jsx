import React, { useState, useEffect } from 'react';
import AdminSidebar from '../component/AdminSidebar';
import { Menu, Plus, Shapes, Trash2, Edit2, Search, X, Check, Package, Info, AlertCircle } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const AdminCategories = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/categories`, formData, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setCategories([response.data, ...categories]);
      setFormData({ name: '', description: '' });
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/categories/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setCategories(categories.filter(cat => cat._id !== id));
    } catch (err) {
      setError("Error deleting category.");
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 w-full overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[#E6EBE8]/90 backdrop-blur-sm border-b border-gray-200/60 px-4 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-[#092A1A]"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200/70 flex-1 max-w-sm">
                <Search size={16} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-gray-700 w-full"
                />
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#092A1A] text-[#96D9C0] px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#0d3d22] transition-all"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Category</span>
            </button>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
              <Shapes size={28} className="text-[#5C8D73]" />
              Product Categories
            </h1>
            <p className="text-gray-500 text-sm mt-1">Organize your inventory with custom product categories.</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-xl flex items-center gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#092A1A]"></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <div key={cat._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#96D9C0]/5 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-150"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-[#E6EBE8] text-[#5C8D73] group-hover:bg-[#092A1A] group-hover:text-[#96D9C0] transition-colors">
                          <Package size={20} />
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-[#092A1A] hover:bg-gray-50 rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(cat._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#092A1A] mb-2">{cat.name}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {cat.description || "No description provided for this category."}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                         <span className="flex items-center gap-1.5">
                           <Info size={12} /> 0 Products
                         </span>
                         <span>By {cat.createdBy?.firstName || 'Admin'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shapes size={32} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-bold text-[#092A1A] mb-1">No categories found</h3>
                  <p className="text-sm text-gray-400 mb-6">Start by adding your first product category.</p>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="bg-[#092A1A] text-[#96D9C0] px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm"
                  >
                    Create Category
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#092A1A] px-6 py-5 flex items-center justify-between">
              <h2 className="text-white font-bold flex items-center gap-2">
                <Plus size={18} className="text-[#96D9C0]" />
                Add New Category
              </h2>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Category Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Electronics, Furniture..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#96D9C0] focus:bg-white transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Description (Optional)</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Briefly describe what this category includes..."
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#96D9C0] focus:bg-white transition-all resize-none"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#092A1A] text-[#96D9C0] px-4 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[#0d3d22] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[#96D9C0]/30 border-t-[#96D9C0] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Check size={18} /> Create Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
