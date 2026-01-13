'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Phone, MapPin, Image as ImageIcon } from 'lucide-react';
import Logo from '../../components/Logo'; // Adjust path if needed

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const viewHouseDetails = (id: string) => {
    router.push(`/home/${id}`);
  };

  // Mock data for rental houses
  const rentalHouses = [
    {
      id: "1",
      title: "Comfortable 2BHK Flat",
      location: "Dhanmondi, Dhaka",
      price: "25,000 BDT",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400"
    },
    {
      id: "2",
      title: "Modern Studio Apartment",
      location: "Gulshan, Dhaka",
      price: "35,000 BDT",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400"
    },
    {
      id: "3",
      title: "Spacious Family House",
      location: "Uttara, Dhaka",
      price: "50,000 BDT",
      imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=400"
    }
  ];

  if (!user) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Reusable Logo that redirects to /home */}
          <Logo />

          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium hidden md:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition"
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Rentals 🎉</h2>
          <p className="text-gray-600">Find the perfect place to call home.</p>
        </div>

        {/* House Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentalHouses.map((house) => (
            <div 
              key={house.id} 
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative h-56 w-full">
                <img 
                  src={house.imageUrl} 
                  alt={house.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  {house.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{house.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <MapPin size={16} className="mr-1 text-red-400" />
                  {house.location}
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                <div className="flex justify-between items-center pt-2">
                  <button 
                    onClick={() => viewHouseDetails(house.id)}
                    className="group flex flex-col items-center gap-1 transition"
                  >
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition">
                      <Phone size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Contact</span>
                  </button>

                  <button 
                    onClick={() => viewHouseDetails(house.id)}
                    className="group flex flex-col items-center gap-1 transition"
                  >
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition">
                      <ImageIcon size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Pictures</span>
                  </button>

                  <button 
                    onClick={() => viewHouseDetails(house.id)}
                    className="group flex flex-col items-center gap-1 transition"
                  >
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition">
                      <MapPin size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider">Location</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}