'use strict';

class Item {
  constructor(...args) {
    if (args.length == 1) {
      args[0] && Object.assign(this, args[0]);
    } else {
      [
        this.id, this.index, this.name, this.base_cost, this.base_profit,
        this.bonus, this.quantity
      ] = args;
    }
  }

  total_profit() {
    return parseInt(this.quantity * this.unitary_profit());
  }

  static totalProfit(items, vip) {
    return parseInt(items.reduce((acc, item) =>
      acc + item.total_profit(), 0) * (1 + vip / 100));
  }

  static ratio(item, vips) {
    const vip = item.constructor.name == 'AItem' ?
      vips.aVip : vips.bVip;
    const ratio = item.cost() / (item.unitary_profit() * (1 + vip / 100));
    return ratio;
  }

  static vipProfit(items, vip) {
    return parseInt(Item.totalProfit(items, vip) / (100 + vip));
  }
}


class AItem extends Item {
  constructor(...args) {
    super(...args);
  }

  cost() {
    return 0.2 * this.base_cost * (this.quantity + 5);
  }

  nextNCost(n) {
    let totalCost = 0;
    for (let i = 0; i < n; i++) {
      totalCost += 0.2 * this.base_cost * (this.quantity + i + 5);
    }
    return totalCost;
  }

  unitary_profit() {
    return this.base_profit * (1 + this.bonus / 100);
  }
}


class BItem extends Item {
  static PROFIT_COEFF = 2.38;

  constructor(...args) {
    super(...args);
  }

  cost() {
    return this.base_cost * (this.quantity + 1);
  }

  nextNCost(n) {
    let totalCost = 0;
    for (let i = 0; i < n; i++) {
      totalCost += this.base_cost * (this.quantity + i + 1);
    }
    return totalCost;
  }

  unitary_profit() {
    return this.base_profit * BItem.PROFIT_COEFF * (1 + this.bonus / 100);
  }
}
