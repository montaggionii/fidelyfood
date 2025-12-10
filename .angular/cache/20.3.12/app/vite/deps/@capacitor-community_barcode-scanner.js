import {
  CameraDirection,
  SupportedFormat,
  registerPlugin
} from "./chunk-6NEA7XJS.js";
import "./chunk-EGSMBJJY.js";

// node_modules/@capacitor-community/barcode-scanner/dist/esm/index.js
var BarcodeScanner = registerPlugin("BarcodeScanner", {
  web: () => import("./web-NVSH67Q4.js").then((m) => new m.BarcodeScannerWeb())
});
export {
  BarcodeScanner,
  CameraDirection,
  SupportedFormat
};
//# sourceMappingURL=@capacitor-community_barcode-scanner.js.map
