import { MouseEventStrategy } from "../interfaces";
import OutputEl from "./output";
import { BaseMouseStrategy } from "./strategy";

class MouseHandler {
  private strategy: MouseEventStrategy;

  constructor(wrapper: OutputEl) {
    this.strategy = new BaseMouseStrategy(wrapper);
  }

  setStrategy(strategy: MouseEventStrategy) {
    this.strategy = strategy;
  }

  handleMouseDown = (event: MouseEvent) => {
    this.strategy.handleMouseDown(event);
  };
}

export default MouseHandler;
