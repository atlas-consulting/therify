const DEFAULT_EXTRACT_BOUNDARY_ERROR = 'Failed to extract required boundary header from event Content-Type';

export class ExtractBoundaryError extends Error {
    constructor(message: string = DEFAULT_EXTRACT_BOUNDARY_ERROR) {
        super(message);
    }
}
