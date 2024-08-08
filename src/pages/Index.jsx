import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cat, Heart, Info } from "lucide-react";

const CatBreed = ({ name, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Cat className="mr-2" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription className="text-gray-700">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const catImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
];

const catStats = [
  { name: "Indoor", value: 60 },
  { name: "Outdoor", value: 40 },
];

const COLORS = ["#8884d8", "#82ca9d"];

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", personality: "Vocal, intelligent, and social" },
  { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", personality: "Gentle, friendly, and adaptable" },
  { name: "Persian", description: "Recognized for their long fur and flat faces.", personality: "Sweet, quiet, and docile" },
  { name: "Bengal", description: "Wild-looking cats with a spotted or marbled coat pattern.", personality: "Active, playful, and curious" },
  { name: "Sphynx", description: "Hairless cats known for their wrinkled skin and extroverted behavior.", personality: "Energetic, mischievous, and affectionate" },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("breeds");
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLikeCount((prevCount) => prevCount + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredBreeds = catBreeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-6 text-center text-purple-800"
        >
          All About Cats
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-700 mb-8 text-center"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
          independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
          characteristics and personalities.
        </motion.p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="stats">Cat Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-purple-700 flex items-center">
                  <Cat className="mr-2" />
                  Popular Cat Breeds
                </CardTitle>
                <Input
                  type="text"
                  placeholder="Search cat breeds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-4"
                />
              </CardHeader>
              <CardContent>
                {filteredBreeds.map((breed, index) => (
                  <CatBreed key={index} index={index} name={breed.name} description={breed.description} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-purple-700 flex items-center">
                  <Info className="mr-2" />
                  Cat Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4 text-center">Indoor vs Outdoor Cats</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={catStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {catStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge variant="secondary" className="text-lg p-2">
            <Heart className="inline-block mr-2 text-red-500" />
            {likeCount} cat lovers
          </Badge>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
