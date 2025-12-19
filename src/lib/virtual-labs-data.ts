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
    learningObjective?: string;
    component: React.ComponentType;
}

export const virtualLabExperiments = {
    experiments: [
        // Biology Labs
        { 
            id: 'bio-lab-1', 
            slug: 'food-tests', 
            title: 'Food Tests', 
            subject: 'Biology', 
            description: 'Test for starch, protein, fats, and reducing sugars.', 
            learningObjective: 'Understand how to identify major nutrients in food samples using chemical indicators and reagents.',
            component: FoodTestLab 
        },
        { 
            id: 'bio-lab-2', 
            slug: 'osmosis', 
            title: 'Osmosis', 
            subject: 'Biology', 
            description: 'Observe how water moves across a semi-permeable membrane.', 
            learningObjective: 'Learn the process of osmosis and how concentration gradients affect water movement in cells.',
            component: OsmosisLab 
        },
        { 
            id: 'bio-lab-3', 
            slug: 'photosynthesis-oxygen-production', 
            title: 'Photosynthesis & Oxygen Production', 
            subject: 'Biology', 
            description: 'Investigate how light intensity affects oxygen production in plants.', 
            learningObjective: 'Discover how plants convert light energy into chemical energy and produce oxygen as a byproduct.',
            component: PhotosynthesisLab 
        },
        { 
            id: 'bio-lab-4', 
            slug: 'biuret-test-for-protein', 
            title: 'Biuret Test for Protein', 
            subject: 'Biology', 
            description: 'Use Biuret solution to test various foods for protein.', 
            learningObjective: 'Master the technique for detecting proteins using the characteristic color change of Biuret reagent.',
            component: BiuretTestLab 
        },
        { 
            id: 'bio-lab-5', 
            slug: 'grease-spot-test-for-fats', 
            title: 'Grease Spot Test for Fats', 
            subject: 'Biology', 
            description: 'A simple test to see if a food contains fats or oils.', 
            learningObjective: 'Learn a quick physical method to identify lipids based on their translucent properties.',
            component: GreaseSpotTestLab 
        },
        { 
            id: 'bio-lab-6', 
            slug: 'cell-division-simulator', 
            title: 'Cell Division Simulator', 
            subject: 'Biology', 
            description: 'Visualize the stages of mitosis and meiosis.', 
            learningObjective: 'Understand the phases of cell division and how genetic material is replicated and distributed.',
            component: CellDivisionLab 
        },
        { 
            id: 'bio-lab-7', 
            slug: 'respiration-in-seeds', 
            title: 'Respiration in Germinating Seeds', 
            subject: 'Biology', 
            description: 'Demonstrate that germinating seeds respire.', 
            learningObjective: 'Explore cellular respiration in living organisms and how energy is released from glucose.',
            component: RespirationLab 
        },
        { 
            id: 'bio-lab-8', 
            slug: 'transpiration-in-plants', 
            title: 'Transpiration in Plants', 
            subject: 'Biology', 
            description: 'Observe water loss from plant leaves.', 
            learningObjective: 'Investigate the process of water movement through plants and its role in nutrient transport.',
            component: TranspirationLab 
        },
        { 
            id: 'bio-lab-9', 
            slug: 'enzyme-starch-digestion', 
            title: 'Enzyme Action on Starch', 
            subject: 'Biology', 
            description: 'Simulate how amylase breaks down starch.', 
            learningObjective: 'Learn how enzymes catalyze biological reactions and the factors that affect enzyme activity.',
            component: EnzymeStarchLab 
        },

        // Physics Labs
        { 
            id: 'phy-lab-1', 
            slug: 'condensation', 
            title: 'Condensation of Water Vapor', 
            subject: 'Physics', 
            description: 'Observe water vapor condensing into liquid.', 
            learningObjective: 'Understand phase changes and how temperature affects the state of matter.',
            component: CondensationLab 
        },
        { 
            id: 'phy-lab-2', 
            slug: 'evaporation-of-liquids', 
            title: 'Evaporation of Liquids', 
            subject: 'Physics', 
            description: 'Compare the evaporation rates of different liquids.', 
            learningObjective: 'Explore the relationship between molecular structure and evaporation rates.',
            component: EvaporationLab 
        },
        { 
            id: 'phy-lab-3', 
            slug: 'expansion-of-solids-liquids', 
            title: 'Thermal Expansion', 
            subject: 'Physics', 
            description: 'See how solids and liquids expand when heated.', 
            learningObjective: 'Learn how heat energy causes matter to expand and the practical applications of this principle.',
            component: ExpansionLab 
        },
        { 
            id: 'phy-lab-4', 
            slug: 'expansion-of-air', 
            title: 'Expansion of Air', 
            subject: 'Physics', 
            description: 'Demonstrate that air expands when heated.', 
            learningObjective: 'Understand how gases respond to temperature changes and apply Charles\' Law.',
            component: ExpansionOfAirLab 
        },
        { 
            id: 'phy-lab-5', 
            slug: 'heat-transfer', 
            title: 'Heat Transfer Mechanisms', 
            subject: 'Physics', 
            description: 'Explore conduction, convection, and radiation.', 
            learningObjective: 'Master the three methods of heat transfer and identify real-world examples of each.',
            component: HeatTransferLab 
        },
        { 
            id: 'phy-lab-6', 
            slug: 'hookes-law', 
            title: "Hooke's Law", 
            subject: 'Physics', 
            description: "Investigate the relationship between force and a spring's extension.", 
            learningObjective: 'Discover the linear relationship between force and displacement in elastic materials.',
            component: HookesLawLab 
        },
        { 
            id: 'phy-lab-7', 
            slug: 'magnetic-field-mapping', 
            title: 'Magnetic Field Mapping', 
            subject: 'Physics', 
            description: 'Visualize magnetic field lines using a compass.', 
            learningObjective: 'Learn how to map invisible magnetic fields and understand magnetic field patterns.',
            component: MagneticFieldLab 
        },
        { 
            id: 'phy-lab-8', 
            slug: 'ohms-law', 
            title: "Ohm's Law", 
            subject: 'Physics', 
            description: 'Explore the relationship between voltage, current, and resistance.', 
            learningObjective: 'Master the fundamental relationship V=IR and apply it to electrical circuit analysis.',
            component: OhmsLawLab 
        },
        { 
            id: 'phy-lab-9', 
            slug: 'projectile-motion', 
            title: 'Projectile Motion', 
            subject: 'Physics', 
            description: 'Analyze the trajectory of a projectile.', 
            learningObjective: 'Understand how horizontal and vertical motion combine to create parabolic trajectories.',
            component: ProjectileMotionLab 
        },
        { 
            id: 'phy-lab-10', 
            slug: 'reflection-of-light', 
            title: 'Reflection of Light', 
            subject: 'Physics', 
            description: 'Verify the laws of reflection using a plane mirror.', 
            learningObjective: 'Learn that the angle of incidence equals the angle of reflection and apply this to real situations.',
            component: ReflectionLab 
        },
        { 
            id: 'phy-lab-11', 
            slug: 'refraction-of-light', 
            title: 'Refraction of Light', 
            subject: 'Physics', 
            description: 'Observe how light bends when passing through different media.', 
            learningObjective: 'Explore how light changes direction at boundaries and calculate refractive indices.',
            component: RefractionLab 
        },
        { 
            id: 'phy-lab-12', 
            slug: 'simple-circuits', 
            title: 'Simple Circuits Lab', 
            subject: 'Physics', 
            description: 'Build and test series and parallel circuits.', 
            learningObjective: 'Understand how electrical components can be connected and how this affects current and voltage.',
            component: SimpleCircuitLab 
        },
        { 
            id: 'phy-lab-13', 
            slug: 'work-energy-inclined-plane', 
            title: 'Work & Energy on an Inclined Plane', 
            subject: 'Physics', 
            description: 'Observe the conversion of potential energy to kinetic energy.', 
            learningObjective: 'Learn how energy is conserved and transformed from one form to another in mechanical systems.',
            component: WorkEnergyLab 
        },
        
        // Chemistry Labs
        { 
            id: 'chem-lab-1', 
            slug: 'ammonia-test', 
            title: 'Test for Ammonia Gas', 
            subject: 'Chemistry', 
            description: 'Identify ammonia gas using moist red litmus paper.', 
            learningObjective: 'Learn to identify basic gases through their chemical properties and indicator reactions.',
            component: AmmoniaTestLab 
        },
        { 
            id: 'chem-lab-2', 
            slug: 'hydrogen-pop-test', 
            title: 'Hydrogen "Pop" Test', 
            subject: 'Chemistry', 
            description: "Confirm the presence of hydrogen gas with its characteristic 'pop' sound.", 
            learningObjective: 'Understand combustion reactions and how to safely identify hydrogen gas in the laboratory.',
            component: HydrogenPopTestLab 
        },
        { 
            id: 'chem-lab-3', 
            slug: 'limewater-test-for-co2', 
            title: 'Limewater Test for CO₂', 
            subject: 'Chemistry', 
            description: 'Test for carbon dioxide by observing its reaction with limewater.', 
            learningObjective: 'Discover how carbon dioxide reacts with calcium hydroxide to form an insoluble precipitate.',
            component: LimewaterTestLab 
        },
        { 
            id: 'chem-lab-4', 
            slug: 'litmus-test', 
            title: 'Litmus Test for Acids and Bases', 
            subject: 'Chemistry', 
            description: 'Use litmus paper to identify acidic and basic solutions.', 
            learningObjective: 'Master the use of pH indicators to classify substances as acidic, basic, or neutral.',
            component: LitmusTestLab 
        },
        { 
            id: 'chem-lab-5', 
            slug: 'neutralization-reaction', 
            title: 'Neutralization Reaction', 
            subject: 'Chemistry', 
            description: 'Observe the reaction between an acid and a base.', 
            learningObjective: 'Understand how acids and bases react to produce salt and water, and measure pH changes.',
            component: NeutralizationReactionLab 
        },
        { 
            id: 'chem-lab-6', 
            slug: 'rusting-of-iron', 
            title: 'Rusting of Iron', 
            subject: 'Chemistry', 
            description: 'Investigate the conditions required for iron to rust.', 
            learningObjective: 'Learn about oxidation reactions and the environmental conditions that accelerate corrosion.',
            component: RustingLab 
        },
        { 
            id: 'chem-lab-7', 
            slug: 'separation-techniques', 
            title: 'Separation Techniques', 
            subject: 'Chemistry', 
            description: 'Practice filtration, evaporation, and decantation.', 
            learningObjective: 'Master common laboratory techniques for separating mixtures based on physical properties.',
            component: SeparationTechniquesLab 
        },
        { 
            id: 'chem-lab-8', 
            slug: 'test-for-water', 
            title: 'Test for Water', 
            subject: 'Chemistry', 
            description: 'Use chemical tests to confirm the presence of water.', 
            learningObjective: 'Learn chemical methods to detect water using anhydrous copper sulfate and cobalt chloride.',
            component: WaterTestLab 
        },
        { 
            id: 'chem-lab-9', 
            slug: 'flame-test', 
            title: 'Flame Test', 
            subject: 'Chemistry', 
            description: 'Identify metal ions by the color they produce in a flame.', 
            learningObjective: 'Understand how electrons emit characteristic wavelengths of light and use this for metal identification.',
            component: FlameTestLab 
        },
        { 
            id: 'chem-lab-10', 
            slug: 'metal-acid-reaction', 
            title: 'Metal-Acid Reaction', 
            subject: 'Chemistry', 
            description: 'Compare the reactivity of different metals with acid.', 
            learningObjective: 'Explore the reactivity series of metals and predict reaction outcomes based on metal position.',
            component: MetalAcidReactionLab 
        },
    ]
};

export const getVirtualLabBySlug = (slug: string): VirtualLabExperiment | undefined => {
    return virtualLabExperiments.experiments.find(exp => exp.slug === slug);
};
