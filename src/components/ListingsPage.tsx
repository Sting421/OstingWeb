import { useState } from 'react';
import { Search, MapPin, Heart, Star, ChevronDown, Home as HomeIcon } from 'lucide-react';
import './ListingsPage.css';

// Mock data for property listings
const mockListings = [
  {
    id: 1,
    title: 'Dream House Realty',
    location: 'Westwood, Austin, TX',
    price: 367000,
    rating: 4.8,
    reviews: 124,
    beds: 4,
    baths: 3,
    sqft: 2450,
    type: 'Single Family Home',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'Algo Langli Homes',
    location: 'Cedar Park, Austin, TX',
    price: 278000,
    rating: 4.7,
    reviews: 98,
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: 'Townhouse',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80'
  },
  {
    id: 3,
    title: 'Midnight Ridge Villa',
    location: 'Round Rock, Austin, TX',
    price: 452000,
    rating: 4.9,
    reviews: 156,
    beds: 5,
    baths: 3,
    sqft: 2850,
    type: 'Single Family Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 4,
    title: 'Unity Urban Homes',
    location: 'Downtown, Austin, TX',
    price: 378000,
    rating: 4.6,
    reviews: 87,
    beds: 3,
    baths: 2,
    sqft: 1650,
    type: 'Condo',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 5,
    title: 'Lakefront Thick Villa',
    location: 'Lake Travis, Austin, TX',
    price: 578000,
    rating: 4.9,
    reviews: 203,
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: 'Luxury Home',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    id: 6,
    title: 'Modern Suburban Estate',
    location: 'Pflugerville, Austin, TX',
    price: 425000,
    rating: 4.7,
    reviews: 112,
    beds: 4,
    baths: 3,
    sqft: 2350,
    type: 'Single Family Home',
    image: 'https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
];

// Price range filter options
const priceRanges = [
  { label: 'Under $300,000', min: 0, max: 300000 },
  { label: '$300,000 - $400,000', min: 300000, max: 400000 },
  { label: '$400,000 - $500,000', min: 400000, max: 500000 },
  { label: '$500,000 - $600,000', min: 500000, max: 600000 },
  { label: 'More than $600,000', min: 600000, max: Infinity }
];

// Property types
const propertyTypes = [
  'Single Family Home',
  'Condo/Townhouse',
  'Apartment',
  'Bungalow',
  'Luxury Home'
];

// Amenities
const amenities = [
  'Garden',
  'Gym',
  'Garage',
  'Pool',
  'Balcony',
  'Fireplace'
];

function PropertyCard({ listing }: { listing: any }) {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={listing.image} alt={listing.title} />
        <button className="favorite-btn">
          <Heart className="h-5 w-5" />
        </button>
        <div className="property-type">{listing.type}</div>
      </div>
      <div className="property-info">
        <div className="property-header">
          <h3 className="property-title">{listing.title}</h3>
          <div className="property-price">${listing.price.toLocaleString()}</div>
        </div>
        <div className="property-location">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{listing.location}</span>
        </div>
        <div className="property-rating">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span>{listing.rating}</span>
          <span className="text-gray-500">({listing.reviews} reviews)</span>
        </div>
        <div className="property-features">
          <div className="feature">
            <span className="feature-value">{listing.beds}</span>
            <span className="feature-label">Beds</span>
          </div>
          <div className="feature">
            <span className="feature-value">{listing.baths}</span>
            <span className="feature-label">Baths</span>
          </div>
          <div className="feature">
            <span className="feature-value">{listing.sqft}</span>
            <span className="feature-label">Sq.ft</span>
          </div>
        </div>
        <button className="view-btn">View</button>
      </div>
    </div>
  );
}

