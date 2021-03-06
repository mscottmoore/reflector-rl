import { Required } from "Object/_api";
import { createStandardAction } from "typesafe-actions";
import { CURSOR_ID } from "~constants";
import { registerHandler } from "~state/handleAction";
import { Entity, Pos } from "~types";
import WrappedState from "~types/WrappedState";
import { createEntityFromTemplate } from "~lib/entities";

const setCursorPos = createStandardAction("SET_CURSOR_POS")<Pos | null>();
export default setCursorPos;

function setCursorPosHandler(
  state: WrappedState,
  action: ReturnType<typeof setCursorPos>,
): void {
  const newCursorPos = action.payload;
  state.setRaw({
    ...state.raw,
    cursorPos: newCursorPos,
  });

  const highlights = state.select.entitiesWithComps("highlight");
  state.act.removeEntities(highlights.map((e) => e.id));

  if (!state.raw.isAutoMoving) {
    state.act.setAutoMovePath([]);
  }

  const cursor = state.select.entityById(CURSOR_ID);
  if (newCursorPos) {
    if (cursor) {
      state.act.updateEntity({
        id: CURSOR_ID,
        pos: newCursorPos,
      });
    } else {
      state.act.addEntity({
        ...createEntityFromTemplate("CURSOR", { pos: newCursorPos }),
        id: CURSOR_ID,
      });
    }

    const positionsToHighlight: Pos[] = [];
    state.select.entitiesAtPosition(newCursorPos).forEach((entity) => {
      if (entity.colonist) {
        const residence = state.select.residence(
          entity as Required<Entity, "colonist">,
        );
        const employment = state.select.employment(
          entity as Required<Entity, "colonist">,
        );
        if (residence) positionsToHighlight.push(residence.pos);
        if (employment) positionsToHighlight.push(employment.pos);
      }
      if (entity.jobProvider) {
        const employees = state.select.employees(entity);
        positionsToHighlight.push(...employees.map((e) => e.pos));
      }
      if (entity.housing) {
        const residents = state.select.residents(entity);
        positionsToHighlight.push(...residents.map((e) => e.pos));
      }
    });
    positionsToHighlight.forEach((pos) =>
      state.act.addEntity(createEntityFromTemplate("HIGHLIGHT", { pos })),
    );

    state.act.setAutoMovePathToCursor();

    const blueprint = state.select.blueprint();
    if (blueprint) {
      state.act.blueprintMove({ to: newCursorPos });
    }
  } else if (cursor) {
    state.act.removeEntity(CURSOR_ID);
  }
}

registerHandler(setCursorPosHandler, setCursorPos);
