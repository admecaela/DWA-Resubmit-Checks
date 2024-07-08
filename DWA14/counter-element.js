import { LitElement, html, css } from 'lit';
import { Shoelace } from '@shoelace-style/shoelace';

const MAX_NUMBER = 10;
const MIN_NUMBER = -10;
const RESET_VALUE = 0;
const STEP_AMOUNT = 1;

class TallyCounter extends LitElement {
  static styles = css`
    .counter {
      background-color: #33333d;
      text-align: center;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .counter__value {
      font-size: 6rem;
      font-weight: 900;
      color: #ffffff8c;
    }
    .counter__actions {
      display: flex;
      justify-content: space-around;
      margin: 1rem 0;
    }
    .reset-overlay {
      text-align: center;
      color: #33333d;
    }
    .reset {
      margin-top: 1rem;
    }
  `;

  static properties = {
    count: { type: Number },
    state: { type: String }
  };

  constructor() {
    super();
    this.count = 0;
    this.state = 'Normal';
  }

  updated(changedProperties) {
    if (changedProperties.has('count')) {
      if (this.count <= MIN_NUMBER) {
        this.state = 'Minimum Reached';
      } else if (this.count >= MAX_NUMBER) {
        this.state = 'Maximum Reached';
      } else {
        this.state = 'Normal';
      }
    }
  }

  increment() {
    if (this.count < MAX_NUMBER) {
      this.count += STEP_AMOUNT;
    }
  }

  decrement() {
    if (this.count > MIN_NUMBER) {
      this.count -= STEP_AMOUNT;
    }
  }

  reset() {
    this.count = RESET_VALUE;
    this.shadowRoot.querySelector('.reset-overlay').show();
  }

  render() {
    return html`
      <div class="counter">
        <div class="counter__value">${this.count}</div>
        <div class="counter__actions">
          <sl-button variant="neutral" size="large" @click=${this.decrement} ?disabled=${this.state === 'Minimum Reached'}>-</sl-button>
          <sl-button variant="neutral" size="large" @click=${this.increment} ?disabled=${this.state === 'Maximum Reached'}>+</sl-button>
        </div>
        <sl-button variant="neutral" class="reset" size="large" @click=${this.reset}>Reset</sl-button>
        <sl-dialog class="reset-overlay">
          <h3>The counter has been reset to default</h3>
        </sl-dialog>
      </div>
    `;
  }
}

customElements.define('tally-counter', TallyCounter);