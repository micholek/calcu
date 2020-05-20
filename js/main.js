'use strict';

$(() => {
  const loadedData = calcu.loadData();
  const {aItems, bItems} = loadedData;
  const {aVip, bVip} = loadedData;

  calcu.items = {
    aItems: aItems,
    bItems: bItems
  };
  calcu.vips = {
    aVip: aVip,
    bVip: bVip
  };

  calcu.data = Object.assign({}, calcu.items, calcu.vips);
  const newItems = calcu.copyItemsDict(calcu.items);
  const newVips = Object.assign({}, calcu.vips);
  calcu.newData = Object.assign({}, newItems, newVips);

  console.time('refreshDisplay');
  calcu.refreshDisplay();
  console.timeEnd('refreshDisplay');
  calcu.initHandlers();
});
