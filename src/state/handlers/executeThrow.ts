import * as actions from "../actions";
import * as selectors from "../selectors";
import { GameState } from "../../types";
import { getDistance } from "../../utils";
import { removeEntities } from "./removeEntities";
import { updateEntity } from "./updateEntity";

export function executeThrow(
  state: GameState,
  action: ReturnType<typeof actions.executeThrow>,
): GameState {
  state = removeEntities(
    state,
    actions.removeEntities({
      entityIds: selectors
        .entityList(state)
        .filter(e => e.fov)
        .map(e => e.id),
    }),
  );
  const entity = selectors.throwingTarget(state);
  if (!entity) return state;

  const player = selectors.player(state);
  if (!player) return state;

  const { inventory } = player;
  if (entity.reflector && !inventory.reflectors) return state;
  if (entity.splitter && !inventory.splitters) return state;

  const { pos } = entity;
  const distance = getDistance(pos, player.pos);
  if (distance > entity.throwing.range) return state;

  const entitiesAtPosition = selectors.entitiesAtPosition(state, pos);
  if (entitiesAtPosition.some(e => e.id !== entity.id && !!e.blocking))
    return state;

  state = updateEntity(
    state,
    actions.updateEntity({
      id: entity.id,
      throwing: undefined,
    }),
  );

  state = updateEntity(
    state,
    actions.updateEntity({
      id: player.id,
      inventory: {
        splitters: entity.splitter
          ? inventory.splitters - 1
          : inventory.splitters,
        reflectors: entity.reflector
          ? inventory.reflectors - 1
          : inventory.reflectors,
      },
    }),
  );
  return state;
}