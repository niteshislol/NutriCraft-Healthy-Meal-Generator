"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronsUpDown, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Define types for our form
type FoodPreference = "Vegetarian" | "Vegan" | "Pescatarian" | "Gluten-Free" | "Dairy-Free"
type Allergy = "Nuts" | "Shellfish" | "Soy" | "Wheat"
type Gender = "Male" | "Female" | "Other"
type ActivityLevel = "Sedentary" | "Moderate" | "Active"
type NutritionalDeficiency = "Iron" | "Vitamin D" | "Calcium"
type CuisineType = "Italian" | "Mexican" | "Chinese" | "Indian"

export default function RecipeGeneratorPage() {
  const [showRecipe, setShowRecipe] = useState(false)
  const [selectedFoodPreferences, setSelectedFoodPreferences] = useState<FoodPreference[]>([])
  const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([])
  const [selectedDeficiencies, setSelectedDeficiencies] = useState<NutritionalDeficiency[]>([])
  const [otherAllergies, setOtherAllergies] = useState("")
  const [age, setAge] = useState<number | "">("")
  const [gender, setGender] = useState<Gender | "">("")
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | "">("")
  const [cuisineType, setCuisineType] = useState<CuisineType | "">("")
  const [servingSize, setServingSize] = useState<number>(2)

  const foodPreferences: FoodPreference[] = ["Vegetarian", "Vegan", "Pescatarian", "Gluten-Free", "Dairy-Free"]
  const allergies: Allergy[] = ["Nuts", "Shellfish", "Soy", "Wheat"]
  const nutritionalDeficiencies: NutritionalDeficiency[] = ["Iron", "Vitamin D", "Calcium"]

  const handleGenerateRecipe = () => {
    setShowRecipe(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">Healthy Recipe Generator</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-emerald-600 font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-emerald-600 font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Generate Your Personalized Recipe</CardTitle>
            <CardDescription className="text-center">
              Fill in your preferences and dietary requirements to get a customized healthy recipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Food Preferences */}
              <div className="space-y-2">
                <Label>Food Preferences</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {selectedFoodPreferences.length > 0
                        ? `${selectedFoodPreferences.length} selected`
                        : "Select preferences"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search preferences..." />
                      <CommandList>
                        <CommandEmpty>No preference found.</CommandEmpty>
                        <CommandGroup>
                          {foodPreferences.map((preference) => (
                            <CommandItem
                              key={preference}
                              onSelect={() => {
                                setSelectedFoodPreferences((prev) =>
                                  prev.includes(preference)
                                    ? prev.filter((item) => item !== preference)
                                    : [...prev, preference],
                                )
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedFoodPreferences.includes(preference) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {preference}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Allergies */}
              <div className="space-y-2">
                <Label>Allergies</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {selectedAllergies.length > 0 ? `${selectedAllergies.length} selected` : "Select allergies"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search allergies..." />
                      <CommandList>
                        <CommandEmpty>No allergy found.</CommandEmpty>
                        <CommandGroup>
                          {allergies.map((allergy) => (
                            <CommandItem
                              key={allergy}
                              onSelect={() => {
                                setSelectedAllergies((prev) =>
                                  prev.includes(allergy) ? prev.filter((item) => item !== allergy) : [...prev, allergy],
                                )
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedAllergies.includes(allergy) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {allergy}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <div className="pt-2">
                  <Label htmlFor="other-allergies">Other Allergies</Label>
                  <Input
                    id="other-allergies"
                    placeholder="Enter other allergies separated by commas"
                    value={otherAllergies}
                    onChange={(e) => setOtherAllergies(e.target.value)}
                  />
                </div>
              </div>

              {/* Basic Details */}
              <div>
                <Label className="block mb-2">Basic Details (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value ? Number.parseInt(e.target.value) : "")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender as string} onValueChange={(value) => setGender(value as Gender)}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-level">Activity Level</Label>
                    <Select
                      value={activityLevel as string}
                      onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
                    >
                      <SelectTrigger id="activity-level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sedentary">Sedentary</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Nutritional Deficiencies */}
              <div className="space-y-2">
                <Label>Nutritional Deficiencies</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {selectedDeficiencies.length > 0
                        ? `${selectedDeficiencies.length} selected`
                        : "Select deficiencies"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search deficiencies..." />
                      <CommandList>
                        <CommandEmpty>No deficiency found.</CommandEmpty>
                        <CommandGroup>
                          {nutritionalDeficiencies.map((deficiency) => (
                            <CommandItem
                              key={deficiency}
                              onSelect={() => {
                                setSelectedDeficiencies((prev) =>
                                  prev.includes(deficiency)
                                    ? prev.filter((item) => item !== deficiency)
                                    : [...prev, deficiency],
                                )
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedDeficiencies.includes(deficiency) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {deficiency}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Cuisine Type */}
              <div className="space-y-2">
                <Label htmlFor="cuisine-type">Preferred Cuisine Type</Label>
                <Select value={cuisineType as string} onValueChange={(value) => setCuisineType(value as CuisineType)}>
                  <SelectTrigger id="cuisine-type">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Mexican">Mexican</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Serving Size */}
              <div className="space-y-2">
                <Label htmlFor="serving-size">Serving Size</Label>
                <Input
                  id="serving-size"
                  type="number"
                  min={1}
                  max={10}
                  value={servingSize}
                  onChange={(e) => setServingSize(Number.parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">Number of servings (1-10)</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleGenerateRecipe}>
              Generate Recipe
            </Button>
          </CardFooter>
        </Card>

        {/* Recipe Display Section */}
        {showRecipe && (
          <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Vegetarian Pasta Primavera</CardTitle>
              <CardDescription>A delicious and nutritious meal based on your preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>200g pasta</li>
                  <li>1 bell pepper</li>
                  <li>1 zucchini</li>
                  <li>2 tbsp olive oil</li>
                  <li>2 cloves garlic</li>
                  <li>50g parmesan cheese</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Cook pasta according to package instructions.</li>
                  <li>Sauté chopped bell pepper, zucchini, and garlic in olive oil until tender.</li>
                  <li>Mix cooked pasta with vegetables and sprinkle with parmesan cheese.</li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Shopping List</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["Pasta", "Bell Pepper", "Zucchini", "Olive Oil", "Garlic", "Parmesan Cheese"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Video Tutorial</h3>
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="bg-gray-200 rounded-md w-32 h-24 flex items-center justify-center">
                    <Youtube className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">How to Make Pasta Primavera</p>
                    <p className="text-sm text-gray-500">Watch on YouTube</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
