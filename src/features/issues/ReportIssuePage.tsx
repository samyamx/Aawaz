import { useState, useRef, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Check, ChevronRight, ChevronLeft, Upload, X, MapPin, 
  Navigation, Search, ArrowUpRight, CheckCircle2, 
  Car, Droplet, Zap, Lightbulb, Trash2, Recycle, ShieldAlert, Leaf, Loader2, AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { reverseGeocode, searchLocation } from "@/services/geocoding"

// Fix Leaflet default icon
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  locationStr: z.string().min(5, { message: "Please provide a valid location or use the map." }),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

const categories = [
  { id: "roads", label: "Roads", icon: Car },
  { id: "water", label: "Water Supply", icon: Droplet },
  { id: "electricity", label: "Electricity", icon: Zap },
  { id: "streetlights", label: "Street Lights", icon: Lightbulb },
  { id: "sanitation", label: "Sanitation", icon: Trash2 },
  { id: "waste", label: "Waste Management", icon: Recycle },
  { id: "safety", label: "Public Safety", icon: ShieldAlert },
  { id: "environment", label: "Environment", icon: Leaf },
]

const steps = [
  { id: 1, title: "Basic Details" },
  { id: 2, title: "Location" },
  { id: 3, title: "Photos" },
  { id: 4, title: "Review" },
  { id: 5, title: "Submit" },
]

function MapEvents({ setMarkerPos, form, setLocating }: any) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setMarkerPos({ lat, lng })
      form.setValue("lat", lat)
      form.setValue("lng", lng)
      setLocating(true)
      reverseGeocode(lat, lng)
        .then(addr => form.setValue("locationStr", addr))
        .catch(() => form.setError("locationStr", { message: "Failed to fetch address for this location" }))
        .finally(() => setLocating(false))
    },
  })
  return null
}

function MapUpdater({ center }: { center: {lat: number, lng: number} | null }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], 15)
    }
  }, [center, map])
  return null
}

