
import React from 'react';
import Icon from './Icon';
import Link from 'next/link';
import { Property, User } from '../types';
import Image from 'next/image';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  currentUser?: User | null;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onFavorite, currentUser }) => {
  const isFavorite = currentUser?.favorites.includes(property.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <Link href={`/property/${property.id}`}>
          <Image
            src={`/${property.image}`}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {property.status}
          </span>
          {property.featured && (
            <span className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavorite?.(property.id);
          }}
          className={`absolute bottom-4 right-4 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all ${isFavorite
            ? 'bg-red-500 text-white border-none'
            : 'bg-white/90 text-slate-900 hover:bg-red-500 hover:text-white'
            }`}
        >
          <Icon name="heart" variant={isFavorite ? 'solid' : 'regular'} className="" />
        </button>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <Link href={`/property/${property.id}`} className="flex justify-between items-start mb-2 group-hover:text-blue-600">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{property.title}</h3>
          <p className="text-blue-600 font-bold whitespace-nowrap ml-2">
            ${property.price.toLocaleString()}{property.status === 'For Rent' ? '/mo' : ''}
          </p>
        </Link>
        <p className="text-slate-500 text-sm mb-4 flex items-center">
          <Icon name="map-marker-alt" className="mr-2" />
          {property.location}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-slate-600 mt-auto">
          <div className="flex items-center gap-1">
            <Icon name="bed" className="text-blue-500" />
            <span className="text-sm font-medium">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="bath" className="text-blue-500" />
            <span className="text-sm font-medium">{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="vector-square" className="text-blue-500" />
            <span className="text-sm font-medium">{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
