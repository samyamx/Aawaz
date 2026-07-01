export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
    if (!res.ok) throw new Error("Failed to fetch address")
    const data = await res.json()
    return data.display_name
  } catch (error) {
    console.error("Reverse geocoding error:", error)
    throw error
  }
}

export async function searchLocation(query: string): Promise<{lat: number, lon: number, address: string}[]> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
    if (!res.ok) throw new Error("Search failed")
    const data = await res.json()
    return data.map((item: any) => ({
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      address: item.display_name
    }))
  } catch (error) {
    console.error("Location search error:", error)
    throw error
  }
}
