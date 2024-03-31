import * as versions from "./versions.json";
import * as products from "./products.json";
import * as regions from "./regions.json";
import {HeatmapProps} from "../widgets";


export const getData = ():Record<string, HeatmapProps> => ({
    versions, regions, products
});
