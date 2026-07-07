import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FilterSidebar({setRating, rating, filterCategory, setFilterCategory, setPriceFrom, setPriceTo, priceId, setPriceId}) {

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
        .then((result) => {
            setCategories(result.data.data)
        })
        .catch(() => {
            toast.error('Something went wrong !')
        })

        axios.get('https://wscubetech.co/ecommerce-api/brands.php')
        .then((result) => {
            setBrands(result.data.data)
        })
        .catch(() => {
            toast.error('Something went wrong !')
        })
    },[])

    const filterCategories = (slug) => {
        if(filterCategory.includes(slug)){
            var finalData = filterCategory.filter((v) => {
                if(v != slug){
                    return v;
                }
            })
            setFilterCategory([...finalData])
        } else {
            var finalData = [...filterCategory, slug];
            setFilterCategory(finalData)
        }
    }




    const [expandedSections, setExpandedSections] = useState({
        category: false,
        brand: false,
        price: false,
        rating: false,
        color: false,
        availability: false,
        discount: false,
    });

    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        brand: [],
        price: [],
        rating: [],
        color: [],
        availability: [],
        discount: [],
    });

    const priceRanges = [
        { id: 1, label: 'Under $50', value: 'under-50', from: '0', to: '50' },
        { id: 2, label: '$50 - $100', value: '50-100', from: '51', to: '100' },
        { id: 3, label: '$100 - $500', value: '100-500', from: '101', to: '500' },
        { id: 4, label: '$500 - $1000', value: '500-1000', from: '501', to: '1000' },
        { id: 5, label: 'Above $1000', value: 'above-1000', from: '1001', to: '1000000000000' },
    ];

    const ratings = [
        { id: 4, stars: 4, label: '4★ & above' },
        { id: 3, stars: 3, label: '3★ & above' },
        { id: 2, stars: 2, label: '2★ & above' },
        { id: 1, stars: 1, label: '1★ & above' },
    ];

    const colors = [
        { id: 1, name: 'Black', hex: '#000000' },
        { id: 2, name: 'White', hex: '#FFFFFF' },
        { id: 3, name: 'Red', hex: '#EF4444' },
        { id: 4, name: 'Blue', hex: '#3B82F6' },
        { id: 5, name: 'Green', hex: '#10B981' },
        { id: 6, name: 'Yellow', hex: '#FBBF24' },
    ];

    const availabilityOptions = [
        { id: 1, name: 'In Stock', count: 1234 },
        { id: 2, name: 'Out of Stock', count: 456 },
        { id: 3, name: 'Pre-order', count: 89 },
    ];

    const discountOptions = [
        { id: 1, label: '10% or more' },
        { id: 2, label: '20% or more' },
        { id: 3, label: '30% or more' },
        { id: 4, label: '50% or more' },
    ];

    // Toggle Section
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Handle Filter Change
    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prev) => {
            const current = prev[filterType];
            const isSelected = current.includes(value);
            return {
                ...prev,
                [filterType]: isSelected
                    ? current.filter((item) => item !== value)
                    : [...current, value],
            };
        });
    };

    // Filter Section Component
    const FilterSection = ({ title, section, children }) => (
        <div className="border-b border-gray-200 py-5 last:border-b-0 pe-0">
            <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between hover:text-blue-600 transition-colors group"
            >
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    {title}
                </h3>
                <span className="text-gray-400">
                    {expandedSections[section] ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </span>
            </button>
            {expandedSections[section] && <div className="mt-4 space-y-3">{children}</div>}
        </div>
    );

    const CheckboxItem = ({ id, label, count, filterType }) => (
        <label className="flex items-center cursor-pointer group">
            <input
                type="checkbox"
                checked={selectedFilters[filterType].includes(id)}
                onChange={() => handleFilterChange(filterType, id)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {label}
            </span>
            {count !== undefined && (
                <span className="text-xs text-gray-500">({count})</span>
            )}
        </label>
    );

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 cursor-pointer">
                        Clear All
                    </button>
                </div>

                {/* Category Filter */}
                <FilterSection title="Category" section="category">
                    <div className="space-y-3">
                        {categories.map((cat) => (
                            <label key={cat.id} className="flex items-center cursor-pointer group">
                                <input onClick={ () => filterCategories(cat.slug) }
                                    type="checkbox"
                                    defaultChecked={ filterCategory.includes(cat.slug) ? 'checked' : '' }
                                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                                    {cat.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Brand Filter */}
                <FilterSection title="Brand" section="brand">
                    <div className="space-y-3">
                        {brands.map((brand) => (
                            <CheckboxItem
                                key={brand.id}
                                id={brand.id}
                                label={brand.name}
                                count={brand.count}
                                filterType="brand"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Price Filter */}
                <FilterSection title="Price Range" section="price">
                    <div className="space-y-3">
                        {priceRanges.map((price) => (
                            <label className="flex items-center cursor-pointer group" key={price.id}>
                                <input type="radio"
                                    checked={ priceId==price.id ? 'checked' : '' }
                                    onChange={() => {
                                        setPriceId(price.id)
                                        setPriceFrom(price.from)
                                        setPriceTo(price.to)
                                    }}
                                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                                    {price.label}
                                </span>
                            </label>
                            // <CheckboxItem
                            //     key={price.id}
                            //     id={price.value}
                            //     label=
                            //     filterType="price"
                            // />
                        ))}
                    </div>
                </FilterSection>

                {/* Rating Filter */}
                <FilterSection title="Customer Rating" section="rating">
                    <div className="space-y-3">
                        {ratings.map((rate) => (
                            <label key={rate.id} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={ rate.stars == rating ? 'checked' : '' }
                                    onChange={() => {
                                        setRating(rate.stars)
                                    }}
                                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                                    <span className="text-yellow-400">★</span> {rate.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Color Filter */}
                <FilterSection title="Color" section="color">
                    <div className="grid grid-cols-3 gap-4">
                        {colors.map((color) => (
                            <label key={color.id} className="flex flex-col items-center cursor-pointer">
                                <div
                                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${selectedFilters.color.includes(color.id)
                                            ? 'border-blue-600 ring-2 ring-blue-400 ring-offset-2'
                                            : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                                <span className="text-xs text-gray-700 mt-2 text-center">{color.name}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Availability Filter */}
                <FilterSection title="Availability" section="availability">
                    <div className="space-y-3">
                        {availabilityOptions.map((option) => (
                            <CheckboxItem
                                key={option.id}
                                id={option.id}
                                label={option.name}
                                count={option.count}
                                filterType="availability"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Discount Filter */}
                <FilterSection title="Discount" section="discount">
                    <div className="space-y-3">
                        {discountOptions.map((discount) => (
                            <CheckboxItem
                                key={discount.id}
                                id={discount.id}
                                label={discount.label}
                                filterType="discount"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Apply Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}