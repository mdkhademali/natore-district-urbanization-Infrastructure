// Md. Khadem Ali
// https://github.com/mdkhademali
// Load district boundary data
var districts = ee.FeatureCollection("FAO/GAUL/2015/level2");
var natore = districts.filter(ee.Filter.eq('ADM2_NAME', 'Natore'));

// Center the map on Natore
Map.centerObject(natore, 10);

// Load the population density dataset (Urbanization Indicator)
var urbanPopulation = ee.Image("CIESIN/GPWv4/unwpp-adjusted-population-density/2015");

// Clip population density to Natore district
var natoreUrbanPop = urbanPopulation.clip(natore);

// Load land cover data (using MODIS Land Cover Classification)
var landCover = ee.Image('MODIS/006/MCD12Q1/2019_01_01')
                .select('LC_Type1')
                .clip(natore);

// Define land cover classes (Urban Area is class 13)
var urbanArea = landCover.eq(13);

// Display the results: Population density and Urban Areas
Map.addLayer(natoreUrbanPop, {
  min: 0, 
  max: 2000, 
  palette: ['#f0f8ff', '#ff7f00', '#b22222']  // Lighter to Darker color palette
}, 'Population Density');

// Add only the urban area layer (no white areas)
Map.addLayer(urbanArea.updateMask(urbanArea), {
  palette: ['green']  // Dark Blue for urban areas
}, 'Urban Area');

// Add Natore district boundary (just the outline)
Map.addLayer(natore.style({color: 'red', fillColor: '00000000', width: 2}), {}, 'Natore Boundary');

// Print a description
print("Urbanization and Infrastructure Analysis for Natore District.");