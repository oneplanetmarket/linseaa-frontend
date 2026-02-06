import React, { useState, useEffect } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {

    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [selectedProducerId, setSelectedProducerId] = useState('');
    const [producers, setProducers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const {axios} = useAppContext()

    // Fetch all producers on component mount
    useEffect(() => {
        const fetchProducers = async () => {
            try {
                const {data} = await axios.get('/api/seller/producers');
                if (data.success) {
                    setProducers(data.producers);
                }
            } catch (error) {
                console.error('Error fetching producers:', error);
            }
        };
        fetchProducers();
    }, [axios]);

    // Filter producers based on search term
    const filteredProducers = producers.filter(producer =>
        producer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice,
                producerId: selectedProducerId || null
            }

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i])
            }

            const {data} = await axios.post('/api/product/add', formData)

            if (data.success){
                toast.success(data.message);
                setName('');
                setDescription('')
                setCategory('')
                setPrice('')
                setOfferPrice('')
                setSelectedProducerId('')
                setFiles([])
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        
      }

    const handleProducerSelect = (producer) => {
        setSelectedProducerId(producer._id);
        setSearchTerm(producer.name);
        setShowDropdown(false);
    };

    const clearProducerSelection = () => {
        setSelectedProducerId('');
        setSearchTerm('');
        setShowDropdown(false);
    };

    const selectedProducer = producers.find(p => p._id === selectedProducerId);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>

                                <input onChange={(e)=>{
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0]
                                    setFiles(updatedFiles)
                                }}
                                type="file" id={`image${index}`} hidden />

                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=> setName(e.target.value)} value={name}
                     id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} value={description}
                     id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=> setCategory(e.target.value)} value={category} 
                    id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index)=>(
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>

                {/* Producer Selection Dropdown */}
                <div className="w-full flex flex-col gap-1 relative">
                    <label className="text-base font-medium">Assign to Producer (Optional)</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowDropdown(true);
                                if (!e.target.value) {
                                    setSelectedProducerId('');
                                }
                            }}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Search for a producer or leave empty"
                            className="outline-none md:py-2.5 py-2 px-3 pr-10 rounded border border-gray-500/40 w-full"
                        />
                        
                        {/* Clear button */}
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearProducerSelection}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}

                        {/* Selected producer display */}
                        {selectedProducer && (
                            <div className="mt-2 flex items-center gap-2 p-2 bg-gray-50 rounded border">
                                <img 
                                    src={selectedProducer.profileImageUrl || assets.profile_icon} 
                                    alt={selectedProducer.name}
                                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-700">{selectedProducer.name}</p>
                                    <p className="text-xs text-gray-500">{selectedProducer.email}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={clearProducerSelection}
                                    className="text-gray-400 hover:text-red-500 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        )}

                        {/* Dropdown list */}
                        {showDropdown && searchTerm && filteredProducers.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                                {filteredProducers.map((producer) => (
                                    <div
                                        key={producer._id}
                                        onClick={() => handleProducerSelect(producer)}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    >
                                        <img 
                                            src={producer.profileImageUrl || assets.profile_icon} 
                                            alt={producer.name}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-700">{producer.name}</p>
                                            <p className="text-xs text-gray-500">{producer.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No results message */}
                        {showDropdown && searchTerm && filteredProducers.length === 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-3">
                                <p className="text-sm text-gray-500 text-center">No producers found</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Click outside to close dropdown */}
                    {showDropdown && (
                        <div 
                            className="fixed inset-0 z-5" 
                            onClick={() => setShowDropdown(false)}
                        ></div>
                    )}
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=> setPrice(e.target.value)} value={price}
                         id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=> setOfferPrice(e.target.value)} value={offerPrice} 
                        id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
            </form>
        </div>
  )
}

export default AddProduct