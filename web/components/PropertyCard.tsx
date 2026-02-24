import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        location: string;
        totalValuation: number;
        fundingProgress: number;
        roi: number;
        minInvestment: number;
        imageUrl: string;
        status: 'AVAILABLE' | 'FUNDED' | 'TRENDING';
    };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <div className="glass rounded-3xl overflow-hidden card-hover border border-[#222]">
            {/* Property Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${property.status === 'AVAILABLE' ? 'bg-accent text-black' :
                        property.status === 'TRENDING' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-white'
                        }`}>
                        {property.status}
                    </span>
                </div>
            </div>

            {/* Property Details */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-1 truncate">{property.title}</h3>
                <p className="text-muted text-sm mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                </p>

                {/* Financial Info */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-xs text-muted uppercase tracking-wider">Total Value</p>
                        <p className="text-lg font-bold text-white">₹{(property.totalValuation / 10000000).toFixed(2)} Cr</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted uppercase tracking-wider">ROI</p>
                        <p className="text-lg font-bold text-accent">{property.roi}%</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-white">{property.fundingProgress}% funded</span>
                        <span className="text-muted">Min. investment ₹{property.minInvestment}</span>
                    </div>
                    <div className="w-full bg-[#333] h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-accent h-full rounded-full transition-all duration-1000"
                            style={{ width: `${property.fundingProgress}%` }}
                        ></div>
                    </div>
                </div>

                <Link href={`/properties/${property.id}`} className="block w-full py-3 bg-white text-black font-black text-center rounded-xl hover:bg-gray-200 transition-all active:scale-95 uppercase text-xs tracking-widest">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
