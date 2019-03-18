import * as actions from "../actions";
import { RIGHT } from "../constants";
import * as selectors from "../selectors";
import { GameState } from "../types";
import { addEntity } from "./addEntity";
import { targetWeapon } from "./targetWeapon";

export function activateWeapon(
  state: GameState,
  action: ReturnType<typeof actions.activateWeapon>,
): GameState {
  const weaponInSlot = selectors.weaponInSlot(state, action.payload.slot);
  if (!weaponInSlot) return state;

  for (let weapon of selectors.weapons(state)) {
    if (weapon !== weaponInSlot && weapon.weapon && weapon.weapon.active) {
      state = addEntity(
        state,
        actions.addEntity({
          entity: {
            ...weapon,
            weapon: {
              ...weapon.weapon,
              active: false,
            },
          },
        }),
      );
    }
  }

  const entity = weaponInSlot;
  const { weapon } = entity;
  if (!weapon) return state;
  state = {
    ...state,
    entities: {
      ...state.entities,
      [entity.id]: {
        ...entity,
        weapon: {
          ...weapon,
          active: !weapon.active && !weapon.readyIn,
        },
      },
    },
  };
  state = targetWeapon(state, actions.targetWeapon(RIGHT));
  return state;
}
