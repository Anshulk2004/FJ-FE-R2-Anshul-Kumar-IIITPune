"use client";
import { ChangeEvent, JSX, useState, MouseEvent } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Home,
  Briefcase,
  Users,
  MapPin,
  Edit2,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/components/ThemeContext";
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

interface RideData {
  month: string;
  rides: number;
  earnings: number;
}


type AddressType = keyof typeof addressTypes;

interface Address {
  type: keyof typeof addressTypes;
  address: string;
  icon: JSX.Element;
}

const rideData: RideData[] = [
  { month: "Jan", rides: 12, earnings: 2400 },
  { month: "Feb", rides: 19, earnings: 3800 },
  { month: "Mar", rides: 15, earnings: 3000 },
  { month: "Apr", rides: 25, earnings: 5000 },
  { month: "May", rides: 22, earnings: 4400 },
  { month: "Jun", rides: 30, earnings: 6000 },
];

const locationData = [
  { location: "Koregaon Park", visits: 45 },
  { location: "Hinjewadi", visits: 38 },
  { location: "Viman Nagar", visits: 28 },
  { location: "Kothrud", visits: 22 },
  { location: "Baner", visits: 15 },
];
const addressTypes = {
  home: { icon: <Home className="w-4 h-4" /> },
  work: { icon: <Briefcase className="w-4 h-4" /> },
  friends: { icon: <Users className="w-4 h-4" /> },
  other: { icon: <MapPin className="w-4 h-4" /> },
} as const;

const totalRides = rideData.reduce((acc, curr) => acc + curr.rides, 0);
const totalEarnings = rideData.reduce((acc, curr) => acc + curr.earnings, 0);
const avgEarningsPerRide = (totalEarnings / totalRides).toFixed(2);

export default function AccountInfo() {
  const { theme, toggleTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const [profileData, setProfileData] = useState({
    name: "Anshul Kumar",
    email: "anshulwork0102@gmail.com",
    phone: "+91 9870803265",
    bio: "Frequent traveler, always on the move. Love exploring new places and meeting new people.",
    image: "/images/profile.jpg",
  });

  const [addresses, setAddresses] = useState([
    {
      type: "home",
      address: "123 Marvel Residency, Viman Nagar, Pune",
      icon: <Home className="w-4 h-4" />,
    },
    {
      type: "work",
      address: "456 Tech Park, Hinjewadi Phase 1, Pune",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      type: "friends",
      address: "789 Lake Town Society, Koregaon Park, Pune",
      icon: <Users className="w-4 h-4" />,
    },
  ]);


  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [newProfileData, setNewProfileData] =
    useState<ProfileData>(profileData);
  const [newAddress, setNewAddress] = useState<Omit<Address, "icon">>({
    type: "home",
    address: "",
  });

  const handleAddressTypeChange = (value: AddressType) => {
    setNewAddress((prev) => ({ ...prev, type: value }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prev) => ({ ...prev, address: e.target.value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setNewProfileData((prev) => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newAddressWithIcon = {
      ...newAddress,
      icon: addressTypes[newAddress.type].icon,
    };

    if (editingAddress !== null) {
      setAddresses(
        addresses.map((addr, idx) =>
          idx === editingAddress ? newAddressWithIcon : addr
        )
      );
    } else {
      setAddresses([...addresses, newAddressWithIcon]);
    }
    setIsAddressModalOpen(false);
    setEditingAddress(null);
    setNewAddress({ type: "home", address: "" });
  };

  const handleEditAddress = (index: number) => {
    const address = addresses[index];
    setEditingAddress(index);
    setNewAddress({
      type: address.type as AddressType,
      address: address.address,
    });
    setIsAddressModalOpen(true);
  };

  const handleProfileUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProfileData(newProfileData);
    setIsProfileModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"} p-4 md:p-20 transition-colors duration-300`}>
    <motion.div
      className="max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg p-4 md:p-8 mb-8 transition-colors duration-300`}
      >
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="relative">
              <img
                src={profileData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-all"
                onClick={() => {
                  setNewProfileData(profileData);
                  setIsProfileModalOpen(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profileData.name}
                  </h1>
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
                <p className="text-gray-600">Bio: {profileData.bio}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className={`mb-8 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Saved Addresses
                <Button
                  variant="outline"
                  className={`flex items-center gap-2 ${theme === "dark" ? "text-white hover:text-gray-200" : ""}`}
                  onClick={() => {
                    setNewAddress({ type: "home", address: "" });
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
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    } rounded-lg`}
                  >
                    <div className="p-2 bg-yellow-400 rounded-full">
                      {addr.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold capitalize ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>{addr.type}</h3>
                      <p className={
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }>{addr.address}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={theme === "dark" ? "text-white hover:text-gray-200" : ""}
                      onClick={() => handleEditAddress(idx)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}>
            <CardHeader>
              <CardTitle>Monthly Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rideData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#E5E7EB"} />
                  <XAxis dataKey="month" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1F2937" : "#fff",
                      color: theme === "dark" ? "#fff" : "#000",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rides"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ fill: "#6366F1" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: "#10B981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className={`mt-4 grid grid-cols-3 gap-4 p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
                <div>
                  <p className="text-sm text-gray-500">Total Rides</p>
                  <p className="text-xl font-bold">{totalRides}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="text-xl font-bold">₹{totalEarnings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. per Ride</p>
                  <p className="text-xl font-bold">₹{avgEarningsPerRide}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}>
            <CardHeader>
              <CardTitle>Most Visited Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#E5E7EB"} />
                  <XAxis dataKey="location" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1F2937" : "#fff",
                      color: theme === "dark" ? "#fff" : "#000",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="visits" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
              <div className={`mt-4 p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
                <p className="text-sm text-gray-500">Most Popular Location</p>
                <p className="text-xl font-bold">{locationData[0].location}</p>
                <p className="text-sm text-gray-500">{locationData[0].visits} visits</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>


      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent
          className={`sm:max-w-[425px] ${
            theme === "dark" ? "bg-gray-800 text-white" : ""
          }`}
        >
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
                onChange={(e) =>
                  setNewProfileData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <label>Phone</label>
              <Input
                value={newProfileData.phone}
                onChange={(e) =>
                  setNewProfileData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <label>Bio</label>
              <Textarea
                value={newProfileData.bio}
                onChange={(e) =>
                  setNewProfileData((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProfileModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProfileUpdate}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent
          className={`sm:max-w-[425px] ${
            theme === "dark" ? "bg-gray-800 text-white" : ""
          }`}
        >
          <DialogHeader>
            <DialogTitle>
              {editingAddress !== null ? "Edit Address" : "Add New Address"}
            </DialogTitle>
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
                setNewAddress({ type: "home", address: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddressSubmit}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              {editingAddress !== null ? "Save Changes" : "Add Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
