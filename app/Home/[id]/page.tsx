'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  Phone, 
  MapPin, 
  Home as HomeIcon, 
  Info, 
  CheckCircle2, 
  Share2,
  Heart
} from 'lucide-react';
import Logo from '../../../components/Logo';

export default function HouseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [house, setHouse] = useState<any>(null);

  useEffect(() => {
    // Mock data matching the IDs in your home page
    const mockData: Record<string, any> = {
      "1": {
        title: "Comfortable 2BHK Flat",
        location: "Dhanmondi, Dhaka",
        price: "25,000 BDT",
        contact: "01712-345678",
        description: "A beautiful, well-ventilated 2BHK flat located in the heart of Dhanmondi. Close to schools, hospitals, and the lake.",
        features: ["2 Bedrooms", "2 Bathrooms", "1 Balcony", "Lift & Generator", "24/7 Security"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800"
      },
      "2": {
        title: "Modern Studio Apartment",
        location: "Gulshan, Dhaka",
        price: "35,000 BDT",
        contact: "01822-998877",
        description: "Perfect for young professionals. Fully furnished studio with modern amenities and high-speed internet capability.",
        features: ["Studio Layout", "1 Modern Bath", "Fully Furnished", "AC Included", "Parking Slot"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800"
      },
      "3": {
        title: "Spacious Family House",
        location: "Uttara, Dhaka",
        price: "50,000 BDT",
        contact: "01911-554433",
        description: "A massive duplex house suitable for large families. Features a private roof garden and servant quarters.",
        features: ["4 Bedrooms", "4 Bathrooms", "Roof Garden", "Duplex", "Servant Room"],
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800"
      }
    };

    const currentHouse = mockData[params.id as string];
    if (currentHouse) {
      setHouse(currentHouse);
    }
  }, [params.id]);

  if (!house) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Action Bar with Logo */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition font-medium group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            {/* Logo Component */}
            <Logo />
          </div>

          <div className="flex gap-2">
            <button className="p-3 hover:bg-gray-100 rounded-2xl text-gray-500 transition"><Share2 size={20} /></button>
            <button className="p-3 hover:bg-gray-100 rounded-2xl text-gray-500 transition"><Heart size={20} /></button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Image View */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[350px] md:h-[550px] mb-10 group">
          <img 
            src={house.image} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt={house.title} 
          />
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md text-blue-600 px-8 py-3 rounded-2xl font-black text-xl shadow-xl">
            {house.price}/month
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">{house.title}</h1>
              <div className="flex items-center text-gray-500 text-lg">
                <div className="bg-red-50 p-2 rounded-lg mr-3">
                  <MapPin className="text-red-500" size={24} />
                </div>
                {house.location}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Info className="text-blue-500" size={22} /> Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {house.description}
              </p>
            </section>

            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <CheckCircle2 className="text-green-500" size={22} /> Features & Amenities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {house.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-md">
                      <HomeIcon size={16} className="text-blue-600" />
                    </div>
                    <span className="font-semibold text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Contact & Map Sidebar */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
              
              <h3 className="text-2xl font-black mb-8 relative z-10 italic">Contact Owner</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-[1.5rem] border border-white/20">
                  <Phone className="text-blue-200" />
                  <div>
                    <p className="text-[10px] text-blue-100 uppercase font-black tracking-[0.2em] mb-1">Phone</p>
                    <p className="text-xl font-mono font-bold">{house.contact}</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(`tel:${house.contact}`)}
                  className="w-full py-5 bg-white text-blue-600 rounded-[1.5rem] font-black text-lg hover:bg-blue-50 transition-all transform active:scale-95 shadow-xl"
                >
                  Call Now
                </button>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Location</h3>
              <div className="w-full h-56 bg-gray-50 rounded-[1.5rem] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 text-center p-6">
                <div className="bg-white p-4 rounded-full shadow-md mb-4">
                  <MapPin size={32} className="text-green-500" />
                </div>
                <p className="text-sm font-medium px-4">Interactive Maps integration coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}