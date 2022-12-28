import CutToolShape from './../../components/editorComponents/cut/cutToolShape';
import CutToolButton from './../../components/editorComponents/cut/cutToolButton';
import CutToolSubmenu from './../../components/editorComponents/cut/cutToolSubmenu';
import BrighnessToolButton from './../../components/editorComponents/brightness/brightnessToolButton';
import BrightnessToolSubmenu from './../../components/editorComponents/brightness/brightnessToolSubmenu';
import BrightnessToolShape from './../../components/editorComponents/brightness/brightnessToolShape';
import SaturationToolButton from './../../components/editorComponents/saturation/saturationToolButton';
import SaturationToolSubmenu from './../../components/editorComponents/saturation/saturationToolSubmenu';
import SaturationToolShape from './../../components/editorComponents/saturation/saturationToolShape';
import ContrastToolButton from './../../components/editorComponents/contrast/contrastToolButton';
import ContrastToolSubmenu from './../../components/editorComponents/contrast/contrastToolSubmenu';
import ContrastToolShape from './../../components/editorComponents/contrast/contrastToolShape';
import TemperatureToolButton from './../../components/editorComponents/temperature/temperatureToolButton';
import TemperatureToolSubmenu from './../../components/editorComponents/temperature/temperatureToolSubmenu';
import TemperatureToolShape from './../../components/editorComponents/temperature/temperatureToolShape';
import TintToolButton from './../../components/editorComponents/tint/tintToolButton';
import TintToolSubmenu from './../../components/editorComponents/tint/tintToolSubmenu';
import TintToolShape from './../../components/editorComponents/tint/tintToolShape';
import GrayscaleToolButton from './../../components/editorComponents/grayscale/grayscaleToolButton';
import GrayscaleToolSubmenu from './../../components/editorComponents/grayscale/grayscaleToolSubmenu';
import GrayscaleToolShape from './../../components/editorComponents/grayscale/grayscaleToolShape';
import PredefinedFiltersToolButton from './../../components/editorComponents/predefinedFilters/predefinedFiltersToolButton';
import PredefinedFiltersToolSubmenu from './../../components/editorComponents/predefinedFilters/predefinedFiltersToolSubmenu';
import PredefinedFiltersToolShape from './../../components/editorComponents/predefinedFilters/predefinedFiltersToolShape';

export const TOOLS = [
    // { Menu: CutToolButton, Submenu: CutToolSubmenu, key: 'CUT', Tool: CutToolShape },
    { Menu: PredefinedFiltersToolButton, Submenu: PredefinedFiltersToolSubmenu, key: 'FILTERS', Tool: PredefinedFiltersToolShape },
    { Menu: BrighnessToolButton, Submenu: BrightnessToolSubmenu, key: 'BRIGHTNESS', Tool: BrightnessToolShape },
    { Menu: SaturationToolButton, Submenu: SaturationToolSubmenu, key: 'SATURATION', Tool: SaturationToolShape},
    { Menu: ContrastToolButton, Submenu: ContrastToolSubmenu, key: 'CONTRAST', Tool: ContrastToolShape },
    { Menu: TemperatureToolButton, Submenu: TemperatureToolSubmenu, key: 'TEMPERATURE', Tool: TemperatureToolShape },
    { Menu: TintToolButton, Submenu: TintToolSubmenu, key: 'TINT', Tool: TintToolShape },
    { Menu: GrayscaleToolButton, Submenu: GrayscaleToolSubmenu, key: 'GRAYSCALE', Tool: GrayscaleToolShape },
];