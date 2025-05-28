"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import SocialUrlInput from "./SocialUrlInput";

interface SocialUrl {
  url: string;
  urlName: string;
}

interface FormData {
  companyName: string;
  logo: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
  about: string;
  category: string;
  socialUrls: SocialUrl[];
}

const SalonSignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    logo: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    about: "",
    category: "",
    socialUrls: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Hair Salon",
    "Beauty Salon",
    "Nail Salon",
    "Spa & Wellness",
    "Barbershop",
    "Medical Spa",
    "Massage Therapy",
    "Makeup Studio",
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length !== 8) {
      newErrors.phoneNumber = "Phone number must be exactly 8 digits";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain only digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSocialUrlsChange = (socialUrls: SocialUrl[]) => {
    setFormData((prev) => ({ ...prev, socialUrls }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form Data:", formData);

      toast({
        title: "Success!",
        description:
          "Your salon has been registered successfully. Welcome to our platform!",
      });

      // Reset form
      setFormData({
        companyName: "",
        logo: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
        about: "",
        category: "",
        socialUrls: [],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Join Our Beauty Network
          </h1>
          <p className="text-gray-600 text-lg">
            Register your salon and connect with customers in Mongolia
          </p>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">
              Salon Registration
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your salon details to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-700"
                >
                  Salon Name *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder="Enter your salon name"
                  className={`transition-all duration-200 ${
                    errors.companyName
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-purple-500"
                  }`}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">{errors.companyName}</p>
                )}
              </div>

              {/* Logo Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="logo"
                  className="text-sm font-medium text-gray-700"
                >
                  Logo
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {formData.logo && (
                  <div className="mt-2">
                    <img
                      src={formData.logo}
                      alt="Logo preview"
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="salon@example.com"
                    className={`transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-purple-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number * (8 digits)
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="12345678"
                    maxLength={8}
                    className={`transition-all duration-200 ${
                      errors.phoneNumber
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-purple-500"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address *
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your salon address"
                  className={`transition-all duration-200 ${
                    errors.address
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-purple-500"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Business Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger
                    className={`transition-all duration-200 ${
                      errors.category
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-purple-500"
                    }`}
                  >
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password * (min 8 characters)
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Create a secure password"
                    className={`transition-all duration-200 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-purple-500"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm your password"
                    className={`transition-all duration-200 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-purple-500"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* About */}
              <div className="space-y-2">
                <Label
                  htmlFor="about"
                  className="text-sm font-medium text-gray-700"
                >
                  About Your Salon
                </Label>
                <Textarea
                  id="about"
                  value={formData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  placeholder="Tell us about your salon, services, and what makes you special..."
                  className="min-h-[100px] resize-none focus:border-purple-500 transition-all duration-200"
                />
              </div>

              {/* Social Media URLs */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Social Media Links (Optional)
                </Label>
                <SocialUrlInput
                  socialUrls={formData.socialUrls}
                  onChange={handleSocialUrlsChange}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Registering...
                  </div>
                ) : (
                  "Register My Salon"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Already have an account?
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalonSignUp;
