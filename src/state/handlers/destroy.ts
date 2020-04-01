import actions from "~state/actions";
import { registerHandler } from "~state/handleAction";
import WrappedState from "~types/WrappedState";
import onDestroyEffects from "~utils/onDestroyEffects";

function destroy(
  state: WrappedState,
  action: ReturnType<typeof actions.destroy>,
): void {
  const entityId = action.payload;
  const entity = state.select.entityById(entityId);
  if (entity.destructible) {
    if (entity.destructible.onDestroy) {
      const effect = onDestroyEffects[entity.destructible.onDestroy];
      if (effect) {
        const effectActions = effect(state, entity);
        effectActions.forEach((effectAction) => state.handle(effectAction));
      }
    }
    state.act.removeEntity(entityId);
  }
}

registerHandler(destroy, actions.destroy);
