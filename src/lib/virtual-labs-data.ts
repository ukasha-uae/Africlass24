import { AmmoniaTestLab } from "@/components/virtual-labs/ammonia-test-lab";
import { BiuretTestLab } from "@/components/virtual-labs/biuret-test-lab";
import { CellDivisionLab } from "@/components/virtual-labs/cell-division-lab";
import { CondensationLab } from "@/components/virtual-labs/condensation-lab";
import { DensityLab } from "@/components/virtual-labs/density-lab";
import { EnzymeStarchLab } from "@/components/virtual-labs/enzyme-starch-lab";
import { EvaporationLab } from "@/components/virtual-labs/evaporation-lab";
import { ExpansionLab } from "@/components/virtual-labs/expansion-lab";
import { ExpansionOfAirLab } from "@/components/virtual-labs/expansion-of-air-lab";
import { FlameTestLab } from "@/components/virtual-labs/flame-test-lab";
import { FoodTestLab } from "@/components/virtual-labs/food-test-lab";
import { GreaseSpotTestLab } from "@/components/virtual-labs/grease-spot-test-lab";
import { HeatTransferLab } from "@/components/virtual-labs/heat-transfer-lab";
import { HookesLawLab } from "@/components/virtual-labs/hookes-law-lab";
import { HydrogenPopTestLab } from "@/components/virtual-labs/hydrogen-pop-test-lab";
import { LimewaterTestLab } from "@/components/virtual-labs/limewater-test-lab";
import { LitmusTestLab } from "@/components/virtual-labs/litmus-test-lab";
import { MagneticFieldLab } from "@/components/virtual-labs/magnetic-field-lab";
import { MetalAcidReactionLab } from "@/components/virtual-labs/metal-acid-reaction-lab";
import { NeutralizationReactionLab } from "@/components/virtual-labs/neutralization-reaction-lab";
import { OhmsLawLab } from "@/components/virtual-labs/ohms-law-lab";
import { OsmosisLab } from "@/components/virtual-labs/osmosis-lab";
import { PhotosynthesisLab } from "@/components/virtual-labs/photosynthesis-lab";
import { ProjectileMotionLab } from "@/components/virtual-labs/projectile-motion-lab";
import { ReflectionLab } from "@/components/virtual-labs/reflection-lab";
import { RefractionLab } from "@/components/virtual-labs/refraction-lab";
import { RespirationLab } from "@/components/virtual-labs/respiration-lab";
import { RustingLab } from "@/components/virtual-labs/rusting-lab";
import { SeparationTechniquesLab } from "@/components/virtual-labs/separation-techniques-lab";
import { SimpleCircuitLab } from "@/components/virtual-labs/simple-circuit-lab";
import { TranspirationLab } from "@/components/virtual-labs/transpiration-lab";
import { WaterCycleLab } from "@/components/virtual-labs/water-cycle-lab";
import { WaterTestLab } from "@/components/virtual-labs/water-test-lab";
import { WorkEnergyLab } from "@/components/virtual-labs/work-energy-lab";


export interface VirtualLabExperiment {
    id: string;
    slug: string;
    title: string;
    subject: 'Biology' | 'Chemistry' | 'Physics' | 'Science';
    description: string;
    component: React.ComponentType;
}

