/**
 * @module @therify/types.flows
 * @description This module describes the stages of the Therify data-pipeline.
 */

/* -------------------------------- Constants ------------------------------- */

const THERIFY_FLOW_STAGES = ['USER_INTAKE'] as const;

/* ---------------------------------- Types --------------------------------- */

export type TherifyFlowStage = typeof THERIFY_FLOW_STAGES[number];

export enum TherifyFlowStages {
    CLIENT_INTAKE = 'CLIENT_INTAKE',
}
