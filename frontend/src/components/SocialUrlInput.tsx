import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SocialUrl {
  url: string;
  urlName: string;
}

interface SocialUrlInputProps {
  socialUrls: SocialUrl[];
  onChange: (socialUrls: SocialUrl[]) => void;
}

const SocialUrlInput: React.FC<SocialUrlInputProps> = ({
  socialUrls,
  onChange,
}) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentPlatform, setCurrentPlatform] = useState("");

  const platforms = [
    "Facebook",
    "Instagram",
    "Twitter",
    "TikTok",
    "YouTube",
    "LinkedIn",
    "Website",
    "Other",
  ];

  const addSocialUrl = () => {
    if (currentUrl.trim() && currentPlatform) {
      const newSocialUrl: SocialUrl = {
        url: currentUrl.trim(),
        urlName: currentPlatform,
      };

      onChange([...socialUrls, newSocialUrl]);
      setCurrentUrl("");
      setCurrentPlatform("");
    }
  };

  const removeSocialUrl = (index: number) => {
    const updatedUrls = socialUrls.filter((_, i) => i !== index);
    onChange(updatedUrls);
  };

  return (
    <div className="w-full space-y-4">
      {/* Add new social URL */}
      <div className="w-full border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label
              htmlFor="platform"
              className="text-xs text-gray-600 mb-1 block"
            >
              Платформ
            </Label>
            <Select value={currentPlatform} onValueChange={setCurrentPlatform}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="url" className="text-xs text-gray-600 mb-1 block">
              URL
            </Label>
            <Input
              id="url"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder="https://..."
              className="h-9"
            />
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              onClick={addSocialUrl}
              disabled={!currentUrl.trim() || !currentPlatform}
              className="h-9 bg-purple-600 hover:bg-purple-700 text-white px-4"
            >
              Нэмэх
            </Button>
          </div>
        </div>
      </div>

      {/* Display added social URLs */}
      {socialUrls.length > 0 && (
        <div className="w-full space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Бүртгүүлсэн хаягууд:
          </Label>
          <div className="space-y-2">
            {socialUrls.map((social, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {social.urlName}
                    </span>
                    <span className="text-sm text-gray-600 truncate max-w-[200px] block overflow-hidden whitespace-nowrap">
                      {social.url}
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSocialUrl(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                >
                  Хасах
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialUrlInput;