export const virtualLabExperiments = {
    experiments: [
        // Biology Labs
        { id: 'bio-lab-1', slug: 'food-tests', title: 'Food Tests', subject: 'Biology', description: 'Test for starch, protein, fats, and reducing sugars.', component: FoodTestLab },
        { id: 'bio-lab-2', slug: 'osmosis', title: 'Osmosis', subject: 'Biology', description: 'Observe how water moves across a semi-permeable membrane.', component: OsmosisLab },
        { id: 'bio-lab-3', slug: 'photosynthesis-oxygen-production', title: 'Photosynthesis & Oxygen Production', subject: 'Biology', description: 'Investigate how light intensity affects oxygen production in plants.', component: PhotosynthesisLab },
        { id: 'bio-lab-4', slug: 'biuret-test-for-protein', title: 'Biuret Test for Protein', subject: 'Biology', description: 'Use Biuret solution to test various foods for protein.', component: BiuretTestLab },
        { id: 'bio-lab-5', slug: 'grease-spot-test-for-fats', title: 'Grease Spot Test for Fats', subject: 'Biology', description: 'A simple test to see if a food contains fats or oils.', component: GreaseSpotTestLab },
        { id: 'bio-lab-6', slug: 'cell-division-simulator', title: 'Cell Division Simulator', subject: 'Biology', description: 'Visualize the stages of mitosis and meiosis.', component: CellDivisionLab },
        { id: 'bio-lab-7', slug: 'respiration-in-seeds', title: 'Respiration in Germinating Seeds', subject: 'Biology', description: 'Demonstrate that germinating seeds respire.', component: RespirationLab },
        { id: 'bio-lab-8', slug: 'transpiration-in-plants', title: 'Transpiration in Plants', subject: 'Biology', description: 'Observe water loss from plant leaves.', component: TranspirationLab },
        { id: 'bio-lab-9', slug: 'enzyme-starch-digestion', title: 'Enzyme Action on Starch', subject: 'Biology', description: 'Simulate how amylase breaks down starch.', component: EnzymeStarchLab },

        // Physics Labs
        { id: 'phy-lab-1', slug: 'condensation', title: 'Condensation of Water Vapor', subject: 'Physics', description: 'Observe water vapor condensing into liquid.', component: CondensationLab },
        { id: 'phy-lab-2', slug: 'evaporation-of-liquids', title: 'Evaporation of Liquids', subject: 'Physics', description: 'Compare the evaporation rates of different liquids.', component: EvaporationLab },
        { id: 'phy-lab-3', slug: 'expansion-of-solids-liquids', title: 'Thermal Expansion', subject: 'Physics', description: 'See how solids and liquids expand when heated.', component: ExpansionLab },
        { id: 'phy-lab-4', slug: 'expansion-of-air', title: 'Expansion of Air', subject: 'Physics', description: 'Demonstrate that air expands when heated.', component: ExpansionOfAirLab },
        { id: 'phy-lab-5', slug: 'heat-transfer', title: 'Heat Transfer Mechanisms', subject: 'Physics', description: 'Explore conduction, convection, and radiation.', component: HeatTransferLab },
        { id: 'phy-lab-6', slug: 'hookes-law', title: "Hooke's Law", subject: 'Physics', description: "Investigate the relationship between force and a spring's extension.", component: HookesLawLab },
        { id: 'phy-lab-7', slug: 'magnetic-field-mapping', title: 'Magnetic Field Mapping', subject: 'Physics', description: 'Visualize magnetic field lines using a compass.', component: MagneticFieldLab },
        { id: 'phy-lab-8', slug: 'ohms-law', title: "Ohm's Law", subject: 'Physics', description: 'Explore the relationship between voltage, current, and resistance.', component: OhmsLawLab },
        { id: 'phy-lab-9', slug: 'projectile-motion', title: 'Projectile Motion', subject: 'Physics', description: 'Analyze the trajectory of a projectile.', component: ProjectileMotionLab },
        { id: 'phy-lab-10', slug: 'reflection-of-light', title: 'Reflection of Light', subject: 'Physics', description: 'Verify the laws of reflection using a plane mirror.', component: ReflectionLab },
        { id: 'phy-lab-11', slug: 'refraction-of-light', title: 'Refraction of Light', subject: 'Physics', description: 'Observe how light bends when passing through different media.', component: RefractionLab },
        { id: 'phy-lab-12', slug: 'simple-circuits', title: 'Simple Circuits Lab', subject: 'Physics', description: 'Build and test series and parallel circuits.', component: SimpleCircuitLab },
        { id: 'phy-lab-13', slug: 'work-energy-inclined-plane', title: 'Work & Energy on an Inclined Plane', subject: 'Physics', description: 'Observe the conversion of potential energy to kinetic energy.', component: WorkEnergyLab },
        
        // Chemistry Labs
        { id: 'chem-lab-1', slug: 'ammonia-test', title: 'Test for Ammonia Gas', subject: 'Chemistry', description: 'Identify ammonia gas using moist red litmus paper.', component: AmmoniaTestLab },
        { id: 'chem-lab-2', slug: 'hydrogen-pop-test', title: 'Hydrogen "Pop" Test', subject: 'Chemistry', description: "Confirm the presence of hydrogen gas with its characteristic 'pop' sound.", component: HydrogenPopTestLab },
        { id: 'chem-lab-3', slug: 'limewater-test-for-co2', title: 'Limewater Test for CO₂', subject: 'Chemistry', description: 'Test for carbon dioxide by observing its reaction with limewater.', component: LimewaterTestLab },
        { id: 'chem-lab-4', slug: 'litmus-test', title: 'Litmus Test for Acids and Bases', subject: 'Chemistry', description: 'Use litmus paper to identify acidic and basic solutions.', component: LitmusTestLab },
        { id: 'chem-lab-5', slug: 'neutralization-reaction', title: 'Neutralization Reaction', subject: 'Chemistry', description: 'Observe the reaction between an acid and a base.', component: NeutralizationReactionLab },
        { id: 'chem-lab-6', slug: 'rusting-of-iron', title: 'Rusting of Iron', subject: 'Chemistry', description: 'Investigate the conditions required for iron to rust.', component: RustingLab },
        { id: 'chem-lab-7', slug: 'separation-techniques', title: 'Separation Techniques', subject: 'Chemistry', description: 'Practice filtration, evaporation, and decantation.', component: SeparationTechniquesLab },
        { id: 'chem-lab-8', slug: 'test-for-water', title: 'Test for Water', subject: 'Chemistry', description: 'Use chemical tests to confirm the presence of water.', component: WaterTestLab },
        { id: 'chem-lab-9', slug: 'flame-test', title: 'Flame Test', subject: 'Chemistry', description: 'Identify metal ions by the color they produce in a flame.', component: FlameTestLab },
        { id: 'chem-lab-10', slug: 'metal-acid-reaction', title: 'Metal-Acid Reaction', subject: 'Chemistry', description: 'Compare the reactivity of different metals with acid.', component: MetalAcidReactionLab },
    ]
};

export const getVirtualLabBySlug = (slug: string): VirtualLabExperiment | undefined => {
    return virtualLabExperiments.experiments.find(exp => exp.slug === slug);
};
