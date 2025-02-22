"use client"
import { ChangeEvent, JSX, useState,MouseEvent } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Home, Briefcase, Users, MapPin, Edit2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
}

type AddressType = keyof typeof addressTypes;

interface Address {
  type: keyof typeof addressTypes;
  address: string;
  icon: JSX.Element;
}

const rideData = [
  { month: 'Jan', rides: 12 },
  { month: 'Feb', rides: 19 },
  { month: 'Mar', rides: 15 },
  { month: 'Apr', rides: 25 },
  { month: 'May', rides: 22 },
  { month: 'Jun', rides: 30 },
];

const locationData = [
  { location: 'Downtown', visits: 45 },
  { location: 'Airport', visits: 38 },
  { location: 'Mall', visits: 28 },
  { location: 'Beach', visits: 22 },
  { location: 'Park', visits: 15 },
];

const addressTypes = {
  home: { icon: <Home className="w-4 h-4" /> },
  work: { icon: <Briefcase className="w-4 h-4" /> },
  friends: { icon: <Users className="w-4 h-4" /> },
  other: { icon: <MapPin className="w-4 h-4" /> }
} as const;

export default function AccountInfo() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    bio: 'Frequent traveler, always on the move. Love exploring new places and meeting new people.',
    image: '/images/profile.jpg'
  });

  
  const [addresses, setAddresses] = useState([
    { type: 'home', address: '123 Home Street, Cityville', icon: <Home className="w-4 h-4" /> },
    { type: 'work', address: '456 Office Avenue, Worktown', icon: <Briefcase className="w-4 h-4" /> },
    { type: 'friends', address: '789 Friend Lane, Socialburg', icon: <Users className="w-4 h-4" /> },
  ]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [newProfileData, setNewProfileData] = useState<ProfileData>(profileData);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'icon'>>({
    type: 'home',
    address: ''
  });

  const handleAddressTypeChange = (value: AddressType) => {
    setNewAddress(prev => ({ ...prev, type: value }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAddress(prev => ({ ...prev, address: e.target.value }));
  };

  

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setNewProfileData(prev => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newAddressWithIcon = {
      ...newAddress,
      icon: addressTypes[newAddress.type].icon
    };

    if (editingAddress !== null) {
      setAddresses(addresses.map((addr, idx) => 
        idx === editingAddress ? newAddressWithIcon : addr
      ));
    } else {
      setAddresses([...addresses, newAddressWithIcon]);
    }
    setIsAddressModalOpen(false);
    setEditingAddress(null);
    setNewAddress({ type: 'home', address: '' });
  };

  const handleEditAddress = (index: number) => {
    const address = addresses[index];
    setEditingAddress(index);    
    setNewAddress({
      type: address.type as AddressType,
      address: address.address
    });
    setIsAddressModalOpen(true);
  };

  const handleProfileUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProfileData(newProfileData);
    setIsProfileModalOpen(false);
  };

  

  return (
    <div className="min-h-screen bg-gray-50 p-20">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="relative">
              <img
                src={profileData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <button 
                className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-all"
                onClick={() => {
                  setNewProfileData(profileData);
                  setIsProfileModalOpen(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                  <p className="text-gray-500">Premium Member</p>
                </div>
                <Button 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                  onClick={() => {
                    setNewProfileData(profileData);
                    setIsProfileModalOpen(true);
                  }}
                >
                  Edit Profile
                </Button>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Input 
                  value={profileData.email}
                  className="bg-gray-50"
                  readOnly
                />
                <Input 
                  value={profileData.phone}
                  className="bg-gray-50"
                  readOnly
                />
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600">
                  Bio: {profileData.bio}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Saved Addresses
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  setNewAddress({ type: 'home', address: '' });
                  setIsAddressModalOpen(true);
                }}
              >
                <PlusCircle className="w-4 h-4" /> Add Address
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {addresses.map((addr, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-yellow-400 rounded-full">
                    {addr.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold capitalize">{addr.type}</h3>
                    <p className="text-gray-600">{addr.address}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditAddress(idx)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts section remains unchanged */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart width={500} height={300} data={rideData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rides" 
                  stroke="#FBBF24" 
                  strokeWidth={2}
                  dot={{ fill: '#FBBF24' }}
                />
              </LineChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Most Visited Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={500} height={300} data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#FBBF24" />
              </BarChart>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={newProfileData.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-image"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-all cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </label>
              </div>
            </div>
            <div className="grid gap-2">
              <label>Email</label>
              <Input
                value={newProfileData.email}
                onChange={(e) => setNewProfileData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label>Phone</label>
              <Input
                value={newProfileData.phone}
                onChange={(e) => setNewProfileData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label>Bio</label>
              <Textarea
                value={newProfileData.bio}
                onChange={(e) => setNewProfileData(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProfileUpdate} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Address Modal */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingAddress !== null ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label>Address Type</label>
            <Select
              value={newAddress.type}
              onValueChange={handleAddressTypeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(addressTypes) as AddressType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      {addressTypes[type].icon}
                      <span className="capitalize">{type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label>Address</label>
            <Input
              value={newAddress.address}
              onChange={handleAddressChange}
              placeholder="Enter address"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsAddressModalOpen(false);
              setEditingAddress(null);
              setNewAddress({ type: 'home', address: '' });
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddressSubmit} 
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            {editingAddress !== null ? 'Save Changes' : 'Add Address'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </div>
  );
}