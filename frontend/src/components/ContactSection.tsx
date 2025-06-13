import { Instagram, MapPin, Phone } from "lucide-react";
import React from "react";

interface SocialUrl {
  url: string;
  urlName: string;
}

type Contacts = {
  phone: string;
  address: string;
  socials: SocialUrl[];
};

const ContactSection = ({ phone, address, socials }: Contacts) => {
  return (
    <section className="py-10 md:py-16 px-4 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">
          Холбоо барих
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center md:justify-center">
          <div className="w-fit flex justify-start items-start pl-4 gap-5 md:flex-col md:items-center md:pl-0 md:w-full ">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center ">
              <Phone color="red" />
            </div>
            <div className="flex flex-col justify-center items-start md:items-center md:gap-3">
              <h3 className="font-semibold text-gray-800">Утас</h3>
              <p className="text-gray-600">+976 {phone}</p>
            </div>
          </div>
          <div className="w-fit flex justify-start items-start pl-4 gap-5 md:flex-col md:items-center md:pl-0 md:w-full ">
            <div className="w-[48px] h-[48px] bg-rose-100 rounded-full flex items-center justify-center ">
              <MapPin color="red" size={24} />
            </div>
            <div className="flex flex-col justify-center items-start md:items-center md:gap-3">
              <h3 className="font-semibold text-gray-800">Хаяг</h3>
              <p className="w-full text-gray-600 text-left md:text-center">
                {address}
              </p>
            </div>
          </div>
          <div className="w-fit flex justify-start items-start pl-4 gap-5 md:flex-col md:items-center md:pl-0 md:w-full ">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center ">
              <Instagram color="red" />
            </div>
            <div className="flex flex-col justify-center items-start md:items-center md:gap-3">
              <h3 className="font-semibold text-gray-800">Сошиал хаяг</h3>
              {/* <p className="text-gray-600">{socials[0].urlName}</p> */}
              <p className="text-gray-600">naraa_salon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
