(function(){
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => {
    if (Number.isNaN(n) || !Number.isFinite(n)) return '—';
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(n);
  };

  const calc = () => {
    const direction = $('direction').value; // 'long' or 'short'
    const balance = parseFloat($('balance').value);
    const riskPct = parseFloat($('riskPct').value);
    const entry = parseFloat($('entry').value);
    const sl = parseFloat($('sl').value);
    const rr = parseFloat($('rr').value);

    if ([balance, riskPct, entry, sl, rr].some(v => Number.isNaN(v))) {
      alert('Completa todos los campos con valores válidos.');
      return;
    }
    if (riskPct <= 0 || rr <= 0) {
      alert('El riesgo % y la relación R:R deben ser mayores que 0.');
      return;
    }
    if ((direction === 'long' && sl >= entry) || (direction === 'short' && sl <= entry)) {
      alert('Para long, el SL debe ser menor que la entrada. Para short, debe ser mayor.');
      return;
    }

    const riskAmount = balance * (riskPct / 100);
    const slDist = Math.abs(entry - sl);

    // Tamaño de posición genérico (en "unidades del activo"):
    // positionSize * slDist = riskAmount  => positionSize = riskAmount / slDist
    const positionSize = riskAmount / slDist;

    // TP según R:R
    let tp;
    if (direction === 'long') {
      tp = entry + rr * (entry - sl);
    } else {
      tp = entry - rr * (sl - entry);
    }

    const rewardAmount = riskAmount * rr;

    $('risk-amount').textContent = '$ ' + fmt(riskAmount);
    $('position-size').textContent = fmt(positionSize);
    $('sl-distance').textContent = fmt(slDist);
    $('tp-price').textContent = fmt(tp);
    $('reward-amount').textContent = '$ ' + fmt(rewardAmount);

    document.getElementById('results').classList.remove('hidden');
  };

  const btn = document.getElementById('calc-btn');
  if (btn) btn.addEventListener('click', calc);
})();
