library(raster)

#Blue band
b2 <- raster('E:\\Gokul\\Urban\\Landsat\\LC08_L1TP_144053_20190313_20190325_01_T1_B2.tif')

#Green band
b3 <- raster('E:\\Gokul\\Urban\\Landsat\\LC08_L1TP_144053_20190313_20190325_01_T1_B3.tif')

#Red band
b4 <- raster('E:\\Gokul\\Urban\\Landsat\\LC08_L1TP_144053_20190313_20190325_01_T1_B4.tif')

#Near infrared(NIR)
b5 <- raster('E:\\Gokul\\Urban\\Landsat\\LC08_L1TP_144053_20190313_20190325_01_T1_B5.tif')

#stack image
landsat_FCC <- stack(b5, b4, b3)

#PlotRGB_FCC
plotRGB(landsat_FCC, axes =TRUE, stretch = "lin", main = "False Color Composite")

library(rgdal)
Ernakulam <- readOGR(dsn = "E:\\Gokul\\Urban\\Urban\\Shapefiles", layer = "Ernakulam")
projection(state) <- CRS("+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs +ellps=WGS84 +towgs84=0,0,0")
plot(Ernakulam)

#raster algebra 
ndvi = (b5-b4)/(b5+b4)

ndvi
#plot the ndvi 
plot(ndvi, col =rev(terrain.colors(2)), main = "Landsat-NDVI")
ndvi

ndvi_crop <- crop(ndvi,extent(Ernakulam))
ndvi_mask <-mask(ndvi_crop, Ernakulam)
plot(ndvi_mask, main="NDVI")
ndvi_mask

