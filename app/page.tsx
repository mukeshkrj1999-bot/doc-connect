'use client';
import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Star, Phone, Clock } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  city: string;
  experience: number;
  rating: number;
  phone: string;
  available_days: string[];
  timing: string;
  consultation_fee: number;
  address: string;
}

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const sampleDoctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialty: "General Physician",
      location: "Civil Lines",
      city: "Khurja",
      experience: 15,
      rating: 4.5,
      phone: "+91-9876543210",
      available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      timing: "9:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
      consultation_fee: 300,
      address: "Kumar Clinic, Near Railway Station, Khurja"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialty: "Pediatrician",
      location: "Sadar Bazaar",
      city: "Khurja",
      experience: 10,
      rating: 4.8,
      phone: "+91-9876543211",
      available_days: ["Mon", "Wed", "Fri", "Sat"],
      timing: "10:00 AM - 1:00 PM, 4:00 PM - 7:00 PM",
      consultation_fee: 400,
      address: "Child Care Center, Sadar Bazaar, Khurja"
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      specialty: "Cardiologist",
      location: "Civil Lines",
      city: "Bulandshahr",
      experience: 20,
      rating: 4.7,
      phone: "+91-9876543212",
      available_days: ["Tue", "Thu", "Sat"],
      timing: "11:00 AM - 3:00 PM",
      consultation_fee: 600,
      address: "Heart Care Clinic, Civil Lines, Bulandshahr"
    },
    {
      id: 4,
      name: "Dr. Sunita Singh",
      specialty: "Gynecologist",
      location: "Kotwali Road",
      city: "Bulandshahr",
      experience: 12,
      rating: 4.6,
      phone: "+91-9876543213",
      available_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      timing: "9:00 AM - 1:00 PM, 5:00 PM - 7:00 PM",
      consultation_fee: 500,
      address: "Women's Health Center, Kotwali Road, Bulandshahr"
    },
    {
      id: 5,
      name: "Dr. Vikram Yadav",
      specialty: "Orthopedic",
      location: "GT Road",
      city: "Khurja",
      experience: 18,
      rating: 4.4,
      phone: "+91-9876543214",
      available_days: ["Mon", "Wed", "Fri", "Sat"],
      timing: "10:00 AM - 2:00 PM, 6:00 PM - 9:00 PM",
      consultation_fee: 550,
      address: "Bone & Joint Clinic, GT Road, Khurja"
    },
    {
      id: 6,
      name: "Dr. Neha Gupta",
      specialty: "Dermatologist",
      location: "Mandi Samiti",
      city: "Khurja",
      experience: 8,
      rating: 4.3,
      phone: "+91-9876543215",
      available_days: ["Tue", "Thu", "Sat", "Sun"],
      timing: "11:00 AM - 3:00 PM, 5:00 PM - 8:00 PM",
      consultation_fee: 450,
      address: "Skin Care Clinic, Mandi Samiti, Khurja"
    },
    {
      id: 7,
      name: "Dr. Anil Chauhan",
      specialty: "ENT Specialist",
      location: "Pahasu Road",
      city: "Bulandshahr",
      experience: 14,
      rating: 4.5,
      phone: "+91-9876543216",
      available_days: ["Mon", "Tue", "Wed", "Fri", "Sat"],
      timing: "9:00 AM - 1:00 PM, 4:00 PM - 7:00 PM",
      consultation_fee: 400,
      address: "ENT Care Center, Pahasu Road, Bulandshahr"
    },
    {
      id: 8,
      name: "Dr. Kavita Jain",
      specialty: "Dentist",
      location: "Naya Bazaar",
      city: "Khurja",
      experience: 9,
      rating: 4.6,
      phone: "+91-9876543217",
      available_days: ["Mon", "Wed", "Thu", "Fri", "Sat"],
      timing: "10:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
      consultation_fee: 350,
      address: "Dental Care Clinic, Naya Bazaar, Khurja"
    },
    {
      id: 9,
      name: "Dr. Manoj Tyagi",
      specialty: "General Physician",
      location: "Sikandrabad Road",
      city: "Bulandshahr",
      experience: 16,
      rating: 4.4,
      phone: "+91-9876543218",
      available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      timing: "8:00 AM - 2:00 PM, 6:00 PM - 9:00 PM",
      consultation_fee: 300,
      address: "Tyagi Clinic, Sikandrabad Road, Bulandshahr"
    },
    {
      id: 10,
      name: "Dr. Pooja Agarwal",
      specialty: "Ophthalmologist",
      location: "Station Road",
      city: "Khurja",
      experience: 11,
      rating: 4.7,
      phone: "+91-9876543219",
      available_days: ["Tue", "Wed", "Thu", "Sat"],
      timing: "10:00 AM - 1:00 PM, 4:00 PM - 7:00 PM",
      consultation_fee: 500,
      address: "Eye Care Hospital, Station Road, Khurja"
    }
  ];

  useEffect(() => {
    setDoctors(sampleDoctors);
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || doctor.city === selectedCity;
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesCity && matchesSpecialty;
  });

  const specialties = ['all', ...Array.from(new Set(doctors.map(d => d.specialty)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-indigo-600">Doc Connect</h1>
          <p className="text-gray-600 mt-2">Find and book nearby doctors in Khurja & Bulandshahr</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">All Cities</option>
              <option value="Khurja">Khurja</option>
              <option value="Bulandshahr">Bulandshahr</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                <p className="text-indigo-100">{doctor.specialty}</p>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-center text-gray-700">
                  <MapPin size={18} className="mr-2 text-indigo-500" />
                  <span className="text-sm">{doctor.location}, {doctor.city}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Clock size={18} className="mr-2 text-indigo-500" />
                  <span className="text-sm">{doctor.timing}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Phone size={18} className="mr-2 text-indigo-500" />
                  <span className="text-sm">{doctor.phone}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={18} className="mr-1 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({doctor.experience} yrs exp)</span>
                  </div>
                  <span className="text-indigo-600 font-bold">₹{doctor.consultation_fee}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {doctor.available_days.map(day => (
                    <span key={day} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                      {day}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Calendar size={18} className="mr-2" />
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria</p>
          </div>
        )}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Book Appointment</h2>
            <div className="space-y-3 mb-6">
              <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
              <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
              <p><strong>Address:</strong> {selectedDoctor.address}</p>
              <p><strong>Fee:</strong> ₹{selectedDoctor.consultation_fee}</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                placeholder="Your Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option>Select Time Slot</option>
                <option>Morning (9:00 AM - 12:00 PM)</option>
                <option>Afternoon (12:00 PM - 3:00 PM)</option>
                <option>Evening (5:00 PM - 8:00 PM)</option>
              </select>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Appointment booked successfully! You will receive a confirmation call.');
                  setSelectedDoctor(null);
                }}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}