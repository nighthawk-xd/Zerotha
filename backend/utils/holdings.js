const normalizeHoldings = (holdings = []) => {
  const grouped = new Map();

  holdings.forEach((item) => {
    const name = item?.name;
    if (!name) return;

    const existing = grouped.get(name);
    if (!existing) {
      grouped.set(name, {
        name,
        qty: Number(item.qty) || 0,
        avg: Number(item.avg) || 0,
        price: Number(item.price) || 0,
        net: item.net || '',
      });
      return;
    }

    existing.qty += Number(item.qty) || 0;
    existing.avg = ((existing.avg * existing.qty) + (Number(item.avg) || 0) * (Number(item.qty) || 0)) / (existing.qty + (Number(item.qty) || 0));
    existing.price = Number(item.price) || existing.price;
    existing.net = item.net || existing.net;
  });

  return Array.from(grouped.values()).filter((item) => item.qty > 0);
};

module.exports = { normalizeHoldings };