function ListingsPage() {
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Filter listings based on search term and selected filters
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    applyFilters(term, selectedPriceRanges, selectedTypes, selectedAmenities);
  };
  
  // Handle price range filter changes
  const handlePriceRangeChange = (index: number) => {
    const updatedPriceRanges = [...selectedPriceRanges];
    
    if (updatedPriceRanges.includes(index)) {
      // Remove if already selected
      const filterIndex = updatedPriceRanges.indexOf(index);
      updatedPriceRanges.splice(filterIndex, 1);
    } else {
      // Add if not selected
      updatedPriceRanges.push(index);
    }
    
    setSelectedPriceRanges(updatedPriceRanges);
    applyFilters(searchTerm, updatedPriceRanges, selectedTypes, selectedAmenities);
  };
  
  // Handle property type filter changes
  const handleTypeChange = (type: string) => {
    const updatedTypes = [...selectedTypes];
    
    if (updatedTypes.includes(type)) {
      // Remove if already selected
      const filterIndex = updatedTypes.indexOf(type);
      updatedTypes.splice(filterIndex, 1);
    } else {
      // Add if not selected
      updatedTypes.push(type);
    }
    
    setSelectedTypes(updatedTypes);
    applyFilters(searchTerm, selectedPriceRanges, updatedTypes, selectedAmenities);
  };
  
  // Handle amenity filter changes
  const handleAmenityChange = (amenity: string) => {
    const updatedAmenities = [...selectedAmenities];
    
    if (updatedAmenities.includes(amenity)) {
      // Remove if already selected
      const filterIndex = updatedAmenities.indexOf(amenity);
      updatedAmenities.splice(filterIndex, 1);
    } else {
      // Add if not selected
      updatedAmenities.push(amenity);
    }
    
    setSelectedAmenities(updatedAmenities);
    applyFilters(searchTerm, selectedPriceRanges, selectedTypes, updatedAmenities);
  };
  
  // Apply all filters
  const applyFilters = (
    term: string, 
    priceRangeIndices: number[], 
    types: string[], 
    amenityList: string[]
  ) => {
    let results = mockListings;
    
    // Apply search term filter
    if (term) {
      results = results.filter(listing => 
        listing.title.toLowerCase().includes(term.toLowerCase()) ||
        listing.location.toLowerCase().includes(term.toLowerCase()) ||
        listing.type.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Apply price range filter
    if (priceRangeIndices.length > 0) {
      results = results.filter(listing => {
        return priceRangeIndices.some(index => {
          const range = priceRanges[index];
          return listing.price >= range.min && listing.price <= range.max;
        });
      });
    }
    
    // Apply property type filter
    if (types.length > 0) {
      results = results.filter(listing => types.includes(listing.type));
    }
    
    // Apply amenities filter (placeholder for future implementation)
    if (amenityList.length > 0) {
      // This would filter based on amenities when that data is available
      // For now, we're just keeping this as a placeholder
      console.log('Amenities selected:', amenityList);
    }
    
    setFilteredListings(results);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedPriceRanges([]);
    setSelectedTypes([]);
    setSelectedAmenities([]);
    setFilteredListings(mockListings);
  };
  
  return (
    <div className="listings-page">
      <div className="listings-header">
        <h1>Real Estate Listings</h1>
        <div className="search-bar">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for properties..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="listings-container">
        <div className="filters-container">
          <div className="filter-section">
            <div className="filter-header">
              <h2>Custom Filter</h2>
              <button className="clear-btn" onClick={clearAllFilters}>Clear all</button>
            </div>
            
            {/* Location Filter */}
            <div className="filter-group">
              <div className="filter-title">
                <MapPin className="h-5 w-5" />
                <h3>Location</h3>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>
              <div className="filter-options">
                <div className="filter-option">
                  <input type="checkbox" id="location-austin" />
                  <label htmlFor="location-austin">Austin, Texas</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="location-roundrock" />
                  <label htmlFor="location-roundrock">Round Rock, Texas</label>
                </div>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="filter-group">
              <div className="filter-title">
                <span className="icon">$</span>
                <h3>Price Range</h3>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>
              <div className="filter-options">
                {priceRanges.map((range, index) => (
                  <div className="filter-option" key={index}>
                    <input 
                      type="checkbox" 
                      id={`price-${index}`} 
                      checked={selectedPriceRanges.includes(index)}
                      onChange={() => handlePriceRangeChange(index)}
                    />
                    <label htmlFor={`price-${index}`}>{range.label}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Property Type Filter */}
            <div className="filter-group">
              <div className="filter-title">
                <HomeIcon className="h-5 w-5" />
                <h3>Type of Place</h3>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>
              <div className="filter-options">
                {propertyTypes.map((type, index) => (
                  <div className="filter-option" key={index}>
                    <input 
                      type="checkbox" 
                      id={`type-${index}`} 
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    <label htmlFor={`type-${index}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Amenities Filter */}
            <div className="filter-group">
              <div className="filter-title">
                <span className="icon">✓</span>
                <h3>Amenities</h3>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>
              <div className="filter-options">
                {amenities.map((amenity, index) => (
                  <div className="filter-option" key={index}>
                    <input 
                      type="checkbox" 
                      id={`amenity-${index}`} 
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                    <label htmlFor={`amenity-${index}`}>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="properties-container">
          <div className="properties-header">
            <div className="results-count">
              Showing {filteredListings.length} properties
            </div>
            <div className="sort-options">
              <span>Sort by:</span>
              <select>
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          <div className="properties-grid">
            {filteredListings.map(listing => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingsPage;
