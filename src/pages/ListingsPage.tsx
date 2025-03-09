import { useState, useEffect } from 'react';
import { Search, MapPin, Heart, Star, ChevronDown, Home as HomeIcon, X, Calendar, DollarSign, Clock, Check } from 'lucide-react';
import axios from 'axios';
import '../components/ListingsPage.css';

// Property listing interface
interface PropertyListing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  image: string;
  description: string;
  yearBuilt: number | string;
  lotSize: string;
  garage: string;
  amenities: string[];
  schools: string[];
  agent: string;
  availableFrom: string;
}

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

function PropertyCard({ listing, onViewClick }: { listing: any, onViewClick: (listing: any) => void }) {
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
        <button className="view-btn" onClick={() => onViewClick(listing)}>View</button>
      </div>
    </div>
  );
}

function PropertyDetails({ listing, onClose }: { listing: any, onClose: () => void }) {
  if (!listing) return null;
  
  return (
    <div className="property-details-sidebar">
      <div className="details-header">
        <h2>Property Details</h2>
        <button className="close-btn" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="details-image">
        <img src={listing.image} alt={listing.title} />
      </div>
      
      <div className="details-content">
        <h3 className="details-title">{listing.title}</h3>
        <div className="details-location">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span>{listing.location}</span>
        </div>
        <div className="details-price">${listing.price.toLocaleString()}</div>
        
        <div className="details-features">
          <div className="details-feature">
            <span className="feature-value">{listing.beds}</span>
            <span className="feature-label">Beds</span>
          </div>
          <div className="details-feature">
            <span className="feature-value">{listing.baths}</span>
            <span className="feature-label">Baths</span>
          </div>
          <div className="details-feature">
            <span className="feature-value">{listing.sqft}</span>
            <span className="feature-label">Sq.ft</span>
          </div>
        </div>
        
        <div className="details-section">
          <h4>Description</h4>
          <p>{listing.description}</p>
        </div>
        
        <div className="details-section">
          <h4>Property Information</h4>
          <div className="details-info-item">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="info-label">Year Built:</span>
            <span className="info-value">{listing.yearBuilt}</span>
          </div>
          <div className="details-info-item">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="info-label">Lot Size:</span>
            <span className="info-value">{listing.lotSize}</span>
          </div>
          <div className="details-info-item">
            <HomeIcon className="h-4 w-4 text-blue-600" />
            <span className="info-label">Garage:</span>
            <span className="info-value">{listing.garage}</span>
          </div>
          <div className="details-info-item">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span className="info-label">Price per Sq.ft:</span>
            <span className="info-value">${Math.round(listing.price / listing.sqft)}</span>
          </div>
          <div className="details-info-item">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="info-label">Available From:</span>
            <span className="info-value">{listing.availableFrom}</span>
          </div>
        </div>
        
        <div className="details-section">
          <h4>Amenities</h4>
          <div className="amenities-list">
            {listing.amenities && listing.amenities.map((amenity: string, index: number) => (
              <div key={index} className="amenity-item">
                <Check className="h-4 w-4 text-green-600" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="details-section">
          <h4>Schools</h4>
          <div className="schools-list">
            {listing.schools && listing.schools.map((school: string, index: number) => (
              <div key={index} className="school-item">
                <span>{school}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="details-section">
          <h4>Contact</h4>
          <div className="contact-info">
            <p>Listing Agent: {listing.agent}</p>
            <button className="contact-btn">Contact Agent</button>
            <button className="schedule-btn">Schedule Viewing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingsPage() {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<PropertyListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch property listings from RapidAPI
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // const options = {
        //   method: 'GET',
        //   url: 'https://zillow-working-api.p.rapidapi.com/search/byaddress',
        //   params: {
        //     location: 'Austin Texas',
        //     page: '1',
        //     sortOrder: 'Homes_for_you',
        //     listingStatus: 'For_Sale',
        //     bed_min: 'No_Min',
        //     bed_max: 'No_Max',
        //     bathrooms: 'Any',
        //     homeType: 'Houses, Townhomes, Multi-family, Condos/Co-ops, Lots-Land, Apartments, Manufactured'
        //   },
        //   headers: {
        //     'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || 'fc33d176bdmsh77abb4787653b11p100a6cjsn63a64fd53e22',
        //     'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST || 'zillow-working-api.p.rapidapi.com'
        //   }
        // };
        
        const response = await axios.request(options);
        console.log('RapidAPI response:', response.data);
        
        // Transform the API response to match our data structure
        if (response.data && response.data.results && Array.isArray(response.data.results)) {
          const transformedData: PropertyListing[] = response.data.results.map((item: any, index: number) => ({
            id: index + 1,
            title: item.buildingName || item.streetAddress || 'Property Listing',
            location: `${item.city || 'Austin'}, ${item.state || 'TX'}`,
            price: item.price ? parseInt(item.price.replace(/[^\d]/g, '')) : 0,
            rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Random rating between 4.0-5.0
            reviews: Math.floor(Math.random() * 200) + 50, // Random number of reviews
            beds: item.bedrooms || 0,
            baths: item.bathrooms || 0,
            sqft: item.livingArea || 0,
            type: item.homeType || 'Single Family Home',
            image: item.imgSrc || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            description: item.description || 'Beautiful property with modern amenities and convenient location.',
            yearBuilt: item.yearBuilt || 'N/A',
            lotSize: item.lotSize ? `${item.lotSize} acres` : 'N/A',
            garage: item.hasGarage ? '2-car attached' : 'No garage',
            amenities: ['Central AC', 'Fireplace', 'Hardwood Floors', 'Fenced Yard', 'Patio'],
            schools: ['Local Elementary (8/10)', 'Local Middle School (7/10)', 'Local High (8/10)'],
            agent: item.brokerName || 'Local Real Estate Agent',
            availableFrom: 'Immediately'
          }));
          
          setListings(transformedData);
          setFilteredListings(transformedData);
        } else {
          throw new Error('API response format unexpected');
        }
      } catch (err) {
        console.error('Error fetching property listings:', err);
        setError('Failed to load property listings from API. Please try again later.');
        // Do not fallback to mock data, show error instead
        setListings([]);
        setFilteredListings([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListings();
  }, []);
  
  // Handle View button click
  const handleViewClick = (listing: any) => {
    setSelectedListing(listing);
    setShowDetailsSidebar(true);
  };
  
  // Close details sidebar
  const handleCloseSidebar = () => {
    setShowDetailsSidebar(false);
  };
  
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
    let results = listings;
    
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
    setFilteredListings(listings);
  };
  
  return (
    <div className={`listings-page ${showDetailsSidebar ? 'with-sidebar' : ''}`}>
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
              {isLoading ? (
                <span>Loading properties...</span>
              ) : (
                <span>Showing {filteredListings.length} properties</span>
              )}
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
          
          {isLoading ? (
            <div className="loading-container">
              <p>Loading property listings...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredListings.length > 0 ? (
                filteredListings.map(listing => (
                  <PropertyCard 
                    key={listing.id} 
                    listing={listing} 
                    onViewClick={handleViewClick}
                  />
                ))
              ) : (
                <div className="no-results">
                  <p>No properties match your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {showDetailsSidebar && (
          <PropertyDetails 
            listing={selectedListing} 
            onClose={handleCloseSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default ListingsPage;
