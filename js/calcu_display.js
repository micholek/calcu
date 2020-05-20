'use strict';


calcu.handleApply = function () {
  calcu.data = calcu.copyItemsDict(calcu.newData);
  calcu.resetDisplay();
  calcu.refreshDisplay();
}

calcu.handleSave = function () {
  const accept = confirm('save?');
  if (accept) {
    calcu.saveData(calcu.newData);
    calcu.data = calcu.copyItemsDict(calcu.newData);
    calcu.resetDisplay();
    calcu.refreshDisplay();
  }
}

calcu.handleAJSON = function () {
  const data = JSON.stringify(calcu.jsonData.a);
  alert(data);
}

calcu.handleBJSON = function () {
  const data = JSON.stringify(calcu.jsonData.b);
  alert(data);
}

calcu.handleCalculateMoney = function () {
  $(this).val(calcu.formatNumber($(this).val().replace(/\s/g, '')));
}

calcu.updateCommon = function ($source) {
  const type = $source.attr('data-type');
  const itemsKey = type + 'Items';
  const vipKey = type + 'Vip';
  const newItems = calcu.newData[itemsKey];
  const newVip = calcu.newData[vipKey];
  const oldItems = calcu.data[itemsKey];
  const oldVip = calcu.data[vipKey];

  const itemsProfitID = type == 'a' ?
    'a-profit-delta' : 'b-profit-delta';
  const $itemsProfitDelta = $('#' + itemsProfitID);
  const newItemsProfit = Item.totalProfit(newItems, newVip);
  const oldItemsProfit = Item.totalProfit(oldItems, oldVip);
  const itemsProfitDelta = newItemsProfit - oldItemsProfit;
  const itemsProfitDeltaStr = calcu.formatNumber(Math.abs(itemsProfitDelta));
  const itemsProfitDeltaFmt = calcu.fmt(itemsProfitDelta);

  const itemsVipProfitDeltaID = type == 'a' ?
    'a-vip-profit-delta' : 'b-vip-profit-delta';
  const $itemsVipProfitDelta = $('#' + itemsVipProfitDeltaID);
  const newItemsVipProfit = Item.vipProfit(newItems, newVip);
  const oldItemsVipProfit = Item.vipProfit(oldItems, oldVip);
  const itemsVipProfitDelta = newItemsVipProfit - oldItemsVipProfit;
  const itemsVipProfitDeltaStr = calcu.formatNumber(Math.abs(itemsVipProfitDelta));
  const itemsVipProfitDeltaFmt = calcu.fmt(itemsVipProfitDelta);

  const $totalProfit = $('#total-profit');

  if (calcu.nothingChanged(type)) {
    $itemsProfitDelta.prop('hidden', true);
    $itemsVipProfitDelta.prop('hidden', true);
    $totalProfit.text('-').removeClass('change-pos change-neg change-zero');
  } else {
    $itemsProfitDelta.addClass(itemsProfitDeltaFmt.changeOn)
      .removeClass(itemsProfitDeltaFmt.changeOff).removeAttr('hidden');
    $itemsProfitDelta.text(`${itemsProfitDeltaFmt.arrow} ${itemsProfitDeltaStr}`)
    $itemsVipProfitDelta.addClass(itemsVipProfitDeltaFmt.changeOn)
      .removeClass(itemsVipProfitDeltaFmt.changeOff).removeAttr('hidden');
    $itemsVipProfitDelta.text(`${itemsVipProfitDeltaFmt.arrow} ${itemsVipProfitDeltaStr}`)
  }

  console.log(itemsProfitDelta, newItemsProfit, oldItemsProfit);
}

calcu.nothingChanged = function (type) {
  const itemsKey = type + 'Items';
  const vipKey = type + 'Vip';
  if (calcu.data[vipKey] != calcu.newData[vipKey]) {
      return false;
  }
  const itemsData = items => items.map(i => [i.quantity, i.bonus]);
  const newItemsData = itemsData(calcu.newData[itemsKey]);
  const oldItemsData = itemsData(calcu.data[itemsKey]);
  return JSON.stringify(newItemsData) == JSON.stringify(oldItemsData);
}

calcu.fmt = function (delta) {
  let fmt = {
    arrow: '',
    changeOn: '',
    changeOff: '',
    str: calcu.formatNumber(Math.abs(delta))
  };
  if (delta > 0) {
    fmt.arrow = '↑';
    fmt.changeOn = 'change-pos';
    fmt.changeOff = 'change-neg change-zero'
  } else if (delta < 0) {
    fmt.arrow = '↓';
    fmt.changeOn = 'change-neg';
    fmt.changeOff = 'change-pos change-zero'
  } else {
    fmt.arrow = '';
    fmt.changeOn = 'change-zero';
    fmt.changeOff = 'change-pos change-neg'
  }
  return fmt;
}

