import React, { useState, useEffect } from 'react';
import UserSidebar from '../component/UserSidebar';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Menu,
  Search,
  Package,
  ShoppingCart,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';









const UserDashboard = () => {
  const [user, setUser] = useState(null)
  

 
   let navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.token
      
        
        let url = "http://localhost:5255/api/dashboard"
        axios.get(url,{
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then((res)=>{
          setUser(res.data.user)
            console.log(res.data);
        })

        .catch((err)=>{
            if(err.response && err.response.status === 401){
                localStorage.removeItem('token')
                navigate("/signin")
            }
            console.error("Error:",err.response?err.response.data:err);
        })
    }, [navigate])




const CATEGORIES = ['Electronics', 'Peripherals', 'Computers', 'Audio', 'Components', 'Accessories', 'Furniture']

const stockBadge = (stock) => {
  if (stock === 0)    return <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">Out of Stock</span>;
  if (stock <= 5)     return <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">{stock} left</span>;
  return <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">In Stock ({stock})</span>;
};



  const [isSidebarOpen, setIsSidebarOpen]   = useState(false);
  const [products, setProducts]             = useState([]);
  const [categories, setCategories]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [search, setSearch]                 = useState('');
  const [filterCat, setFilterCat]           = useState('All');
  const [apiError, setApiError]             = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [prodRes, catRes] = await Promise.all([
          axios.get('http://localhost:5255/api/products', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5255/api/categories', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching store data:", err);
        setApiError("Failed to load products from store.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSell = async (product) => {
    if (product.stock <= 0) return;

    try {
      const token = localStorage.getItem('token');
      // Decrement stock in the backend
      const res = await axios.patch(`http://localhost:5255/api/products/${product._id}`, 
        { stock: product.stock - 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
    
      setProducts(products.map(p => p._id === product._id ? res.data : p));
      
      
    } catch (err) {
      console.error("Error processing sale:", err);
      alert("Failed to process sale. Please try again.");
    }
  };

  const filtered = products
    .filter((p) => filterCat === 'All' || p.category === filterCat)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

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
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm">
                U
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-6">
        {user &&  <p className="text-gray-500 text-xl font-semibold tracking-tight mb-6 ">welcome back <span className="text-[#0A2E1A] text-2xl font-bold">{user.firstName}</span></p>}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
                <Package size={26} className="text-[#5C8D73]" />
                Store Catalogue
              </h1>
              <p className="text-gray-500 text-sm mt-1">Browse and sell available products</p>
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

          {/* Product Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex flex-col justify-center items-center h-64 gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#092A1A]"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Updating Catalogue...</p>
                </div>
              ) : (
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-[#092A1A] text-[#96D9C0]">
                      <th className="text-left text-[10px] font-bold tracking-widest uppercase px-5 py-4">Product Name</th>
                      <th className="text-left text-[10px] font-bold tracking-widest uppercase px-5 py-4">Category</th>
                      <th className="text-right text-[10px] font-bold tracking-widest uppercase px-5 py-4">Price</th>
                      <th className="text-left text-[10px] font-bold tracking-widest uppercase px-5 py-4">Stock</th>
                      <th className="text-center text-[10px] font-bold tracking-widest uppercase px-5 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-16 text-gray-400">
                          <Package size={32} className="mx-auto mb-3 opacity-20" />
                          <p className="text-sm font-semibold">No products available</p>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((product) => (
                        <tr key={product._id} className="hover:bg-[#f0f7f3] transition-colors bg-white">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-[#092A1A]">{product.name}</span>
                              {product.tag && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#092A1A] text-[#96D9C0]">{product.tag}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="text-[10px] font-bold tracking-wider text-[#092A1A] bg-[#E6EBE8] px-2.5 py-1 rounded-full uppercase">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span className="text-sm font-extrabold text-[#092A1A]">${product.price.toLocaleString()}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            {stockBadge(product.stock)}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleSell(product)}
                                disabled={product.stock === 0}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                                  product.stock > 0 
                                    ? 'bg-[#092A1A] text-[#96D9C0] hover:bg-[#0d3d22] shadow-sm' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                <ShoppingCart size={16} />
                                {product.stock > 0 ? 'Sell' : 'Sold Out'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