export function ReportIssuePage() {
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState<{file: File, preview: string}[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Map state
  const [markerPos, setMarkerPos] = useState<{lat: number, lng: number} | null>(null)
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 27.7172, lng: 85.3240 }) // Kathmandu default
  const [isLocating, setIsLocating] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)

  const markerRef = useRef<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      locationStr: "",
    },
  })

  async function nextStep() {
    let isValid = false
    
    if (step === 1) {
      isValid = await form.trigger(["title", "description", "category"])
    } else if (step === 2) {
      isValid = await form.trigger(["locationStr"])
      if (isValid && !form.getValues("lat")) {
        // Enforce map marker selection if they just typed something but didn't pick on map
        form.setError("locationStr", { message: "Please select a specific location on the map." })
        isValid = false
      }
    } else if (step === 3) {
      isValid = true // Photos optional
    }

    if (isValid) {
      setStep((s) => s + 1)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step === 4) {
      setTimeout(() => setStep(5), 500)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files))
    }
    // Reset input so selecting the same file again triggers onChange
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(f => 
      (f.type === 'image/jpeg' || f.type === 'image/png') && 
      f.size <= 10 * 1024 * 1024
    )
    
    if (validFiles.length !== files.length) {
      alert("Some files were rejected. Only JPG/PNG under 10MB are allowed.")
    }

    const availableSlots = 5 - photos.length
    const filesToAdd = validFiles.slice(0, availableSlots)
    
    if (validFiles.length > availableSlots && availableSlots > 0) {
      alert(`Maximum 5 photos allowed. Added ${availableSlots} photos.`)
    } else if (availableSlots === 0 && validFiles.length > 0) {
      alert("You have already reached the maximum limit of 5 photos.")
    }

    const newPhotos = filesToAdd.map(f => ({
      file: f,
      preview: URL.createObjectURL(f)
    }))

    setPhotos(prev => [...prev, ...newPhotos])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos]
    URL.revokeObjectURL(newPhotos[index].preview) // Clean up memory
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }

  // Auto GPS
  const handleAutoGPS = () => {
    setIsLocating(true)
    setGeoError(null)
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser")
      setIsLocating(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setMarkerPos({ lat, lng })
        setMapCenter({ lat, lng })
        form.setValue("lat", lat)
        form.setValue("lng", lng)
        reverseGeocode(lat, lng)
          .then(addr => {
            form.setValue("locationStr", addr)
            form.clearErrors("locationStr")
          })
          .catch(() => setGeoError("Could not determine address from GPS"))
          .finally(() => setIsLocating(false))
      },
      (error) => {
        setGeoError("Failed to get GPS location. Please ensure permissions are granted.")
        setIsLocating(false)
      },
      { timeout: 10000 }
    )
  }

  // Search Address
  const handleSearch = async () => {
    const query = form.getValues("locationStr")
    if (!query || query.length < 3) {
      form.setError("locationStr", { message: "Enter a valid location to search." })
      return
    }
    setIsLocating(true)
    setGeoError(null)
    try {
      const results = await searchLocation(query)
      if (results && results.length > 0) {
        const topResult = results[0]
        setMarkerPos({ lat: topResult.lat, lng: topResult.lon })
        setMapCenter({ lat: topResult.lat, lng: topResult.lon })
        form.setValue("lat", topResult.lat)
        form.setValue("lng", topResult.lon)
        form.setValue("locationStr", topResult.address)
        form.clearErrors("locationStr")
      } else {
        setGeoError("Location not found. Try dragging the marker on the map.")
      }
    } catch (e) {
      setGeoError("Search failed. Please try again.")
    } finally {
      setIsLocating(false)
    }
  }

  const handleMarkerDragEnd = () => {
    const marker = markerRef.current
    if (marker != null) {
      const { lat, lng } = marker.getLatLng()
      setMarkerPos({ lat, lng })
      form.setValue("lat", lat)
      form.setValue("lng", lng)
      setIsLocating(true)
      reverseGeocode(lat, lng)
        .then(addr => form.setValue("locationStr", addr))
        .catch(() => setGeoError("Could not fetch address for this pin"))
        .finally(() => setIsLocating(false))
    }
  }

  if (step === 5) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] animate-in fade-in zoom-in duration-300">
        <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl overflow-hidden">
          <CardContent className="pt-12 pb-10 flex flex-col items-center justify-center text-center px-8">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Report Submitted!</h2>
            <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-md font-mono text-sm font-semibold mb-6 inline-flex items-center">
              AWZ-2026-005
            </div>
            <p className="text-slate-500 text-sm mb-8">
              Visible on the public map. You will be notified as authorities take action.
            </p>
            <div className="flex gap-4 w-full">
              <Button 
                variant="outline" 
                className="flex-1 rounded-full font-semibold border-slate-200 text-slate-600 hover:bg-slate-50"
                onClick={() => {
                  form.reset()
                  setPhotos([])
                  setMarkerPos(null)
                  setStep(1)
                }}
              >
                New
              </Button>
              <Button 
                className="flex-1 rounded-full font-semibold bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                onClick={() => navigate('/reports')}
              >
                My Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[calc(100vh-4rem)]">
      
      {/* Header & Stepper */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Report an Issue</h1>
          <p className="text-slate-500 mt-1">Document and submit a local infrastructure problem.</p>
        </div>

        <div className="flex items-center max-w-2xl">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative">
                <div 
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors z-10",
                    step > s.id ? "bg-[#2563eb] text-white" : 
                    step === s.id ? "bg-[#2563eb] text-white" : "bg-slate-100 text-slate-400"
                  )}
                >
                  {step > s.id ? <Check className="h-4 w-4 stroke-[3]" /> : s.id}
                </div>
                <span 
                  className={cn(
                    "absolute -bottom-6 text-xs font-semibold whitespace-nowrap",
                    step >= s.id ? "text-slate-800" : "text-slate-400"
                  )}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-colors",
                    step > s.id ? "bg-[#2563eb]" : "bg-slate-100"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Content */}
      <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full min-h-[500px]">
            
            <div className="flex-1 p-8">
              {/* STEP 1: Basic Details */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in">
                  <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Issue Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Issue Title <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Large pothole near main junction" className="rounded-lg border-slate-200 focus-visible:ring-blue-500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Description <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the issue, its severity, and any hazards." className="min-h-[120px] rounded-lg border-slate-200 focus-visible:ring-blue-500 resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Category <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {categories.map((cat) => {
                              const isSelected = field.value === cat.label
                              return (
                                <button
                                  key={cat.id}
                                  type="button"
                                  onClick={() => field.onChange(cat.label)}
                                  className={cn(
                                    "flex items-center px-4 py-3 border rounded-xl transition-all text-sm font-medium w-full text-left",
                                    isSelected 
                                      ? "border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600" 
                                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                  )}
                                >
                                  <cat.icon className={cn("h-5 w-5 mr-3", isSelected ? "text-blue-600" : "text-slate-400")} />
                                  {cat.label}
                                </button>
                              )
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* STEP 2: Location */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex justify-between items-center">
                    Location
                    {isLocating && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
                  </h3>
                  
                  {geoError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <p>{geoError}</p>
                    </div>
                  )}

                  <div className="relative h-[300px] w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-100 z-0">
                    <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={13} className="h-full w-full z-0">
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <MapEvents setMarkerPos={setMarkerPos} form={form} setLocating={setIsLocating} />
                      <MapUpdater center={mapCenter} />
                      {markerPos && (
                        <Marker 
                          position={[markerPos.lat, markerPos.lng]} 
                          draggable={true}
                          eventHandlers={{ dragend: handleMarkerDragEnd }}
                          ref={markerRef}
                        />
                      )}
                    </MapContainer>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      onClick={handleAutoGPS}
                      disabled={isLocating}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full px-6 flex-1 sm:flex-none"
                    >
                      <Navigation className="mr-2 h-4 w-4" /> Auto GPS
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleSearch}
                      disabled={isLocating}
                      variant="outline" 
                      className="rounded-full px-6 border-slate-200 text-slate-600 flex-1 sm:flex-none"
                    >
                      <Search className="mr-2 h-4 w-4" /> Search Map
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="locationStr"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Type an address and click Search Map..." 
                            className="rounded-xl border-slate-200 focus-visible:ring-blue-500 h-12" 
                            {...field} 
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSearch();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* STEP 3: Photos */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Photo Evidence</h3>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group",
                      isDragging ? "bg-blue-50 border-blue-500" : "bg-white border-slate-300 hover:bg-slate-50 hover:border-blue-400"
                    )}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/png, image/jpeg" 
                      multiple 
                      onChange={handleFileChange} 
                    />
                    <div className={cn("mb-4 transition-colors", isDragging ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500")}>
                      <Upload className="h-8 w-8" />
                    </div>
                    <p className="font-semibold text-slate-700 text-base">Drop photos or click to upload</p>
                    <p className="text-sm text-slate-500 mt-1">PNG, JPG up to 10MB - Max 5 photos</p>
                  </div>

                  {photos.length > 0 && (
                    <div className="flex flex-wrap gap-4 pt-4">
                      {photos.map((photo, idx) => (
                        <div key={idx} className="relative h-32 w-32 rounded-xl overflow-hidden border border-slate-200 group">
                          <img src={photo.preview} alt={`Upload ${idx+1}`} className="h-full w-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-2 right-2 h-6 w-6 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {photos.length < 5 && (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="h-32 w-32 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-400 text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Upload className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Review */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Review & Submit</h3>
                  
                  {photos.length > 0 ? (
                    <div className="h-40 w-full rounded-2xl overflow-hidden">
                      <img src={photos[0].preview} alt="Issue Preview" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-40 w-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      No photos attached
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <span className="text-slate-500 text-sm font-medium">Title</span>
                      <span className="md:col-span-3 text-slate-900 font-medium">{form.getValues().title}</span>
                    </div>
                    <div className="w-full h-px bg-slate-100"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <span className="text-slate-500 text-sm font-medium">Category</span>
                      <span className="md:col-span-3 text-slate-900 font-medium">{form.getValues().category}</span>
                    </div>
                    <div className="w-full h-px bg-slate-100"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <span className="text-slate-500 text-sm font-medium">Location</span>
                      <span className="md:col-span-3 text-slate-900 font-medium">{form.getValues().locationStr}</span>
                    </div>
                    <div className="w-full h-px bg-slate-100"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <span className="text-slate-500 text-sm font-medium">Photos</span>
                      <span className="md:col-span-3 text-slate-900 font-medium">{photos.length} photo{photos.length !== 1 ? 's' : ''} attached</span>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 mt-8">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-blue-800 text-sm font-medium">Report will be publicly visible on the issue map.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setStep(step - 1)}
                  className="text-slate-500 hover:text-slate-800 font-semibold pl-2"
                >
                  <ChevronLeft className="mr-1 h-5 w-5" /> Back
                </Button>
              ) : (
                <div></div> // Empty div to keep 'Continue' aligned right
              )}
              
              {step === 4 ? (
                <Button 
                  type="submit"
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full px-8 py-6 h-auto font-semibold text-base shadow-sm"
                >
                  Submit Report <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  type="button"
                  onClick={nextStep}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full px-8 py-6 h-auto font-semibold text-base shadow-sm"
                >
                  Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
            
          </form>
        </Form>
      </div>
    </div>
  )
}