calcu.handleAVipChange = function () {
  const $this = $(this);
  calcu.newData.aVip = parseInt($this.val());

  const $aVipDelta = $('#a-vip-delta');
  const aVipDelta = calcu.newData.aVip - calcu.data.aVip;
  const aVipFmt = calcu.fmt(aVipDelta);

  if (!aVipDelta) {
    $aVipDelta.text('');
    $this.removeClass('change-pos change-neg change-zero');
  } else {
    $aVipDelta.addClass(aVipFmt.changeOn)
      .removeClass(aVipFmt.changeOff)
      .text(`${aVipFmt.arrow} ${aVipFmt.str}`);
    $this.addClass(aVipFmt.changeOn)
    .removeClass(aVipFmt.changeOff);
  }

  calcu.updateCommon($this);
  console.log('vip A');
}

calcu.handleBVipChange = function () {
  const $this = $(this);
  calcu.newData.bVip = parseInt($this.val());

  const $bVipDelta = $('#b-vip-delta');
  const bVipDelta = calcu.newData.bVip - calcu.data.bVip;
  const bVipFmt = calcu.fmt(bVipDelta);

  if (!bVipDelta) {
    $bVipDelta.text('');
    $this.removeClass('change-pos change-neg change-zero');
  } else {
    $bVipDelta.addClass(bVipFmt.changeOn)
      .removeClass(bVipFmt.changeOff)
      .text(`${bVipFmt.arrow} ${bVipFmt.str}`);
    $this.addClass(bVipFmt.changeOn)
    .removeClass(bVipFmt.changeOff);
  }

  calcu.updateCommon($this);
  console.log('vip B');
}

calcu.handleQuantityChange = function () {
  const $this = $(this);
  const id = parseInt($this.closest('tr').attr('idx'));
  const type = $this.attr('data-type');
  const itemsKey = type + 'Items';
  const vipKey = type + 'Vip';
  const newItems = calcu.newData[itemsKey];
  const newVip = calcu.newData[vipKey];
  const newItem = newItems.find(i => i.id == id);
  const oldItems = calcu.data[itemsKey];
  const oldVip = calcu.data[vipKey];
  const oldItem = oldItems.find(i => i.id == id);

  const $quantityDelta = $this.next('.quantity-delta');
  newItem.quantity = parseInt($this.val());
  const quantityDelta = newItem.quantity - oldItem.quantity;
  const quantityDeltaFmt = calcu.fmt(quantityDelta);

  const $profitDelta = $this.closest('tr').find('.profit-delta');
  const profitDelta = newItem.total_profit() - oldItem.total_profit();
  const profitDeltaFmt = calcu.fmt(profitDelta);

  const bonusDelta = newItem.bonus - oldItem.bonus;

  if (!quantityDelta) {
    $quantityDelta.text('');
    $this.removeClass('change-pos change-neg change-zero');
  } else {
    $quantityDelta.addClass(quantityDeltaFmt.changeOn)
      .removeClass(quantityDeltaFmt.changeOff)
      .text(`${quantityDeltaFmt.arrow} ${quantityDeltaFmt.str}`);
    $this.addClass(quantityDeltaFmt.changeOn)
    .removeClass(quantityDeltaFmt.changeOff);
  }

  if (!quantityDelta && !bonusDelta) {
    $profitDelta.prop('hidden', true);
  } else {
    $profitDelta.addClass(profitDeltaFmt.changeOn)
      .removeClass(profitDeltaFmt.changeOff).removeAttr('hidden');
    $profitDelta.text(`${profitDeltaFmt.arrow} ${profitDeltaFmt.str}`);
  }

  calcu.updateCommon($this);

  console.log(id, type);
  console.log(newItem.quantity, quantityDelta, newItem.total_profit(), profitDelta);
}

