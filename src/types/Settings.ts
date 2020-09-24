import { ControlCode } from "~types/ControlCode";

export default interface Settings {
  aimInSameDirectionToFire: boolean;
  fireKeyActivatesAiming: boolean;
  unmodifiedAiming: boolean;
  unmodifiedBuilding: boolean;
  aimingModifierKey: string;
  cursorModifierKey: string;
  keyboardShortcuts: Record<ControlCode, string[]>;
}
