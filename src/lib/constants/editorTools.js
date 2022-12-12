import CutToolShape from './../../components/editorComponents/cut/cutToolShape';
import CutToolButton from './../../components/editorComponents/cut/cutToolButton';
import CutToolSubmenu from './../../components/editorComponents/cut/cutToolSubmenu';
import BrighnessToolButton from '../../components/editorComponents/brightness/brightnessToolButton';
import BrightnessToolSubmenu from '../../components/editorComponents/brightness/brightnessToolSubmenu';
import BrightnessToolShape from '../../components/editorComponents/brightness/brightnessToolShape';

export const TOOLS = [
    { Menu: CutToolButton, Submenu: CutToolSubmenu, key: 'CUT', Tool: CutToolShape },
    { Menu: BrighnessToolButton, Submenu: BrightnessToolSubmenu, key: 'BRIGHTNESS', Tool: BrightnessToolShape },
];