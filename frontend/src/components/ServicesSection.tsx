import { ServiceCartComponent } from "./ServiceCard";

const ServicesSection = () => {
  const services = [
    {
      title: "Нүүр будалт",
      description: "Makeup",
      details: "Гэрэл зургийн болон өдөр тутмын будалт",
      price: "50,000₮",
      duration: "60 мин",
    },
    {
      title: "Хумс засварлах",
      description: "Nail Care",
      details: "Маникюр, педикюр, будалт",
      price: "25,000₮",
      duration: "45 мин",
    },
    {
      title: "Хөмсөг засварлах",
      description: "Eyebrow Styling",
      details: "Хөмсөг засварлах, будах",
      price: "15,000₮",
      duration: "30 мин",
    },
    {
      title: "Үс засварлах",
      description: "Hair Styling",
      details: "Үс засварлах, буржгар хийх",
      price: "35,000₮",
      duration: "90 мин",
    },
    {
      title: "Арьс арчилгаа",
      description: "Facial Treatment",
      details: "Арьсны цэвэрлэгээ, тэжээллэг маск",
      price: "40,000₮",
      duration: "75 мин",
    },
  ];

  return (
    <section
      id="services"
      className="py-16 px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold text-center text-gray-800 mb-12">
          Манай үйлчилгээ
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCartComponent
              key={index}
              title={service.title}
              description={service.description}
              details={service.details}
              price={service.price}
              duration={service.duration}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
