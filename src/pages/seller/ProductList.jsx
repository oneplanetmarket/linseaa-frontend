import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { Edit3, Trash2, Package, Save, X } from 'lucide-react'

const ProductList = () => {
    const { products, currency, axios, fetchProducts } = useAppContext()
    const [editingStock, setEditingStock] = useState(null)
    const [stockValue, setStockValue] = useState('')
    const [deleting, setDeleting] = useState(null)

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock });
            if (data.success) {
                fetchProducts();
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updateStockQuantity = async (id, newStock) => {
        try {
            const { data } = await axios.post('/api/product/update-stock', { id, stock: newStock });
            if (data.success) {
                fetchProducts();
                toast.success('Stock quantity updated successfully');
                setEditingStock(null);
                setStockValue('');
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return;
        }

        try {
            setDeleting(id);
            const { data } = await axios.delete(`/api/product/delete/${id}`);
            if (data.success) {
                fetchProducts();
                toast.success('Product deleted successfully');
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setDeleting(null);
        }
    }

    const startEditingStock = (product) => {
        setEditingStock(product._id);
        setStockValue(product.stock.toString());
    }

    const cancelEditingStock = () => {
        setEditingStock(null);
        setStockValue('');
    }

    const saveStockQuantity = (id) => {
        const newStock = parseInt(stockValue, 10);
        if (isNaN(newStock) || newStock < 0) {
            toast.error('Please enter a valid stock quantity');
            return;
        }
        updateStockQuantity(id, newStock);
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-auto overflow-x-auto flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <div className="flex items-center gap-3 pb-4">
                    <Package className="w-6 h-6 text-gray-700" />
                    <h2 className="text-lg font-medium">All Products</h2>
                </div>

                {/* Horizontal scroll wrapper */}
                <div className="w-full overflow-x-auto">
                    {/* Inner container to control minimum width */}
                    <div className="min-w-[1000px] rounded-md bg-white border border-gray-500/20">
                        <table className="w-full table-auto">
                            <thead className="text-gray-900 text-sm text-left bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 font-semibold truncate">Product</th>
                                    <th className="px-4 py-3 font-semibold truncate">Producer</th>
                                    <th className="px-4 py-3 font-semibold truncate">Category</th>
                                    <th className="px-4 py-3 font-semibold truncate">Price</th>
                                    <th className="px-4 py-3 font-semibold truncate">Stock Qty</th>
                                    <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                                    <th className="px-4 py-3 font-semibold truncate">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-500">
                                {products.map((product) => (
                                    <tr key={product._id} className="border-t border-gray-500/20 hover:bg-gray-50">
                                        <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                                            <div className="border border-gray-300 rounded p-2 w-20 h-20 overflow-hidden flex items-center justify-center">
                                                <img src={product.image[0]} alt="Product" className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-800 truncate max-w-48">{product.name}</span>
                                                {product.addedBy === 'producer' && (
                                                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full mt-1 w-fit">Producer Added</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {product.producerId ? (
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={product.producerId.profileImageUrl || '/default-avatar.png'} 
                                                        alt={product.producerId.name}
                                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-700">{product.producerId.name}</span>
                                                        <span className="text-xs text-blue-600">Producer</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Admin Posted</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{product.category}</td>
                                        <td className="px-4 py-3 text-gray-700 font-medium">{currency}{product.offerPrice}</td>
                                        <td className="px-4 py-3">
                                            {editingStock === product._id ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={stockValue}
                                                        onChange={(e) => setStockValue(e.target.value)}
                                                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                                        min="0"
                                                    />
                                                    <button
                                                        onClick={() => saveStockQuantity(product._id)}
                                                        className="text-green-600 hover:text-green-700"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={cancelEditingStock}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-700">{product.stock || 0}</span>
                                                    <button
                                                        onClick={() => startEditingStock(product)}
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                                <input
                                                    onClick={() => toggleStock(product._id, !product.inStock)}
                                                    checked={product.inStock}
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                />
                                                <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                                <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                            </label>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    disabled={deleting === product._id}
                                                    className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {deleting === product._id ? (
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {products.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-500 mb-2">No Products Found</h3>
                                <p className="text-gray-400">Products will appear here once they are added.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList