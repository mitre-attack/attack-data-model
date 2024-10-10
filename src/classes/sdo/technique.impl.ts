import { Technique } from '../../schemas/sdo/technique.schema';
import { TacticImpl } from './tactic.impl';
import { MitigationImpl } from './mitigation.impl';
import { DataSourceImpl } from './data-source.impl';

export class TechniqueImpl {

    // Relationships and additional properties
    private subTechniques: TechniqueImpl[] = [];
    private tactics: TacticImpl[] = [];
    private mitigations: MitigationImpl[] = [];
    private dataSources: DataSourceImpl[] = [];
    private parentTechnique?: TechniqueImpl;

    constructor(readonly technique: Technique) {
        // Assign properties from the Technique object to this instance
        Object.assign(this, technique);
    }

    // Methods to manage relationships
    setParent(parent: TechniqueImpl): void {
        this.parentTechnique = parent;
    }

    addSubTechnique(subTechnique: TechniqueImpl): void {
        this.subTechniques.push(subTechnique);
    }

    addTactic(tactic: TacticImpl): void {
        this.tactics.push(tactic);
    }

    addMitigation(mitigation: MitigationImpl): void {
        this.mitigations.push(mitigation);
    }

    addDataSource(dataSource: DataSourceImpl): void {
        this.dataSources.push(dataSource);
    }

    // Getters for relationships
    getSubTechniques(): TechniqueImpl[] {
        return this.subTechniques;
    }

    getTactics(): TacticImpl[] {
        return this.tactics;
    }

    getMitigations(): MitigationImpl[] {
        return this.mitigations;
    }

    getDataSources(): DataSourceImpl[] {
        return this.dataSources;
    }

    getParentTechnique(): TechniqueImpl | undefined {
        return this.parentTechnique;
    }
}

// Extend the class with the SimpleTechnique interface to maintain type hints
// This informs TypeScript that TechniqueImpl instances have all the properties of SimpleTechnique.
// This approach preserves type hints and ensures that we don't have to manually redeclare all properties from SimpleTechnique in the class.
export interface TechniqueImpl extends Technique { }