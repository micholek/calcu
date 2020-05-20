'use strict';

calcu.formatNumber = function (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

calcu.newItem = function (item, newQuantity) {
  let newItem = new item.constructor(item);
  newItem.quantity = newQuantity;
  return newItem;
}

calcu.copy = function (data) {
  return {
    aItems: calcu.copyItems(data.aItems),
    bItems: calcu.copyItems(data.bItems),
    aVip: data.aVip,
    bVip: data.bVip
  };
}

calcu.copyItems = function (items) {
  return items.map(item => new item.constructor(item));
}

calcu.copyItemsDict = function (itemsDict) {
  return JSON.parse(JSON.stringify(itemsDict), calcu.reviveObjects);
}

calcu.reviveObjects = function (key, val) {
  if (key == 'aItems') {
    return val.map(v => new AItem(v));
  }
  if (key == 'bItems') {
    return val.map(v => new BItem(v));
  }
  return val;
}

calcu.loadData = function () {
  if (!localStorage.getItem('calc')) {
    calcu.saveDefaults();
  }
  const jsonData = localStorage.getItem('calc');
  const data = JSON.parse(jsonData, calcu.reviveObjects);
  console.log('data loaded');
  return data;
}

calcu.saveData = function (data) {
  localStorage.setItem('calc', JSON.stringify(data));
  console.log('data saved');
}

calcu.saveDefaults = function () {
  const aItems = [
    new AItem(0, 1, 'a1', 5000, 5, 0, 0, 1),
    new AItem(2, 2, 'a2', 8000, 9, 0, 0, 1),
    new AItem(4, 3, 'a3', 10000, 11, 0, 0, 1),
    new AItem(6, 4, 'a4', 12000, 12, 0, 0, 1),
    new AItem(8, 5, 'a5', 15000, 16, 0, 0, 1),
    new AItem(10, 6, 'a6', 18000, 19, 0, 0, 1),
    new AItem(12, 7, 'a7', 22000, 21, 0, 0, 1),
    new AItem(14, 8, 'a8', 25000, 24, 0, 0, 1),
    new AItem(16, 9, 'a9', 27000, 27, 0, 0, 1),
    new AItem(18, 10, 'a10', 30000, 31, 0, 0, 1),
    new AItem(20, 11, 'a11', 33000, 35, 0, 0, 1),
    new AItem(22, 12, 'a12', 36000, 37, 0, 0, 1),
    new AItem(24, 13, 'a13', 40000, 40, 0, 0, 1),
    new AItem(26, 14, 'a14', 45000, 44, 0, 0, 1),
    new AItem(28, 15, 'a15', 47000, 48, 0, 0, 1),
    new AItem(30, 16, 'a16', 50000, 52, 0, 0, 1),
    new AItem(32, 17, 'a17', 60000, 63, 0, 0, 1),
    new AItem(34, 18, 'a18', 65000, 67, 0, 0, 1),
    new AItem(36, 19, 'a19', 70000, 72, 0, 0, 1),
    new AItem(38, 20, 'a20', 75000, 76, 0, 0, 1),
    new AItem(40, 21, 'a21', 80000, 81, 0, 0, 1),
    new AItem(42, 22, 'a22', 85000, 84, 0, 0, 1),
    new AItem(44, 23, 'a23', 90000, 92, 0, 0, 1),
    new AItem(46, 24, 'a24', 100000, 105, 0, 0, 1),
    new AItem(48, 25, 'a25', 110000, 114, 0, 0, 1),
    new AItem(50, 26, 'a26', 120000, 125, 0, 0, 1),
    new AItem(52, 27, 'a27', 130000, 132, 0, 0, 1),
    new AItem(54, 28, 'a28', 150000, 160, 0, 0, 1),
    new AItem(56, 29, 'a29', 160000, 165, 0, 0, 1),
    new AItem(58, 30, 'a30', 170000, 168, 0, 0, 1),
    new AItem(60, 31, 'a31', 200000, 212, 0, 0, 1),
    new AItem(62, 32, 'a32', 215000, 217, 0, 0, 1),
    new AItem(64, 33, 'a33', 230000, 229, 0, 0, 1),
    new AItem(66, 34, 'a34', 250000, 248, 0, 0, 1),
    new AItem(68, 35, 'a35', 300000, 300, 0, 0, 1),
    new AItem(70, 36, 'a36', 400000, 420, 0, 0, 1),
    new AItem(72, 37, 'a37', 500000, 515, 0, 0, 1),
    new AItem(74, 38, 'a38', 550000, 562, 0, 0, 1),
    new AItem(76, 39, 'a39', 600000, 610, 0, 0, 1),
    new AItem(78, 40, 'a40', 700000, 690, 0, 0, 1),
    new AItem(80, 41, 'a41', 800000, 825, 0, 0, 1),
    new AItem(82, 42, 'a42', 1000000, 1040, 0, 0, 1),
    new AItem(84, 43, 'a43', 1200000, 1310, 0, 0, 1),
    new AItem(86, 44, 'a44', 1400000, 1450, 0, 0, 1),
    new AItem(88, 45, 'a45', 1500000, 1600, 0, 0, 1),
    new AItem(90, 46, 'a46', 1800000, 1800, 0, 0, 1),
    new AItem(92, 47, 'a47', 2000000, 2130, 0, 0, 1),
    new AItem(94, 48, 'a48', 2500000, 2480, 0, 0, 1),
    new AItem(96, 49, 'a49', 3000000, 3170, 0, 0, 1),
    new AItem(98, 50, 'a50', 3500000, 3800, 0, 0, 1),
    new AItem(100, 51, 'a51', 4000000, 4250, 0, 0, 1),
    new AItem(102, 52, 'a52', 4500000, 4580, 0, 0, 1),
    new AItem(104, 53, 'a53', 5000000, 5210, 0, 0, 1),
    new AItem(106, 54, 'a54', 6000000, 6300, 0, 0, 1),
    new AItem(108, 55, 'a55', 10000000, 10550, 0, 0, 1),
    new AItem(110, 56, 'a56', 15000000, 16000, 0, 0, 1),
    new AItem(112, 57, 'a57', 25000000, 20000, 0, 0, 1),
    new AItem(114, 58, 'a58', 40000000, 28000, 0, 0, 1),
    new AItem(116, 59, 'a59', 60000000, 37000, 0, 0, 1),
    new AItem(118, 60, 'a60', 100000000, 52000, 0, 0, 1),
    new AItem(120, 61, 'a61', 150000000, 65000, 0, 0, 1),
    new AItem(122, 62, 'a62', 200000000, 80000, 0, 0, 1),
    new AItem(124, 63, 'a63', 260000000, 100000, 0, 0, 1),
    new AItem(126, 64, 'a64', 320000000, 120000, 0, 0, 1),
    new AItem(128, 65, 'a65', 400000000, 145000, 0, 0, 1),
    new AItem(130, 66, 'a66', 500000000, 175000, 0, 0, 1),
    new AItem(132, 67, 'a67', 625000000, 210000, 0, 0, 1),
    new AItem(134, 68, 'a68', 750000000, 250000, 0, 0, 1),
    new AItem(136, 69, 'a69', 875000000, 290000, 0, 0, 1),
    new AItem(138, 70, 'a70', 1000000000, 330000, 0, 0, 1),
    new AItem(140, 71, 'a71', 1150000000, 380000, 0, 0, 1)
  ];
  const bItems = [
    new BItem(1, 1, 'b1', 500, 5, 0, 0, 1),
    new BItem(3, 2, 'b2', 1000, 11, 0, 0, 1),
    new BItem(5, 3, 'b3', 1200, 13, 0, 0, 1),
    new BItem(7, 4, 'b4', 1600, 18, 0, 0, 1),
    new BItem(9, 5, 'b5', 3000, 33, 0, 0, 1),
    new BItem(11, 6, 'b6', 4500, 51, 0, 0, 1),
    new BItem(13, 7, 'b7', 6500, 75, 0, 0, 1),
    new BItem(15, 8, 'b8', 8000, 92, 0, 0, 1),
    new BItem(17, 9, 'b9', 10000, 110, 0, 0, 1),
    new BItem(19, 10, 'b10', 13000, 145, 0, 0, 1),
    new BItem(21, 11, 'b11', 15500, 169, 0, 0, 1),
    new BItem(23, 12, 'b12', 18200, 208, 0, 0, 1),
    new BItem(25, 13, 'b13', 21400, 236, 0, 0, 1),
    new BItem(27, 14, 'b14', 25000, 274, 0, 0, 1),
    new BItem(29, 15, 'b15', 35000, 391, 0, 0, 1),
    new BItem(31, 16, 'b16', 50000, 553, 0, 0, 1),
    new BItem(33, 17, 'b17', 75000, 822, 0, 0, 1),
    new BItem(35, 18, 'b18', 100000, 1115, 0, 0, 1),
    new BItem(37, 19, 'b19', 400000, 1350, 0, 0, 1),
    new BItem(39, 20, 'b20', 700000, 1900, 0, 0, 1),
    new BItem(41, 21, 'b21', 1100000, 2500, 0, 0, 1),
    new BItem(43, 22, 'b22', 1600000, 3200, 0, 0, 1),
    new BItem(45, 23, 'b23', 2300000, 4000, 0, 0, 1),
    new BItem(47, 24, 'b24', 3300000, 5000, 0, 0, 1),
    new BItem(49, 25, 'b25', 4500000, 6100, 0, 0, 1),
    new BItem(51, 26, 'b26', 5800000, 7300, 0, 0, 1),
    new BItem(53, 27, 'b27', 7200000, 8500, 0, 0, 1),
    new BItem(55, 28, 'b28', 8700000, 9800, 0, 0, 1),
    new BItem(57, 29, 'b29', 10500000, 11300, 0, 0, 1)
  ];
  const data = {
    aItems: aItems,
    bItems: bItems,
    aVip: 0,
    bVip: 0
  };
  calcu.saveData(data);
}

calcu.getInput = function (infoText) {
  const answer = prompt(infoText);
  return parseInt(answer);
}

// Total profit calculation method equivalent to game designer's
calcu.itemsProfit = function (items, vip) {
  const originalItemsProfit = Item.totalProfit(
    items.map(({originalItem}) => originalItem), vip);

  const newItemsProfit = Item.totalProfit(
    items.map(({newItem}) => newItem), vip);

  return newItemsProfit - originalItemsProfit;
}

calcu.itemsCost = function (items) {
  return items.reduce((acc, {newItem, originalItem}) => {
    const quantityDifference = newItem.quantity - originalItem.quantity;
    return acc + originalItem.nextNCost(quantityDifference)
  }, 0);
}

calcu.calculateNeededData = function (newAItems, newBItems,
                                       oldAItems, oldBItems) {
  const baseResult = (newItems, oldItems) => {
    return newItems.map(i => {
      console.log(i.id);
      const originalItem = oldItems.find(oi => oi.id == i.id);
      const newItem = calcu.newItem(i, i.quantity);
      return {
        newItem: newItem,
        originalItem: originalItem
      };
    });
  };


  const baseAResult = 
    baseResult(newAItems, oldAItems);
  const baseBResult = baseResult(newBItems, oldBItems);

  const aVip = calcu.newData.aVip;
  const bVip = calcu.newData.bVip;

  const aCost = calcu.itemsCost(baseAResult);
  const bCost = calcu.itemsCost(baseBResult);
  const aProfit = calcu.itemsProfit(baseAResult, aVip);
  const bProfit = calcu.itemsProfit(baseBResult, bVip);

  const calculationResultTable = {
    aCost: aCost,
    bCost: bCost,
    totalCost: aCost + bCost,
    aProfit: aProfit,
    bProfit: bProfit,
    totalProfit: aProfit + bProfit
  };

  const itemsTable = baseResult => {
    return baseResult
      .filter(({newItem, originalItem}) => {
        return newItem.quantity > originalItem.quantity;
      })
      .map(r => {
      const id = r.newItem.id;
      const index = r.newItem.index;
      const newQuantity = r.newItem.quantity;
      const quantityDelta = newQuantity - r.originalItem.quantity;
      const newProfit = r.newItem.total_profit();
      const profitDelta = newProfit - r.originalItem.total_profit();
      return {
        id: id,
        index: index,
        newQuantity: newQuantity,
        quantityDelta: quantityDelta,
        newProfit: newProfit,
        profitDelta: profitDelta
      };
    });
  };

  const aItemsTable = itemsTable(baseAResult);
  const bItemsTable = itemsTable(baseBResult);

  const itemsJSON = itemsTable => {
    return itemsTable.map(i => {
      const index = i.index
      const quantity = i.quantityDelta;
      return {
        id: index,
        quantity: quantity
      };
    });
  };

  const aItemsJSON = itemsJSON(aItemsTable);
  const bItemsJSON = itemsJSON(bItemsTable);
  const jsonData = {
    a: aItemsJSON,
    b: bItemsJSON
  };

  const summary = (baseResult, vip) => {
    const oldProfit = parseInt(baseResult.reduce((acc, {originalItem}) => {
      const newProfitPart = originalItem.total_profit();
      return acc + newProfitPart;
    }, 0) * (1 + vip / 100));

    const profitDelta = calcu.itemsProfit(baseResult, vip);
    const newProfit = oldProfit + profitDelta;

    const newVipProfit = parseInt(newProfit / (100 + vip));
    const vipProfitDelta = parseInt(profitDelta / (100 + vip));
    return {
      newProfit: newProfit,
      profitDelta: profitDelta,
      newVipProfit: newVipProfit,
      vipProfitDelta: vipProfitDelta
    };
  };

  const aSummary = summary(baseAResult, aVip);
  const bSummary = summary(baseBResult, bVip);

  const summaryTable = {
    a: aSummary,
    b: bSummary
  };

  const newItemsOfType = baseResult => baseResult.map(({newItem}) => newItem);

  const newData = {
    aItems: newItemsOfType(baseAResult),
    bItems: newItemsOfType(baseBResult),
    aVip: aVip,
    bVip: bVip
  };

  return {
    calculationResultTable: calculationResultTable,
    aItemsTable: aItemsTable,
    bItemsTable: bItemsTable,
    jsonData: jsonData,
    summaryTable: summaryTable,
    newData: newData
  };
}

calcu.calc = function (data, money) {
  let aItems = data.aItems.slice();
  let bItems = data.bItems.slice();
  const {aVip, bVip} = data;
  const vips = {aVip: aVip, bVip: bVip};
  const oldItems = {
    aItems: calcu.copyItems(aItems),
    bItems: calcu.copyItems(bItems)
  };

  let newItems = [...aItems, ...bItems].sort((i1, i2) =>
    Item.ratio(i1, vips) - Item.ratio(i2, vips));


  let itemsID = newItems.map(item => item.id);

  newItems = newItems.reduce((map, i) => { map[i.id] = i; return map; }, {});

  let mostProfitable = newItems[itemsID[0]];
  let moneyLeft = money;
  console.time('loop');
  const itemsLength = itemsID.length;
  while (moneyLeft >= mostProfitable.cost()) {
    moneyLeft -= mostProfitable.cost();
    mostProfitable.quantity++;
    const mpRatio = Item.ratio(mostProfitable, vips);
    for (let i = itemsLength - 1; i > 0; i--) {
      const currentItemRatio = Item.ratio(newItems[itemsID[i]], vips);
      if (mpRatio > currentItemRatio) {
        const headIDs = itemsID.slice(1, i + 1);
        const tailIDs = itemsID.slice(i + 1);
        itemsID = [...headIDs, mostProfitable.id, ...tailIDs];
        break;
      }
    }
    mostProfitable = newItems[itemsID[0]];
  }
  console.timeEnd('loop');

  console.log(calcu.calculateNeededData(aItems, bItems, 
    oldItems.aItems, oldItems.bItems));

  return calcu.calculateNeededData(aItems, bItems, 
    oldItems.aItems, oldItems.bItems);
}


calcu.calc2 = function (data, money) {
  let aItems = data.aItems.slice();
  let bItems = data.bItems.slice();
  const {aVip, bVip} = data;
  const vips = {aVip: aVip, bVip: bVip};
  const oldItems = {
    aItems: calcu.copyItems(aItems),
    bItems: calcu.copyItems(bItems)
  };

  let newItems = [...aItems, ...bItems].sort((i1, i2) =>
    Item.ratio(i1, vips) - Item.ratio(i2, vips));

  let itemsID = newItems.map(item => item.id);

  newItems = newItems.reduce((map, i) => { map[i.id] = i; return map; }, {});

  const sumProfit = () => {
    const aProfit = Item.totalProfit(aItems, aVip);
    const bProfit = Item.totalProfit(bItems, bVip);
    return aProfit + bProfit;
  };

  const initialProfit = sumProfit();
  let profit = 0;
  let mostProfitable = newItems[itemsID[0]];

  console.time('loop');
  const itemsLength = itemsID.length;
  while (money > profit) {
    mostProfitable.quantity++;
    const mpRatio = Item.ratio(mostProfitable, vips);
    for (let i = itemsLength - 1; i > 0; i--) {
      const currentItemRatio = Item.ratio(newItems[itemsID[i]], vips);
      if (mpRatio > currentItemRatio) {
        const headIDs = itemsID.slice(1, i + 1);
        const tailIDs = itemsID.slice(i + 1);
        itemsID = [...headIDs, mostProfitable.id, ...tailIDs];
        break;
      }
    }
    mostProfitable = newItems[itemsID[0]];
    profit = sumProfit() - initialProfit;
  }
  console.timeEnd('loop');

  return calcu.calculateNeededData(aItems, bItems, 
    oldItems.aItems, oldItems.bItems);
}
