import { ElementImage } from "./element-image";

export interface ChemicalElement {
    name: any;
    appearance?: any;
    atomic_mass?: any;
    boil?: any;
    category?: any;
    density?: any;
    discovered_by?: any;
    melt?: any;
    molar_heat?: any;
    named_by?: any;
    number?: any;
    period?: any;
    group?: any;
    phase?: any;
    source?: any;
    bohr_model_image?: any;
    bohr_model_3d?: any;
    spectral_img?: any;
    summary?: any;
    symbol?: any;
    xpos: number;
    ypos: number;
    wxpos?: any;
    wypos?: any;
    shells?: any;
    electron_configuration?: any;
    electron_configuration_semantic?: any;
    electron_affinity?: any;
    electronegativity_pauling?: any;
    ionization_energies?: any;
    cpkHex?: any;
    image?: ElementImage;
    block?: any;
}