calcu.handleBonusChange = function () {
  const $this = $(this);
  const id = parseInt($this.closest('tr').attr('idx'));
  const type = $this.attr('data-type');
  const itemsKey = type + 'Items';
  const vipKey = type + 'Vip';
  const newItems = calcu.newData[itemsKey];
  const newVip = calcu.newData[vipKey];
  const newItem = newItems.find(i => i.id == id);
  const oldItems = calcu.data[itemsKey];
  const oldVip = calcu.data[vipKey];
  const oldItem = oldItems.find(i => i.id == id);

  newItem.bonus = parseInt($this.val());
  const bonusDelta = newItem.bonus - oldItem.bonus;
  const bonusFmt = calcu.fmt(bonusDelta);

  const $profitDelta = $this.closest('tr').find('.profit-delta');
  const profitDelta = newItem.total_profit() - oldItem.total_profit();
  const profitDeltaFmt = calcu.fmt(profitDelta);

  const quantityDelta = newItem.quantity - oldItem.quantity;

  if (!bonusDelta) {
    $this.removeClass('change-pos change-neg change-zero');
  } else {
    $this.addClass(bonusFmt.changeOn).removeClass(bonusFmt.changeOff);
  }

  if (!bonusDelta && !quantityDelta) {
    $profitDelta.prop('hidden', true);
  } else {
    $profitDelta.addClass(profitDeltaFmt.changeOn)
      .removeClass(profitDeltaFmt.changeOff).removeAttr('hidden')
      .text(`${profitDeltaFmt.arrow} ${profitDeltaFmt.str}`);
  }

  calcu.updateCommon($this);

  console.log(id, type);
  console.log(newItem.bonus, newItem.total_profit(), profitDelta);
}

calcu.refreshDisplay = function () {
  const {aItems, bItems} = calcu.newData;
  const {aVip, bVip} = calcu.newData;
  const bTotalProfit = Item.totalProfit(bItems, bVip);
  const aTotalProfit = Item.totalProfit(aItems, aVip);
  const bVipProfit = Item.vipProfit(bItems, bVip);
  const aVipProfit = Item.vipProfit(aItems, aVip);

  const itemsTableHTML = (items, type) =>
    items.map(i => {
      let selected = ['', '', ''];
      selected[[0, 10, 25].indexOf(i.bonus)] = ' selected';
      const htmlData = [
        i.index,
        i.name,
        `<input type="number"
        class="quantity form-control form-control-lg text-light bg-dark"
        value="${i.quantity}" data-type="${type}">
        <span class="quantity-delta change"></span>`,
        `<select class="bonus form-control form-control-lg text-light bg-dark"
        data-type="${type}">
        <option value=0${selected[0]}>0</option>
        <option value=10${selected[1]}>10</option>
        <option value=25${selected[2]}>25</option></select>`,
        `<span class="profit">${calcu.formatNumber(i.total_profit())}</span>
        <span class="profit-delta" hidden></span>`
      ];
      return `<tr idx="${i.id}"><td class="align-middle">
        ${htmlData.join('</td><td class="align-middle">')}</td></tr>`;
    });

  const aItemsHTML = itemsTableHTML(aItems, 'a');
  const bItemsHTML = itemsTableHTML(bItems, 'b');

  $('#b-total-profit').text(calcu.formatNumber(bTotalProfit));
  $('#b-vip-profit').text(calcu.formatNumber(bVipProfit));
  $('#a-total-profit').text(calcu.formatNumber(aTotalProfit));
  $('#a-vip-profit').text(calcu.formatNumber(aVipProfit));
  $('#b-vip').val(bVip);
  $('#a-vip').val(aVip);
  $('#a-items tbody').html(aItemsHTML);
  $('#b-items tbody').html(bItemsHTML);
}

calcu.resetDisplay = function () {
  const elementsToHide = [
    '.profit-delta',
    '#a-profit-delta',
    '#b-profit-delta',
    '#a-vip-profit-delta',
    '#b-vip-profit-delta'
  ];
  const elementsToClearText = [
    '.quantity-delta',
    '#b-vip-delta',
    '#a-vip-delta'
  ];
  const vipsToClearChange = [
    '#b-vip',
    '#a-vip'
  ];
  elementsToHide.forEach(e => {
    $(e).prop('hidden', true);
  });
  elementsToClearText.forEach(e => {
    $(e).text('');
  });
  vipsToClearChange.forEach(e => {
    $(e).removeClass('change-pos change-neg change-zero');
  });
}

