/**
 * REC_LID (VDV 452) — a single Fahrweg / Linienvariante.
 *
 * A "Linie" is not a separate entity in VDV 452: it exists purely as the set of
 * REC_LID rows that share the same LI_NR. Line-level fields (LI_KUERZEL,
 * LINIEN_CODE, BEREICH_NR) are therefore identical across all variants of a line,
 * while LIDNAME / LI_RI_NR / ROUTEN_* describe the individual Fahrweg.
 */
export class RecLid {
  // Primary key
  BASIS_VERSION!: number;
  LI_NR!: number;         // Liniennummer (identifies the line)
  STR_LI_VAR!: string;    // Variant identifier (identifies the Fahrweg)

  // Line-level (shared across all variants of the LI_NR)
  LI_KUERZEL?: string;    // Liniennummer/Kürzel (max 6)
  LINIEN_CODE?: number;
  BEREICH_NR?: number;

  // Variant-level (per Fahrweg)
  LIDNAME?: string;       // Name of the Fahrweg (max 40)
  LI_RI_NR?: number;      // Direction (1 = Hin, 2 = Rück)
  ROUTEN_NR?: number;
  ROUTEN_ART?: number;

  // Aggregate, only set by GET /lines for the line list
  variantCount?: number;

  // Display helper for variant dropdowns
  get displayName(): string {
    return `${this.STR_LI_VAR} (${this.LIDNAME || 'Standard'})`;
  }
}