calcu.displayChanges = function (data) {
  const {
    calculationResultTable, aItemsTable,
    bItemsTable, summaryTable
  } = data;

  console.log(data);

  const {aCost, bCost, totalCost} = calculationResultTable;
  const {totalProfit} = calculationResultTable;

  const updateItemsTable = (rootSelector, items) => {
    const $root = $(rootSelector);
    items.forEach(item => {
      const id = item.id;
      const $quantity = $(`[idx="${id}"] .quantity`, $root);
      const $quantityDelta = $(`[idx="${id}"] .quantity-delta`, $root);
      const $profit = $(`[idx="${id}"] .profit`, $root);
      const $profitDelta = $(`[idx="${id}"] .profit-delta`, $root);
      const quantityDeltaFmt = calcu.formatNumber(item.quantityDelta);
      const newProfitFmt = calcu.formatNumber(item.newProfit);
      const profitDeltaFmt = calcu.formatNumber(item.profitDelta);
      $quantity.val(item.newQuantity).addClass('change-pos')
      .removeClass('change-neg change-zero');
      $quantityDelta.text(`↑ ${quantityDeltaFmt}`).addClass('change-pos')
      .removeClass('change-neg change-zero').removeAttr('hidden');
      $profitDelta.text(`↑ ${profitDeltaFmt}`).removeAttr('hidden')
      .addClass('change-pos');;
    });
  };

  const updateSummaryTable = (type, summaryPart) => {
    const $totalProfit = $(`#${type}-total-profit`);
    const $profitDelta = $(`#${type}-profit-delta`);
    const $vipProfit = $(`#${type}-vip-profit`);
    const $vipProfitDelta = $(`#${type}-vip-profit-delta`);
    const totalProfitFmt = calcu.formatNumber(summaryPart.newProfit);
    const profitDeltaFmt = calcu.formatNumber(summaryPart.profitDelta);
    const vipProfitFmt = calcu.formatNumber(summaryPart.newVipProfit);
    const vipProfitDeltaFmt = calcu.formatNumber(summaryPart.vipProfitDelta);
    // $totalProfit.text(totalProfitFmt).addClass('change');
    $profitDelta.text(`↑ ${profitDeltaFmt}`).addClass('change-pos')
    .removeClass('change-neg change-zero').removeAttr('hidden');
    // $vipProfit.text(vipProfitFmt).addClass('change');
    $vipProfitDelta.text(`↑ ${vipProfitDeltaFmt}`).addClass('change-pos')
    .removeClass('change-neg change-zero').removeAttr('hidden');
  };

  calcu.resetDisplay();

  updateItemsTable('#a-items', aItemsTable);
  updateItemsTable('#b-items', bItemsTable);

  updateSummaryTable('a', summaryTable.a);
  updateSummaryTable('b', summaryTable.b);

  $('#a-cost').text(calcu.formatNumber(aCost));
  $('#b-cost').text(calcu.formatNumber(bCost));
  $('#total-cost').text(calcu.formatNumber(totalCost));
  $('#total-profit').text(`↑ ${calcu.formatNumber(totalProfit)}`).addClass('change-pos');
}

calcu.initHandlers = function () {
  $('#calculate-money').on('change paste keyup', calcu.handleCalculateMoney);
  $('#calculate1-button').click(calcu.handleCalculateButton);
  $('#calculate2-button').click(calcu.handleCalculate2Button);
  $('#a-json').click(calcu.handleAJSON);
  $('#b-json').click(calcu.handleBJSON);
  $('#a-vip').on('change paste keyup', calcu.handleAVipChange);
  $('#b-vip').on('change paste keyup', calcu.handleBVipChange);
  $('.quantity').on('change paste keyup', calcu.handleQuantityChange);
  $('.bonus').on('change', calcu.handleBonusChange);
  $('#save').click(calcu.handleSave);
  $('#apply').click(calcu.handleApply);
  console.log('initialized');
}

calcu.handleCalculateButton = function () {
  const money = parseInt($('#calculate-money').val().replace(/\s/g, ''));
  if (!money) return;
  console.time('calc');
  const result = calcu.calc(calcu.copy(calcu.data), money);
  console.timeEnd('calc');
  calcu.newData = result.newData;
  // Object.keys(result).forEach(key => {
  //   const styles = [
  //     'background: #3477eb',
  //     'color: white',
  //     'font-weight: bold',
  //     'font-size: 14px'
  //   ];
  //   console.log(`%c${key}`, styles.join(';'));
  //   console.table(result[key]);
  // });
  console.time('dispCalc');
  calcu.displayChanges(result);
  console.timeEnd('dispCalc');
}

calcu.handleCalculate2Button = function () {
  const money = parseInt($('#calculate-money').val().replace(/\s/g, ''));
  if (!money) return;
  console.time('calc');
  const result = calcu.calc2(calcu.copy(calcu.data), money);
  console.timeEnd('calc');
  calcu.newData = result.newData;

  console.time('dispCalc');
  calcu.displayChanges(result);
  console.timeEnd('dispCalc');
}
